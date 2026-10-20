export type Visibility = "public" | "private" | "hidden";
export type Admission = "instant" | "approval" | "invite";
export type Role = "member" | "moderator" | "owner";
export type Membership = {
  uid: string;
  role: Role;
  state: "active" | "pending" | "declined" | "left" | "suspended" | "banned";
  acceptedVersion: number;
  answers: string;
  updatedAt: string;
  reason: string;
};
export type Community = {
  id: string;
  name: string;
  description: string;
  about: string;
  destination: string;
  language: string;
  theme: string;
  visibility: Visibility;
  admission: Admission;
  rules: string;
  rulesVersion: number;
  entryQuestion: string;
  welcome: string;
  owner: string;
  memberCount: number;
  archived: boolean;
  transferTo: string;
  createdAt: string;
  updatedAt: string;
};
export type Post = {
  id: string;
  community: string;
  author: string;
  authorName: string;
  handle: string;
  kind: "discussion" | "question" | "experience" | "guide";
  title: string;
  body: string;
  destination: string;
  context: string;
  source: string;
  accepted: string;
  pinned: boolean;
  removed: boolean;
  createdAt: string;
  updatedAt: string;
};
export type Comment = {
  id: string;
  post: string;
  author: string;
  authorName: string;
  body: string;
  removed: boolean;
  createdAt: string;
  updatedAt: string;
};
export type GlobalSession = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  timeZone: string;
  url: string;
  capacity: number;
  attendeeCount: number;
  cancelled: boolean;
  createdAt: string;
};
export type CommunityCard = Community & {
  membership: Membership | null;
  recommendation?: string;
};
export type CommunityDetail = {
  community: Community;
  membership: Membership | null;
  posts: (Post & { saved: boolean })[];
  next: string | null;
};
export type Page<T> = { items: T[]; next: string | null };
export type Management = {
  members: Page<Membership>;
  reports: Page<Report>;
  invites: Page<Invite>;
  audit: Page<{
    action: string;
    target: string;
    actor: string;
    reason: string;
    createdAt: string;
  }>;
};
export type Report = {
  id: string;
  post: string;
  comment: string;
  reporter: string;
  reason: string;
  status: string;
  decision: string;
};
export type Invite = {
  id: string;
  expiresAt: string;
  uses: number;
  maxUses: number;
  revoked: boolean;
};
export const defaultRules =
  "1. Respect people and their backgrounds.\n2. Protect personal information.\n3. No spam, scams or unsolicited promotion.\n4. Distinguish personal experience from sourced information.\n5. Include sources and dates where relevant.\nLocal rules complement TGPI policies.";
export class CommunityError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export function text(v: unknown, max: number, required = false) {
  const s = typeof v === "string" ? v.trim() : "";
  if (s.length > max || (required && !s))
    throw new CommunityError(
      `Enter ${required ? "1–" : "0–"}${max} characters.`,
    );
  return s;
}
export function identifier(v: unknown) {
  const s = text(v, 60, true);
  if (!/^[a-z0-9][a-z0-9-]{2,59}$/.test(s))
    throw new CommunityError(
      "Use 3–60 lowercase letters, numbers and hyphens.",
    );
  return s;
}
export function active(m?: Membership | null) {
  return m?.state === "active";
}
export function manages(m?: Membership | null) {
  return active(m) && (m?.role === "owner" || m?.role === "moderator");
}
export function canRead(c: Community, m?: Membership | null) {
  return (
    !["banned", "suspended"].includes(m?.state || "") &&
    (c.visibility === "public" || active(m))
  );
}
export function canDiscover(c: Community, m?: Membership | null) {
  return c.visibility !== "hidden" || active(m);
}
export function validateAccess(visibility: unknown, admission: unknown) {
  if (
    !["public", "private", "hidden"].includes(String(visibility)) ||
    !["instant", "approval", "invite"].includes(String(admission))
  )
    throw new CommunityError("Choose valid access settings.");
  if (visibility === "hidden" && admission !== "invite")
    throw new CommunityError("Hidden communities require invitations.");
  return {
    visibility: visibility as Visibility,
    admission: admission as Admission,
  };
}
export function sourceUrl(v: unknown) {
  const s = text(v, 500);
  if (s) {
    let u: URL;
    try {
      u = new URL(s);
    } catch {
      throw new CommunityError("Use a valid HTTPS URL.");
    }
    if (u.protocol !== "https:" || u.username || u.password)
      throw new CommunityError("Use a valid HTTPS URL.");
  }
  return s;
}
export type CommunityPreferences = {
  personalized: boolean;
  interests: string[];
  muted: string[];
  hidden: string[];
};
export function parseCommunityPreferences(v: unknown): CommunityPreferences {
  const x = v && typeof v === "object" ? (v as Record<string, unknown>) : {};
  function list(v: unknown, max: number) {
    if (!Array.isArray(v)) return [];
    if (v.length > 30) throw new CommunityError("Choose up to 30 items.");
    return [...new Set(v.map((y) => text(y, max, true)))];
  }
  return {
    personalized: x.personalized === true,
    interests: list(x.interests, 100),
    muted: list(x.muted, 60).map(identifier),
    hidden: list(x.hidden, 60).map(identifier),
  };
}
