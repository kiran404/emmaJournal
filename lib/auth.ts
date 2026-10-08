import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "session";
const DAYS = 7;
const enc = new TextEncoder();

// HMAC-SHA256 using the built-in Web Crypto API (no library needed).
async function hmac(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(process.env.AUTH_SECRET!),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(value));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValid(token?: string) {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  return Number(exp) > Date.now() && sig === (await hmac(exp));
}

export async function createSession() {
  const exp = Date.now() + DAYS * 86_400_000;
  (await cookies()).set(SESSION_COOKIE, `${exp}.${await hmac(String(exp))}`, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: DAYS * 86_400,
    secure: process.env.NODE_ENV === "production",
  });
}

export async function destroySession() {
  (await cookies()).delete(SESSION_COOKIE);
}

// Call at the top of EVERY server action that changes data.
export async function requireAdmin() {
  if (!(await isValid((await cookies()).get(SESSION_COOKIE)?.value)))
    redirect("/login");
}
