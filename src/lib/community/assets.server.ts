import "server-only";
import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  randomUUID,
} from "node:crypto";
import sharp from "sharp";
import {
  getFirestoreDocument as get,
  createFirestoreUpdateWrite as write,
  runFirestoreTransaction as transaction,
} from "@/lib/firestore-admin-rest.server";
import {
  active,
  canDiscover,
  canRead,
  CommunityError,
  identifier,
  manages,
  postVisible,
  text,
  type Community,
  type Membership,
  type Post,
} from "./model";
import type { CommunityAsset } from "./features";
import { googleStorage } from "./google.server";
const root = "tgpiLearningUsers/_community";
function encryptionKey() {
  if (process.env.TGPI_LEARNING_SECURITY_RULES_CONFIRMED !== "true")
    throw new CommunityError("Protected image storage is unavailable.", 503);
  const key = Buffer.from(process.env.TGPI_COMMUNITY_MEDIA_KEY || "", "base64");
  if (key.length !== 32)
    throw new CommunityError("Protected image storage is not configured.", 503);
  return key;
}
function bucket() {
  return (
    process.env.TGPI_COMMUNITY_STORAGE_BUCKET ||
    `${process.env.TGPI_FIREBASE_PROJECT_ID || "tgpi-next"}-community`
  );
}
export async function uploadCommunityAsset(
  uid: string,
  id: string,
  input: { bytes: Buffer; kind: unknown; post: unknown; alt: unknown },
) {
  identifier(id);
  encryptionKey();
  if (!["post", "avatar", "cover"].includes(String(input.kind)))
    throw new CommunityError("Choose a valid image purpose.");
  const kind = input.kind as CommunityAsset["kind"],
    pid = kind === "post" ? identifier(input.post) : "",
    alt = text(input.alt, 250, true);
  if (input.bytes.length > 3_000_000)
    throw new CommunityError("Use an image under 3 MB.", 413);
  const image = sharp(input.bytes, {
    limitInputPixels: 20_000_000,
    animated: false,
  });
  let metadata: Awaited<ReturnType<typeof image.metadata>>;
  try {
    metadata = await image.metadata();
  } catch {
    throw new CommunityError("Use a valid JPEG, PNG or WebP image.");
  }
  if (
    !["jpeg", "png", "webp"].includes(metadata.format || "") ||
    (metadata.pages || 1) > 1
  )
    throw new CommunityError("Use a still JPEG, PNG or WebP image.");
  const cp = `${root}/communities/${id}`,
    mp = `${cp}/members/${uid}`,
    aid = randomUUID(),
    objectName = `tgpi-community/v1/${aid}.bin`,
    ap = `${cp}/assets/${aid}`;
  const [community, member] = await Promise.all([
    get<Community>(cp),
    get<Membership>(mp),
  ]);
  if (
    !community ||
    !active(member?.data) ||
    community.data.archived ||
    (kind !== "post" && !manages(member?.data))
  )
    throw new CommunityError("Image upload permission required.", 403);
  const bytes = await image
    .rotate()
    .resize({
      width: kind === "avatar" ? 512 : 1280,
      height: kind === "avatar" ? 512 : 1280,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality: 76, effort: 4 })
    .toBuffer();
  if (bytes.length > 350_000)
    throw new CommunityError("Choose a smaller image.", 413);
  const iv = randomBytes(12),
    cipher = createCipheriv("aes-256-gcm", encryptionKey(), iv);
  cipher.setAAD(Buffer.from(`${id}:${kind}:${pid}`));
  const encrypted = Buffer.concat([cipher.update(bytes), cipher.final()]),
    payload = Buffer.concat([iv, cipher.getAuthTag(), encrypted]);
  if (process.env.TGPI_COMMUNITY_STORAGE_BUCKET)
    await googleStorage(
      `/upload/storage/v1/b/${encodeURIComponent(bucket())}/o?${new URLSearchParams({ uploadType: "media", name: objectName, ifGenerationMatch: "0" })}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/octet-stream" },
        body: new Uint8Array(payload),
      },
    );
  try {
    await transaction(async ({ getDocuments }) => {
      const docs = await getDocuments<
          Community &
            Membership & { time: number; bytes: number; count?: number }
        >([cp, mp, `${root}/people/${uid}/uploadLimits/current`]),
        c = docs.get(cp)?.data,
        m = docs.get(mp)?.data,
        previous = docs.get(`${root}/people/${uid}/uploadLimits/current`)?.data;
      const limit =
        previous && Date.now() - previous.time < 86400000
          ? previous
          : { time: Date.now(), bytes: 0, count: 0 };
      if (!c || !active(m) || c.archived || (kind !== "post" && !manages(m)))
        throw new CommunityError("Image upload permission changed.", 403);
      if ((limit.count || 0) >= 40 || limit.bytes + bytes.length > 20_000_000)
        throw new CommunityError("Daily image allowance reached.", 429);
      const asset: CommunityAsset & { ciphertext?: string } = {
        ...(process.env.TGPI_COMMUNITY_STORAGE_BUCKET
          ? {}
          : { ciphertext: payload.toString("base64") }),
        id: aid,
        owner: uid,
        kind,
        post: pid,
        objectName,
        alt,
        bytes: bytes.length,
        createdAt: new Date().toISOString(),
      };
      return {
        result: null,
        writes: [
          write(ap, { ...asset }),
          write(`${root}/people/${uid}/uploadLimits/current`, {
            time: limit.time,
            bytes: limit.bytes + bytes.length,
            count: (limit.count || 0) + 1,
          }),
          ...(kind === "avatar"
            ? [
                write(cp, {
                  ...c,
                  avatarId: aid,
                  updatedAt: new Date().toISOString(),
                }),
              ]
            : kind === "cover"
              ? [
                  write(cp, {
                    ...c,
                    coverId: aid,
                    updatedAt: new Date().toISOString(),
                  }),
                ]
              : []),
        ],
      };
    });
  } catch (e) {
    if (process.env.TGPI_COMMUNITY_STORAGE_BUCKET)
      await googleStorage(
        `/storage/v1/b/${encodeURIComponent(bucket())}/o/${encodeURIComponent(objectName)}`,
        { method: "DELETE" },
      ).catch(() => {});
    throw e;
  }
  return { id: aid, alt, href: `/api/community/assets/${id}/${aid}` };
}
export async function readCommunityAsset(uid: string, id: string, aid: string) {
  identifier(id);
  identifier(aid);
  const cp = `${root}/communities/${id}`;
  const [asset, c, m] = await Promise.all([
    get<CommunityAsset & { ciphertext?: string }>(`${cp}/assets/${aid}`),
    get<Community>(cp),
    uid ? get<Membership>(`${cp}/members/${uid}`) : null,
  ]);
  if (!asset || !c) throw new CommunityError("Image unavailable.", 404);
  if (asset.data.kind === "post") {
    if (!canRead(c.data, m?.data))
      throw new CommunityError("Image unavailable.", 404);
    const post = await get<Post>(`${cp}/posts/${asset.data.post}`);
    if (
      post
        ? !postVisible(post.data, m?.data, uid) ||
          !post.data.attachments?.some((x) => x.id === aid)
        : asset.data.owner !== uid && !manages(m?.data)
    )
      throw new CommunityError("Image unavailable.", 404);
  } else if (!canDiscover(c.data, m?.data))
    throw new CommunityError("Image unavailable.", 404);
  if (
    asset.data.kind === "post" &&
    uid &&
    asset.data.owner !== uid &&
    !manages(m?.data)
  ) {
    const blocks = await Promise.all([
      get<{ blocked: boolean }>(
        `${root}/people/${uid}/blocks/${asset.data.owner}`,
      ),
      get<{ blocked: boolean }>(
        `${root}/people/${asset.data.owner}/blocks/${uid}`,
      ),
    ]);
    if (blocks.some((x) => x?.data.blocked))
      throw new CommunityError("Image unavailable.", 404);
  }
  const bytes = asset.data.ciphertext
    ? Buffer.from(asset.data.ciphertext, "base64")
    : Buffer.from(
        await (
          await googleStorage(
            `/storage/v1/b/${encodeURIComponent(bucket())}/o/${encodeURIComponent(asset.data.objectName)}?alt=media`,
          )
        ).arrayBuffer(),
      );
  try {
    const decipher = createDecipheriv(
      "aes-256-gcm",
      encryptionKey(),
      bytes.subarray(0, 12),
    );
    decipher.setAuthTag(bytes.subarray(12, 28));
    decipher.setAAD(Buffer.from(`${id}:${asset.data.kind}:${asset.data.post}`));
    return Buffer.concat([
      decipher.update(bytes.subarray(28)),
      decipher.final(),
    ]);
  } catch {
    throw new CommunityError("Image unavailable.", 503);
  }
}
