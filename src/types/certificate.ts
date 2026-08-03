export type CredentialStatus = "active" | "revoked";

export type CredentialIssuer = "TGPI";

export type Credential = {
  id: string;
  ownerUid: string;
  publicName: string;
  programId: string;
  programVersion: string;
  issuedAt: string;
  status: CredentialStatus;
  verificationHash: string;
  issuer: CredentialIssuer;
};

export type UserCertificate = {
  courseId: string;
  issuedAt: string;
};

export type CertificateViewModel = {
  credential: Credential;
  owner: {
    displayName: string;
    tgpiId?: string;
  };
};
