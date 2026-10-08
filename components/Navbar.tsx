import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="wrap">
        <Link href="/" className="brand">
          {SITE_NAME}
        </Link>
        <Link href="/posts">Posts</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </header>
  );
}
