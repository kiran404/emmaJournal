import Link from "next/link";
import { getPublished } from "@/lib/db";
import PostCard from "@/components/PostCard";
import { KINDS } from "@/lib/site";

export const metadata = { title: "All posts" };

// Reads searchParams, so this page renders per request. Cheap query, fine for a personal site.
export default async function Posts({
  searchParams,
}: {
  searchParams: Promise<{ kind?: string; tag?: string }>;
}) {
  const { kind, tag } = await searchParams;
  const posts = await getPublished(kind, tag);
  return (
    <>
      <h1>All posts{tag && <> tagged #{tag}</>}</h1>
      <div className="row" style={{ marginBottom: 20 }}>
        <Link className="btn ghost" href="/posts">
          All
        </Link>
        {KINDS.map((k) => (
          <Link key={k} className="btn ghost" href={`/posts?kind=${k}`}>
            {k}
          </Link>
        ))}
      </div>
      <div className="grid">
        {posts.map((p) => (
          <PostCard key={p.id} post={p} />
        ))}
      </div>
      {posts.length === 0 && <p className="muted">No posts found.</p>}
    </>
  );
}
