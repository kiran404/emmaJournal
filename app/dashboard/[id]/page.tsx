import { notFound } from "next/navigation";
import { getPostById } from "@/lib/db";
import PostForm from "@/components/PostForm";

export default async function EditPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const post = await getPostById(Number((await params).id));
  if (!post) notFound();
  return (
    <>
      <h1>Edit post</h1>
      <PostForm post={post} />
    </>
  );
}
