import { NextRequest, NextResponse } from "next/server";
import { isValid, SESSION_COOKIE } from "@/lib/auth";

export async function proxy(req: NextRequest) {
  if (await isValid(req.cookies.get(SESSION_COOKIE)?.value))
    return NextResponse.next();
  return NextResponse.redirect(new URL("/login", req.url));
}
export const config = { matcher: ["/dashboard/:path*"] };
