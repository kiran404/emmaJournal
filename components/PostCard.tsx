import Link from "next/link";
import type { Post } from "@/lib/db";
import { Card } from "./ui";

export default function PostCard({ post }: { post: Post }) {
  return (
    <Card>
      <span className="badge">{post.kind}</span>
      <h3>
        <Link href={`/posts/${post.slug}`} style={{ textDecoration: "none" }}>
          {post.title}
        </Link>
      </h3>
      <p className="muted">{post.excerpt}</p>
      <p className="muted">
        {new Date(post.created_at).toLocaleDateString("en-US", {
          dateStyle: "medium",
        })}
      </p>
      <div className="tags">
        {post.tags.map((t) => (
          <Link key={t} href={`/posts?tag=${t}`}>
            #{t}
          </Link>
        ))}
      </div>
    </Card>
  );
}
