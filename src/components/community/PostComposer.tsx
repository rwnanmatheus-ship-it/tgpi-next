"use client";
import { useState } from "react";
import type { Action } from "./api";
import ImageUpload from "./CommunityImageUpload";
import s from "./Community.module.css";
export default function PostComposer({
  action,
  busy,community,
}: {
  community:string;
  action: Action;
  busy: boolean;
}) {
  const [images,setImages]=useState<{id:string;alt:string}[]>([]),
    [open, setOpen] = useState(false),
    [kind, setKind] = useState("discussion"),
    [title, setTitle] = useState(""),
    [body, setBody] = useState(""),
    [destination, setDestination] = useState(""),
    [context, setContext] = useState(""),
    [source, setSource] = useState(""),
    [id, setId] = useState(() => crypto.randomUUID());
  return (
    <section className={s.panel}>
      <button
        className={s.button}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {open ? "Close composer" : "Share an experience or ask a question"}
      </button>
      {open && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (
              await action({
                action: "post",
                id,
                kind,
                title,
                body,
                destination,
                context,
                source,attachments:images,
              })
            ) {
              setImages([]);
              setTitle("");
              setBody("");
              setContext("");
              setSource("");
              setId(crypto.randomUUID());
              setOpen(false);
            }
          }}
        >
          <label>
            Format
            <select value={kind} onChange={(e) => setKind(e.target.value)}>
              <option value="discussion">Discussion</option>
              <option value="question">Question</option>
              <option value="experience">Experience</option>
              <option value="guide">Guide</option>
            </select>
          </label>
          <label>
            Title
            <input
              required
              maxLength={180}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            {kind === "question" ? "Question and context" : "Your contribution"}
            <textarea
              required
              maxLength={16000}
              rows={7}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <div className={s.split}>
            <label>
              Country / city
              <input
                maxLength={100}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </label>
            <label>
              Period, currency and context
              <input
                maxLength={1000}
                value={context}
                onChange={(e) => setContext(e.target.value)}
              />
            </label>
          </div>
          <label>
            HTTPS source (optional)
            <input
              type="url"
              maxLength={500}
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
          </label>
          <p className={s.notice}>
            Identify personal experiences and estimates. Include dates, currency
            and sources when relevant. Never publish private documents.
          </p>
          {images.map(x=><p className={s.meta} key={x.id}>Photo attached: {x.alt}</p>)}
          {images.length<4&&<ImageUpload community={community} kind="post" post={id} onUpload={image=>setImages(prev=>[...prev,image])}/>}
          <button className={s.button} disabled={busy}>
            {busy ? "Publishing…" : "Publish"}
          </button>
        </form>
      )}
    </section>
  );
}
