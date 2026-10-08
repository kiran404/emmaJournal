"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put } from "@vercel/blob";
import { sql } from "@/lib/db";
import { requireAdmin, destroySession } from "@/lib/auth";
import { KINDS } from "@/lib/site";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
const parseTags = (s: string) => [
  ...new Set(
    s
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean),
  ),
];
const refresh = () => revalidatePath("/", "layout"); // clears cached public pages

export async function savePost(fd: FormData) {
  await requireAdmin(); // never trust the proxy alone
  const id = Number(fd.get("id") || 0);
  const title = String(fd.get("title") ?? "").trim();
  const slug = slugify(String(fd.get("slug") || title));
  const kind = KINDS.includes(fd.get("kind") as never)
    ? String(fd.get("kind"))
    : "blog";
  const excerpt = String(fd.get("excerpt") ?? "");
  const body = String(fd.get("body") ?? "");
  const tags = parseTags(String(fd.get("tags") ?? ""));
  const published = fd.get("published") === "on";
  let media = String(fd.get("media_url") ?? "").trim() || null;

  const file = fd.get("file") as File | null;
  if (file && file.size > 0)
    media = (
      await put(`media/${Date.now()}-${file.name}`, file, { access: "public" })
    ).url;

  if (!title || !slug) throw new Error("Title is required");

  if (id)
    await sql`update posts set title=${title}, slug=${slug}, kind=${kind}, excerpt=${excerpt}, body=${body},
              media_url=${media}, tags=${tags}, published=${published}, updated_at=now() where id=${id}`;
  else
    await sql`insert into posts (title, slug, kind, excerpt, body, media_url, tags, published)
              values (${title}, ${slug}, ${kind}, ${excerpt}, ${body}, ${media}, ${tags}, ${published})`;
  refresh();
  redirect("/dashboard"); // redirect last: it works by throwing
}

export async function deletePost(id: number) {
  await requireAdmin();
  await sql`delete from posts where id = ${id}`;
  refresh();
}

export async function renameTag(fd: FormData) {
  await requireAdmin();
  const from = String(fd.get("from"));
  const to = String(fd.get("to")).trim().toLowerCase();
  if (!to) return;
  await sql`update posts set tags = array(select distinct unnest(array_replace(tags, ${from}, ${to})))`;
  refresh();
}

export async function deleteTag(name: string) {
  await requireAdmin();
  await sql`update posts set tags = array_remove(tags, ${name})`;
  refresh();
}

export async function logout() {
  await destroySession();
  redirect("/login");
}
