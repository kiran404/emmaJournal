import { getTags } from "@/lib/db";
import { renameTag, deleteTag } from "../actions";
import { Button } from "@/components/ui";

export const dynamic = "force-dynamic";

export default async function Tags() {
  const tags = await getTags();
  return (
    <>
      <h1>Tags</h1>
      {tags.length === 0 && (
        <p className="muted">Tags appear here once you add them to posts.</p>
      )}
      {tags.map((t) => (
        <div
          className="row between card"
          key={t.name}
          style={{ marginBottom: 10 }}
        >
          <span>
            #{t.name} <span className="muted">({t.count})</span>
          </span>
          <div className="row">
            <form action={renameTag} className="row">
              <input type="hidden" name="from" value={t.name} />
              <input
                name="to"
                placeholder="rename to…"
                style={{ width: 150 }}
              />
              <Button variant="ghost">Rename</Button>
            </form>
            <form action={deleteTag.bind(null, t.name)}>
              <Button variant="danger">Remove</Button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
}
