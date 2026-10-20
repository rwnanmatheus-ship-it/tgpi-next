import { googleAccessToken } from "@/lib/community/google.server";
import { configured } from "@/lib/community/store.server";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
let cached: { until: number; value: Record<string, unknown> } | null = null;
export async function GET() {
  if (cached && cached.until > Date.now())
    return Response.json(cached.value, {
      headers: { "Cache-Control": "no-store" },
    });
  const project = process.env.TGPI_FIREBASE_PROJECT_ID || "tgpi-next",
    value: Record<string, unknown> = {
      storageConfigured: configured(),
      notificationClientAccessLocked: false,
      mediaKeyConfigured: Boolean(process.env.TGPI_COMMUNITY_MEDIA_KEY),
      mediaBackend: process.env.TGPI_COMMUNITY_STORAGE_BUCKET
        ? "gcs"
        : "protected-firestore",
      mediaBucketExists: false,
      mediaProvisioningPermitted: false,
    };
  try {
    const token = await googleAccessToken(
        "https://www.googleapis.com/auth/cloud-platform",
      ),
      get = async (url: string) => {
        const r = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        });
        return r.ok ? r.json() : null;
      };
    const [db, release, bucket, iam] = await Promise.all([
      get(
        `https://firestore.googleapis.com/v1/projects/${project}/databases/(default)`,
      ),
      get(
        `https://firebaserules.googleapis.com/v1/projects/${project}/releases/cloud.firestore`,
      ),
      get(
        `https://storage.googleapis.com/storage/v1/b/${encodeURIComponent(process.env.TGPI_COMMUNITY_STORAGE_BUCKET || `${project}-community`)}`,
      ),
      fetch(
        `https://cloudresourcemanager.googleapis.com/v1/projects/${project}:testIamPermissions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            permissions: [
              "storage.buckets.create",
              "storage.objects.create",
              "storage.objects.get",
              "storage.objects.delete",
            ],
          }),
          cache: "no-store",
        },
      ).then(async (r) => (r.ok ? r.json() : null)),
    ]);
    value.databaseEdition = db?.databaseEdition || "unavailable";
    value.mediaBucketExists = Boolean(bucket);
    value.mediaProvisioningPermitted =
      iam?.permissions?.includes("storage.buckets.create") === true;
    value.mediaObjectAccessPermitted = [
      "storage.objects.create",
      "storage.objects.get",
      "storage.objects.delete",
    ].every((p) => iam?.permissions?.includes(p));
    if (release?.rulesetName) {
      const rules = await get(
        `https://firebaserules.googleapis.com/v1/${release.rulesetName}`,
      );
      const text = (rules?.source?.files || [])
        .map((f: { content: string }) => f.content.replace(/\/\/[^\n]*/g, ""))
        .join("\n");
      const statements = [...text.matchAll(/allow\s+[^;]+;/g)].map((m) => m[0]);
      value.notificationClientAccessLocked =
        statements.length > 0 &&
        statements.every((s) => /\bif\s+false\s*;/.test(s));
    }
  } catch {
    value.diagnosticsAvailable = false;
  }
  cached = { until: Date.now() + 600000, value };
  return Response.json(value, { headers: { "Cache-Control": "no-store" } });
}
