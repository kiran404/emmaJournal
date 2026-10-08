import { savePost } from "@/app/dashboard/actions";
import type { Post } from "@/lib/db";
import { KINDS } from "@/lib/site";
import { Button, Field } from "./ui";

export default function PostForm({ post }: { post?: Post }) {
  return (
    <form action={savePost}>
      {post && <input type="hidden" name="id" value={post.id} />}
      <Field label="Title" name="title" defaultValue={post?.title} required />
      <Field
        label="Slug (optional, auto-made from title)"
        name="slug"
        defaultValue={post?.slug}
      />
      <label className="field">
        <span>Type</span>
        <select name="kind" defaultValue={post?.kind ?? "blog"}>
          {KINDS.map((k) => (
            <option key={k}>{k}</option>
          ))}
        </select>
      </label>
      <Field
        label="Short summary"
        name="excerpt"
        defaultValue={post?.excerpt}
      />
      <label className="field">
        <span>Body (blank line = new paragraph)</span>
        <textarea name="body" rows={12} defaultValue={post?.body} />
      </label>
      <Field
        label="Media URL (image, .mp4 file, or YouTube link)"
        name="media_url"
        defaultValue={post?.media_url ?? ""}
      />
      <Field
        label="…or upload a small image"
        name="file"
        type="file"
        accept="image/*"
      />
      <Field
        label="Tags (comma separated)"
        name="tags"
        defaultValue={post?.tags.join(", ")}
      />
      <label className="row" style={{ marginBottom: 16 }}>
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published}
          style={{ width: "auto" }}
        />{" "}
        Published (untick = draft)
      </label>
      <Button>Save</Button>
    </form>
  );
}
