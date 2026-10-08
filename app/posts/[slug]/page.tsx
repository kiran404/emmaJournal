import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedBySlug } from "@/lib/db";
import Media from "@/components/Media";

export const revalidate = 60; // built on first visit, then cached

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await getPublishedBySlug((await params).slug);
  return { title: post?.title, description: post?.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = await getPublishedBySlug((await params).slug);
  if (!post) notFound();
  return (
    <article>
      <span className="badge">{post.kind}</span>
      <h1>{post.title}</h1>
      <p className="muted">
        {new Date(post.created_at).toLocaleDateString("en-US", {
          dateStyle: "long",
        })}
      </p>
      {post.media_url && <Media url={post.media_url} title={post.title} />}
      {/* Plain text → paragraphs. Swap in a Markdown renderer later if you want. */}
      <div className="prose" style={{ marginTop: 24 }}>
        {post.body.split(/\n{2,}/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <div className="tags">
        {post.tags.map((t) => (
          <Link key={t} href={`/posts?tag=${t}`}>
            #{t}
          </Link>
        ))}
      </div>
    </article>
  );
}
