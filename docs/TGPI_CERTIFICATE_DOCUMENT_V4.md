# TGPI Academic Certificate

Edition 2026.5 gives the TGPI academic certificate a more prominent title and an engraved border. The design applies to new and existing active records when the holder downloads the document. It renders the learner name signed at issuance.

## Certificate and portfolio

- The A4 landscape PDF uses an ivory field, a layered navy and antique gold border, fine-line security-document ornament and the TGPI medallion. Cormorant Garamond anchors the academic title and learner name. The frame and verification QR use vector artwork.
- The document presents the holder's issued name, credential reference, issuance date, TGPI Global ID and assessed learning evidence. New issuance uses the full account name as its source. The birth date remains optional on the owner PDF and follows the holder's existing consent setting.
- The portfolio separates issued credentials from available learning paths. The detail page presents the document, current verification status, evidence and owner actions. The lookup accepts a certificate reference or an official TGPI certificate link.
- The QR links to the issuer's existing verification route. Its unobstructed four-module margin is preserved. The PDF download requires authentication, ownership, active status and valid credential integrity.

## Verify a document

1. Scan the QR or open the official TGPI verification page with the certificate reference.
2. Check the live status and compare the displayed name, course and document code with the copy in hand.
3. For independent verification, use the Ed25519 public key from the issuer's `/api/credentials/keys` endpoint whose `kid` matches the compact JWS protected header. Use the decoded JWS payload as the authenticated record after verifying the signature.
4. Check the live issuer record again when relying on archived evidence. The signature covers the exported claims at the time of the check and does not convey future status.

The visible document code is a shortened SHA-256 fingerprint of stable verified claims. The signature authenticates the evidence JSON. The QR and code help match a printed copy to that evidence. The artwork can be reproduced, so a printed seal alone is insufficient to establish authenticity. Sharing settings control public lookup and evidence access.

## Signing key operations

The evidence signing key is derived with HKDF from the existing credential signing secret and separated by deployment environment. Rotating that secret requires retaining trusted prior public keys to independently validate archived exports. New deployments must keep the issuer's signing configuration consistent with the records they verify.
