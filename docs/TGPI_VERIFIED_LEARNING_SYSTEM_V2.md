# TGPI Verified Learning System V2

Status: implemented on an isolated Preview branch. Production activation requires a separate authorization and the security ceremony below.

## Product decision

TGPI credentials are evidence records, not decorative completion PDFs.

The V2 trust chain is:

1. Authenticated learner.
2. Versioned applied-learning course.
3. Lesson checkpoints stored in private Clerk metadata.
4. Six server-scored module decision gates.
5. One integrated capstone plus transfer reflection.
6. Weighted score at or above 80%.
7. Verified primary email.
8. Active TGPI Global Key.
9. Explicit consent for the public name and Global Key ID.
10. Idempotent server-side credential issuance.
11. Live public status and integrity verification.
12. Portable JSON evidence record.

## What the V2 implements

- One certification pathway for Global English with seven protected assessments.
- Correct answers remain in a server-only assessment bank.
- Failed submissions do not return per-question correctness data.
- A 30-second anti-automation interval protects scored retakes.
- Every attempt is append-only and each course has one transactional summary.
- Credential scoring weights:
  - 20% lesson checkpoints.
  - 30% module gates.
  - 40% integrated capstone.
  - 10% transfer reflection.
- Credential issuance requires all 18 lessons, all six module gates, the capstone, the reflection, 80% weighted mastery, verified email and a valid TGPI Global Key.
- The issued record binds course version, assessment result, skills, evidence, Global Key fingerprint and the identity anchor state.
- HMAC-SHA-256 protects the complete canonical record.
- Public verification removes Clerk UID, email, private answers, reflection text and the secret verification hash.
- A derived public fingerprint allows records to be compared without revealing signing material.
- QR, native share, copy, print and portable JSON download are provided.
- Legacy routes no longer query entire Firestore collections or render unverified completion certificates.

## Honest international positioning

V2 uses the metadata concepts required by modern digital credential ecosystems: issuer, holder, achievement, criteria, result, evidence, skills, status and integrity.

Alignment targets:

- 1EdTech Open Badges 3.0.
- W3C Verifiable Credentials Data Model 2.0.
- 1EdTech Comprehensive Learner Record 2.0.

V2 does not claim:

- university or government accreditation;
- professional licensing authority;
- 1EdTech product conformance certification;
- a W3C endorsement;
- independent cryptographic verification while the public Base anchor is not confirmed.

The portable record explicitly labels these standards as implementation targets.

## Data model

| Firestore path | Purpose | Browser access |
| --- | --- | --- |
| tgpiLearningUsers/{uid}/courses/{courseId} | Transactional course summary | Denied |
| tgpiLearningUsers/{uid}/attempts/{attemptId} | Append-only assessment attempt | Denied |
| tgpiLearningUsers/{uid}/credentials/{credentialId} | Full owner record | Denied |
| tgpiLearningCredentials/{credentialId} | Public-source issuer record | Denied; read through server |

The server renders a filtered public representation. The browser does not read these collections directly.

## Required server variables

Set only in Vercel server environments. Never use the NEXT_PUBLIC prefix.

- TGPI_FIREBASE_PROJECT_ID
- TGPI_FIREBASE_CLIENT_EMAIL
- TGPI_FIREBASE_PRIVATE_KEY
- TGPI_CREDENTIAL_SIGNING_SECRET
- TGPI_LEARNING_SECURITY_RULES_CONFIRMED=true
- TGPI_GLOBAL_KEY_SECRET
- TGPI_GLOBAL_KEY_SECRET_B when key rotation is active

The credential signing secret must contain at least 32 random characters. Rotating it without a key ring invalidates existing V2 signatures; production rotation must first introduce a new key ID while retaining the previous verification key.

## Mandatory Firestore rules

Merge and deploy these deny rules before setting TGPI_LEARNING_SECURITY_RULES_CONFIRMED=true:

    match /tgpiLearningUsers/{document=**} {
      allow read, write: if false;
    }

    match /tgpiLearningCredentials/{document=**} {
      allow read, write: if false;
    }

Firebase Admin requests bypass these rules. Browser SDK requests do not. Review the complete existing ruleset before deployment to preserve unrelated TGPI access.

## Activation gate

1. Deploy the two deny rules.
2. Create a least-privilege service account for the correct Firestore project.
3. Configure the five learning-record variables in Preview only.
4. Keep Base anchoring disabled.
5. Complete one full test-learner course.
6. Verify lesson gating, retake interval and hidden failed-answer feedback.
7. Issue one test credential.
8. Open the private certificate and anonymous public verifier.
9. Download the portable evidence record and confirm it contains no UID, email, answers or reflection.
10. Tamper with a test record and confirm the verifier moves to integrity review.
11. Mark a test record revoked and confirm it is never shown as valid.
12. Only after this gate may the configuration be copied to Production in a separately authorized release.

## Next interoperability phases

- V2.1: audited admin revocation workflow and immutable audit log.
- V2.2: credential-specific Merkle batching and Base Mainnet receipt.
- V2.3: standards-conformant EdDSA/ECDSA Data Integrity proof and external wallet export.
- V2.4: 1EdTech conformance test suite and organizational certification, if commercially justified.
- V3: Comprehensive Learner Record aggregating multiple TGPI credentials.
