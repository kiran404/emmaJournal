import { redirect } from "next/navigation";
import { sql } from "@/lib/db";
import { Button, Field } from "@/components/ui";

export const metadata = { title: "Contact" };

async function send(fd: FormData) {
  "use server";
  if (fd.get("website")) redirect("/contact?sent=1"); // honeypot: bots fill this hidden field
  const [name, email, message] = ["name", "email", "message"].map((k) =>
    String(fd.get(k) ?? "")
      .trim()
      .slice(0, 5000),
  );
  if (name && /^\S+@\S+$/.test(email) && message)
    await sql`insert into messages (name, email, message) values (${name}, ${email}, ${message})`;
  redirect("/contact?sent=1");
}

export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;
  return (
    <>
      <h1>Contact</h1>
      {sent ? (
        <p>Thanks! Your message was sent.</p>
      ) : (
        <form action={send} style={{ maxWidth: 520 }}>
          <Field label="Name" name="name" required />
          <Field label="Email" name="email" type="email" required />
          <label className="field">
            <span>Message</span>
            <textarea name="message" rows={6} required />
          </label>
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            style={{ display: "none" }}
          />
          <Button>Send</Button>
        </form>
      )}
    </>
  );
}
