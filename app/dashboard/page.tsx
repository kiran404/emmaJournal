import Link from "next/link";
import { getAllPosts, getMessages } from "@/lib/db";
import { deletePost } from "./actions";
import { Button } from "@/components/ui";

export const metadata = { title: "Dashboard" };
export const dynamic = "force-dynamic"; // always fresh, never cached

export default async function Dashboard() {
  const [posts, messages] = await Promise.all([getAllPosts(), getMessages()]);

  return (
    <>
      <h1>Your posts</h1>

      {posts.length === 0 && (
        <p className="muted">
          No posts yet.{" "}
          <Link href="/dashboard/new">Create your first post</Link>.
        </p>
      )}

      <table>
        <tbody>
          {posts.map((p) => (
            <tr key={p.id}>
              <td>
                <Link href={`/dashboard/${p.id}`}>{p.title}</Link>
                <div className="muted">{p.kind}</div>
              </td>
              <td>{p.published ? "Published" : "Draft"}</td>
              <td className="row">
                {p.published && <Link href={`/posts/${p.slug}`}>View</Link>}
                <form action={deletePost.bind(null, p.id)}>
                  <Button variant="danger">Delete</Button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 40 }}>Messages</h2>
      {messages.length === 0 && <p className="muted">No messages yet.</p>}
      {messages.map((m) => (
        <div className="card" key={m.id} style={{ marginBottom: 10 }}>
          <strong>{m.name}</strong> <span className="muted">{m.email}</span>
          <p>{m.message}</p>
        </div>
      ))}
    </>
  );
}
