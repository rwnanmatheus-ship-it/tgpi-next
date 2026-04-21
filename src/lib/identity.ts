export type DocumentType = "passport" | "cpf" | "ssn" | "national_id" | "other";

export function normalizeUsername(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/^@+/, "")
    .replace(/[^a-z0-9._]/g, "")
    .slice(0, 24);
}

export function validateUsername(value: string): string | null {
  const normalized = normalizeUsername(value);

  if (!normalized) return "Username is required.";
  if (normalized.length < 3) return "Username must have at least 3 characters.";
  if (!/^[a-z0-9._]+$/.test(normalized)) {
    return "Username can only contain letters, numbers, dots, and underscores.";
  }

  return null;
}

export function maskDocumentNumber(
  type?: string,
  value?: string | null
): string {
  const raw = String(value || "").trim();
  if (!raw) return "Not provided";

  const onlyDigits = raw.replace(/\D/g, "");
  const last4 = (onlyDigits || raw).slice(-4);

  switch (type) {
    case "cpf":
      return `***.***.***-${last4.padStart(2, "*").slice(-2)}`;
    case "ssn":
      return `***-**-${last4.padStart(4, "*").slice(-4)}`;
    case "passport":
      return `Passport ending in ${last4.padStart(4, "*").slice(-4)}`;
    case "national_id":
      return `ID ending in ${last4.padStart(4, "*").slice(-4)}`;
    default:
      return `Document ending in ${last4.padStart(4, "*").slice(-4)}`;
  }
}

export function prettifyIntent(value?: string): string {
  if (!value) return "Not defined";

  const map: Record<string, string> = {
    work: "Work",
    relocation: "Relocation",
    tourism: "Tourism",
    study: "Study",
    networking: "Networking",
  };

  return map[value] || value;
}

export function prettifySex(value?: string): string {
  if (!value) return "Not defined";

  const map: Record<string, string> = {
    male: "Male",
    female: "Female",
    non_binary: "Non-binary",
    prefer_not_to_say: "Prefer not to say",
  };

  return map[value] || value;
}