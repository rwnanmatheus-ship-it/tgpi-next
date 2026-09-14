export const TGPI_VERIFIED_LEARNING_SCHEMA_VERSION = 2 as const;
export const TGPI_VERIFIED_LEARNING_PROFILE =
  "TGPI Verified Learning Credential" as const;

export const TGPI_CREDENTIAL_ALIGNMENT_TARGETS = [
  "1EdTech Open Badges 3.0",
  "W3C Verifiable Credentials Data Model 2.0",
  "1EdTech Comprehensive Learner Record 2.0",
] as const;

export type CredentialTrustState =
  | "active_verified"
  | "revoked"
  | "integrity_review";

type PortableCredentialSource = {
  achievementType: string;
  assessmentScore: number;
  courseId: string;
  courseTitle: string;
  courseVersion: string;
  credentialProfile: string;
  credentialSchemaVersion: number;
  credentialStandardVersion: string;
  criteriaUrl: string;
  evidenceSummary: string[];
  id: string;
  identityEvidence: {
    anchor: { status: string };
    fingerprint: string;
    globalKeyId: string;
    revision: number;
  };
  integrityFingerprint: string;
  integrityVerified: boolean;
  issuedAt: string;
  issuer: string;
  learningHours: number;
  masteryThreshold: number;
  publicName: string;
  skills: Array<{ id: string; level: string; name: string }>;
  standardsAlignment: string[];
  status: string;
};

function cleanOrigin(origin: string) {
  return origin.replace(/\/+$/, "");
}

export function getCredentialTrustState(input: {
  integrityVerified: boolean;
  status: string;
}): CredentialTrustState {
  if (input.status === "revoked") return "revoked";
  return input.integrityVerified ? "active_verified" : "integrity_review";
}

export function createPortableLearningRecord(
  credential: PortableCredentialSource,
  origin: string,
) {
  const canonicalOrigin = cleanOrigin(origin);
  const verificationUrl =
    canonicalOrigin +
    "/verify/credentials/" +
    encodeURIComponent(credential.id);

  return {
    format: "TGPI Learning Evidence Record",
    formatVersion: "2.0",
    id: credential.id,
    type: credential.credentialProfile,
    achievement: {
      id: canonicalOrigin + "/courses/" + credential.courseId,
      name: credential.courseTitle,
      type: credential.achievementType,
      version: credential.courseVersion,
      criteria: {
        narrative: credential.evidenceSummary,
        url: canonicalOrigin + credential.criteriaUrl,
      },
      result: {
        achievedScore: credential.assessmentScore,
        learningHours: credential.learningHours,
        masteryThreshold: credential.masteryThreshold,
      },
      skills: credential.skills,
    },
    holder: {
      globalKey: {
        anchorStatus: credential.identityEvidence.anchor.status,
        fingerprint: credential.identityEvidence.fingerprint,
        id: credential.identityEvidence.globalKeyId,
        revision: credential.identityEvidence.revision,
      },
      name: credential.publicName,
    },
    integrity: {
      algorithm: "HMAC-SHA-256 server verification",
      fingerprint: credential.integrityFingerprint,
      verified: credential.integrityVerified,
    },
    issuedAt: credential.issuedAt,
    issuer: {
      id: canonicalOrigin,
      name: credential.issuer,
    },
    profile: {
      alignmentTargets: credential.standardsAlignment.map((name) => ({
        name,
        status: "implementation-target",
      })),
      schemaVersion: credential.credentialSchemaVersion,
      standardVersion: credential.credentialStandardVersion,
    },
    status: credential.status,
    verificationUrl,
    disclaimer:
      "This is a TGPI-issued professional learning record. It is not a government degree, professional license, third-party accreditation, or a claim of 1EdTech/W3C product certification.",
  };
}
