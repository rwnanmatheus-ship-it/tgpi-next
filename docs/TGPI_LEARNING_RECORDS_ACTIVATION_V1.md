# TGPI Learning Records & Credentials — Activation Runbook V1

Status: implemented for Preview; server infrastructure activation required before production.

## What is now implemented

- Seven protected assessments for `english-abroad`: six module gates and one integrated capstone.
- Server-only answer key and scoring. Correct answers are never serialized into the course page.
- Append-only assessment attempts plus one transactional course summary per learner.
- Weighted credential score: checkpoints 20%, module gates 30%, capstone 40%, transfer reflection 10%.
- Credential eligibility only after all 18 lessons, all six gates, the capstone, a 120-character transfer reflection, an 80% final score and verified Clerk email.
- Explicit learner consent before the account name becomes public on a credential.
- Idempotent credential issuance, HMAC integrity signature, private owner record and filtered public verification record.
- Public verification at `/verify/credentials/{credentialId}` and owner view at `/certificates/{credentialId}`.

This is a TGPI-issued professional learning record. It does not claim a government degree, professional license or third-party accreditation.

## Data model

| Firestore path | Purpose | Access expectation |
| --- | --- | --- |
| `tgpiLearningUsers/{uid}/courses/{courseId}` | Current assessment summary and credential linkage | Server only |
| `tgpiLearningUsers/{uid}/attempts/{attemptId}` | Append-only scored attempt, selections and reflection | Server only |
| `tgpiLearningUsers/{uid}/credentials/{credentialId}` | Full owner credential record | Server only |
| `tgpiLearningCredentials/{credentialId}` | Source record for filtered server-rendered public verification | Server only |

The browser never reads these collections directly. Public verification is rendered through the TGPI server and removes `ownerUid` and `verificationHash`.

## Required server variables

Set these only in Vercel server environments. Never prefix them with `NEXT_PUBLIC_`.

```text
TGPI_FIREBASE_PROJECT_ID=tgpi-next
TGPI_FIREBASE_CLIENT_EMAIL=<service-account-email>
TGPI_FIREBASE_PRIVATE_KEY=<service-account-private-key>
TGPI_CREDENTIAL_SIGNING_SECRET=<at-least-32-random-characters>
TGPI_LEARNING_SECURITY_RULES_CONFIRMED=true
```

Use a least-privilege service account scoped to the target Firestore project. Rotate the credential immediately if it is ever exposed outside the server environment.

## Mandatory Firestore rule protection

Merge the following matches into the active `service cloud.firestore` ruleset and deploy it before setting `TGPI_LEARNING_SECURITY_RULES_CONFIRMED=true`:

```text
match /tgpiLearningUsers/{document=**} {
  allow read, write: if false;
}

match /tgpiLearningCredentials/{document=**} {
  allow read, write: if false;
}
```

Firebase Admin/service-account requests bypass Firestore Security Rules; browser SDK requests do not. Review the complete existing ruleset before deployment so unrelated TGPI collections retain their intended access.

## Activation sequence

1. Create or select the Firestore project and a least-privilege service account.
2. Merge, review and deploy the two deny rules above.
3. Add the five variables to Preview only.
4. Verify a signed-in learner cannot submit a gate before its module lessons are complete.
5. Complete the test learner path; verify retry history, score weights and explicit public-name consent.
6. Open the owner credential and its public verification URL in separate authenticated and anonymous sessions.
7. Tamper with a test credential in Firestore and confirm the public page changes to `Credential requires review`.
8. Revoke a test credential and confirm public status is not presented as valid.
9. Only after the checklist passes, copy the variables to Production and change delivery statuses from `preview` to `live` in a separately authorized release.

## Operational notes

- Changing `TGPI_CREDENTIAL_SIGNING_SECRET` invalidates existing V1 signatures. Introduce a new key ID and retain the old verification key during a planned rotation.
- Firestore transaction conflicts retry up to three times. A course summary and its attempts/credential are committed atomically.
- Assessment text and explanations are versioned with the course source. Material assessment changes should increment the course version.
- Revocation administration is intentionally not exposed in this preview. It should require an audited admin-only workflow before production credential issuance.
