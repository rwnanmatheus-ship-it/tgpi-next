# TGPI Certificate Document V4

The signed learning record stays unchanged. The presentation layer renders the current document edition (`2026.2`) whenever an owner downloads an existing active certificate.

## Document

- A4 landscape vector PDF with the original high-resolution TGPI crest, embedded sans/serif fonts, learner name, TGPI Global ID, certificate ID, original issuance date, mastery, required threshold and learning volume.
- Vector QR with a four-module quiet zone and clickable public verification URL.
- Own TGPI issuer quality seal and identity/assessment/public-verification marks. No third-party accreditation emblems or universal acceptance claims.
- Public and owner pages share one readable, responsive document composition. Owner-only PDF download controls are hidden in public views; the server still checks ownership and live integrity.
- Assessment evidence and international format references are available in an expandable section. External format names remain implementation targets.

## Existing certificates

Download latest PDF refreshes the visual document. It preserves the existing certificate reference, learner name at issuance, original issue date and signed assessment evidence. No course retake, new assessment submission, identity change or database rewrite is performed. Revoked or integrity-invalid records cannot receive an active certificate PDF.

## Validation

- TypeScript, credential/PDF authorization tests and production build passed.
- Actual issued-record rendering was inspected at A4 landscape size; text extraction confirmed learner name, Global ID, certificate ID and learning metrics.
- The QR in the rendered PDF was independently decoded and matched its original public verification URL.
- Next.js output tracing includes the original print crest and both fonts.
