"use client";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import type { Playbook } from "@/lib/community/features";
import type { Page, Post } from "@/lib/community/model";
import { api, type Action } from "./api";
import s from "./Community.module.css";
type Book = Playbook & {
  sources: {
    id: string;
    title: string;
    authorName: string;
    updatedAt: string;
  }[];
};
export default function CommunityPlaybooks({
  community,
  posts,
  manage,
  action,
  busy,
}: {
  community: string;
  posts: Post[];
  manage: boolean;
  action: Action;
  busy: boolean;
}) {
  const [books, setBooks] = useState<Book[]>([]),
    [next, setNext] = useState<string | null>(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [title, setTitle] = useState(""),
    [description, setDescription] = useState(""),
    [chosen, setChosen] = useState<string[]>([]),
    [id, setId] = useState(() => crypto.randomUUID());
  const load = useCallback(
    async (after = "") => {
      try {
        const p = await api<Page<Book>>({
          community,
          playbooks: "1",
          ...(after ? { after } : {}),
        });
        setBooks((prev) => (after ? [...prev, ...p.items] : p.items));
        setNext(p.next);
      } catch (e) {
        setError((e as Error).message);
      }
    },
    [community],
  );
  useEffect(() => {
    let live = true;
    api<Page<Book>>({ community, playbooks: "1" })
      .then((p) => {
        if (live) {
          setBooks(p.items);
          setNext(p.next);
        }
      })
      .catch((e) => {
        if (live) setError(e.message);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [community]);
  return (
    <section className={s.panel}>
      <h2>Community playbooks</h2>
      <p>
        Practical reading paths, with original authors and source discussions
        preserved.
      </p>
      {error && <p role="alert">{error}</p>}
      {books.map((b) => (
        <article className={s.reply} key={b.id}>
          <h3>{b.title}</h3>
          <p>{b.description}</p>
          <p className={s.meta}>
            Updated {new Date(b.updatedAt).toLocaleDateString()}
          </p>
          <ol>
            {b.sources.map((p) => (
              <li key={p.id}>
                <Link href={`/community/${community}?post=${p.id}`}>
                  {p.title}
                </Link>{" "}
                · {p.authorName}
              </li>
            ))}
          </ol>
          {!b.sources.length && <p>No source is currently available to you.</p>}
        </article>
      ))}
      {!loading && !books.length && <p>No playbooks yet.</p>}
      {next && (
        <button className={s.secondary} onClick={() => void load(next)}>
          Load more playbooks
        </button>
      )}
      {manage && (
        <details>
          <summary>Curate a playbook</summary>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              if (
                await action({
                  action: "playbook",
                  id,
                  title,
                  description,
                  posts: chosen,
                })
              ) {
                setTitle("");
                setDescription("");
                setChosen([]);
                setId(crypto.randomUUID());
                void load();
              }
            }}
          >
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
              Purpose
              <textarea
                maxLength={2000}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <fieldset>
              <legend>Select up to 20 loaded publications</legend>
              {posts
                .filter((p) => p.state !== "pending")
                .map((p) => (
                  <label key={p.id}>
                    <input
                      type="checkbox"
                      checked={chosen.includes(p.id)}
                      onChange={(e) =>
                        setChosen(
                          e.target.checked
                            ? [...chosen, p.id]
                            : chosen.filter((x) => x !== p.id),
                        )
                      }
                    />
                    {p.title}
                  </label>
                ))}
            </fieldset>
            <button
              className={s.button}
              disabled={busy || !chosen.length || chosen.length > 20}
            >
              Save playbook
            </button>
          </form>
        </details>
      )}
    </section>
  );
}
