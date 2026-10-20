import { text, identifier, CommunityError } from "./model";
export const journeyStages = [
  "Exploring possibilities",
  "Choosing a destination",
  "Preparing the move",
  "First months abroad",
  "Building an international life",
] as const;
export function searchTokens(...values: string[]) {
  const words = values
    .join(" ")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 2)
    .slice(0, 35);
  return [
    ...new Set(
      words.flatMap((w) =>
        Array.from({ length: Math.min(w.length, 24) - 1 }, (_, i) =>
          w.slice(0, i + 2),
        ),
      ),
    ),
  ].slice(0, 400);
}
export function searchQuery(v: unknown) {
  return (
    text(v, 100)
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .split(/[^a-z0-9]+/)
      .filter(Boolean)[0]
      ?.slice(0, 24) || ""
  );
}
export function moderatorSettings(v: Record<string, unknown>) {
  const seconds = Number(v.slowModeSeconds || 0);
  if (!Number.isInteger(seconds) || seconds < 0 || seconds > 3600)
    throw new CommunityError("Slow mode must be between 0 and 3600 seconds.");
  return { postApproval: v.postApproval === true, slowModeSeconds: seconds };
}
export type Playbook = {
  id: string;
  title: string;
  description: string;
  posts: string[];
  updatedAt: string;
  editor: string;
};
export type ParticipationAppeal = {
  id: string;
  uid: string;
  body: string;
  state: "pending" | "reviewed";
  decision: string;
  updatedAt: string;
};
export type CommunityAsset = {
  id: string;
  owner: string;
  post: string;
  kind: "post" | "avatar" | "cover";
  objectName: string;
  alt: string;
  bytes: number;
  createdAt: string;
};
export type Attachment = { id: string; alt: string };
export function attachments(v: unknown): Attachment[] {
  if (v === undefined) return [];
  if (!Array.isArray(v) || v.length > 4)
    throw new CommunityError("Add up to four images.");
  return v.map((item) => {
    if (!item || typeof item !== "object")
      throw new CommunityError("Invalid image.");
    return { id: identifier(item.id), alt: text(item.alt, 250, true) };
  });
}
