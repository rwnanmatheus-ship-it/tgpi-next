# TGPI Page Audit Template

Use one copy of this template before changing any route.

## Identification

- Route:
- Product domain:
- Owner:
- Current status: draft | beta | production

## Purpose

- Primary user problem:
- Audience:
- Primary CTA:
- Secondary CTA:

## Access

- Access level: public | authenticated | premium | admin
- Server-side guard:
- Firestore/Storage rules involved:

## Data

- Data read:
- Data written:
- Server-authoritative fields:
- Data source and freshness:
- Privacy classification:

## States

- Loading:
- Empty:
- Error:
- Success:
- Unauthorized:
- Not found:

## Experience

- Mobile behavior:
- Keyboard navigation:
- Visible focus:
- Screen-reader labels:
- Contrast:

## Public discovery

- Metadata title:
- Description:
- Canonical:
- Open Graph:
- Structured data:
- Indexing decision:

## Measurement

- Primary event:
- Secondary events:
- Conversion definition:

## Validation

- Unit tests:
- Integration tests:
- End-to-end test:
- Firestore Rules test:
- Vercel Preview reviewed:

## Definition of done

- [ ] Objective is clear.
- [ ] Every CTA has a real destination.
- [ ] Correct access is enforced.
- [ ] No private data is exposed.
- [ ] Loading, empty, error and success states exist.
- [ ] Mobile layout is reviewed.
- [ ] Accessibility checks pass.
- [ ] Analytics is implemented where required.
- [ ] Public metadata is complete.
- [ ] Lint, typecheck, tests and build pass.
