import { neon } from "@neondatabase/serverless";
import type { Kind } from "./site";

export const sql = neon(process.env.DATABASE_URL!);

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  kind: Kind;
  media_url: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
};

// Public: published posts only, optional filters.
export async function getPublished(kind?: string, tag?: string, limit = 100) {
  const k = kind || null,
    t = tag || null;
  return (await sql`
    select * from posts
    where published
      and (${k}::text is null or kind = ${k})
      and (${t}::text is null or ${t} = any(tags))
    order by created_at desc limit ${limit}`) as Post[];
}

export async function getPublishedBySlug(slug: string) {
  const rows =
    (await sql`select * from posts where slug = ${slug} and published`) as Post[];
  return rows[0] ?? null;
}

// Dashboard only (call after requireAdmin / behind proxy).
export const getAllPosts = async () =>
  (await sql`select * from posts order by created_at desc`) as Post[];

export async function getPostById(id: number) {
  const rows = (await sql`select * from posts where id = ${id}`) as Post[];
  return rows[0] ?? null;
}

export const getTags = async () =>
  (await sql`select t as name, count(*)::int as count
             from posts, unnest(tags) t group by t order by t`) as {
    name: string;
    count: number;
  }[];

export const getMessages = async () =>
  (await sql`select * from messages order by created_at desc limit 20`) as {
    id: number;
    name: string;
    email: string;
    message: string;
    created_at: string;
  }[];
