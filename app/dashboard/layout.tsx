import Link from "next/link";
import { logout } from "./actions";
import { Button } from "@/components/ui";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="row between" style={{ marginBottom: 24 }}>
        <div className="row">
          <Link href="/dashboard">Posts</Link>
          <Link href="/dashboard/new">New</Link>
          <Link href="/dashboard/tags">Tags</Link>
        </div>
        <form action={logout}>
          <Button variant="ghost">Log out</Button>
        </form>
      </div>
      {children}
    </>
  );
}
