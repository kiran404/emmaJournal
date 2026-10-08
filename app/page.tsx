import Link from "next/link";
import { getPublished } from "@/lib/db";
import PostCard from "@/components/PostCard";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const revalidate = 60; // static page, refreshed at most once a minute

export default async function Home() {
  const posts = await getPublished(undefined, undefined, 6);
  return (
    <>
      <section style={{ padding: "24px 0 40px" }}>
        <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)" }}>
          Welcome to {SITE_NAME}
        </h1>
        <p className="muted" style={{ fontSize: 18 }}>
          {SITE_TAGLINE}
        </p>
        <Link href="/about" className="btn ghost">
          About me
        </Link>
      </section>
      <h2>Recent posts</h2>
      <div className="grid">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
      {posts.length === 0 && <p className="muted">Nothing published yet.</p>}
    </>
  );
}
