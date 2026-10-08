import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";
import { Button, Field } from "@/components/ui";

async function login(fd: FormData) {
  "use server";
  if (fd.get("password") === process.env.ADMIN_PASSWORD) {
    await createSession();
    redirect("/dashboard");
  }
  redirect("/login?error=1");
}

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <form action={login} style={{ maxWidth: 360 }}>
      <h1>Owner login</h1>
      {error && <p style={{ color: "#dc2626" }}>Wrong password.</p>}
      <Field
        label="Password"
        name="password"
        type="password"
        required
        autoFocus
      />
      <Button>Log in</Button>
    </form>
  );
}
