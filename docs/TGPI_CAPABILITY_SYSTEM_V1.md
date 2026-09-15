# TGPI Capability System V1

## Purpose

The Capability System connects TGPI Learning, Documents OS, Credential
Intelligence and Global Key as one product journey instead of four isolated
destinations.

## Product architecture

| Layer | Canonical route | User outcome | Trust boundary |
| --- | --- | --- | --- |
| Learn | `/courses` | Build observable capability through applied learning | Progress is private and account-bound |
| Prepare | `/passport` | Organize country-aware document research | TGPI does not store legal files in this release |
| Prove | `/certificates` | Inspect and share assessed learning evidence | Credentials remain revocable and publicly verifiable |
| Anchor | `/global-key` | Bind progress to a stable TGPI identity | The key is not a password, wallet or government identity |

`/documents` is a permanent compatibility route to `/passport`. This protects
existing navigation and future naming flexibility without creating two sources
of truth.

## Shared interface

- `src/components/capability/CapabilitySystemRail.tsx` is the reusable product
  navigator used by all four areas.
- `src/lib/capability-system.ts` is the typed registry for routes, phases and
  product language.
- `src/app/capability-system.css` owns the responsive frame, four-to-two-to-one
  grid behavior, TGPI material treatment and reduced-motion support.
- Credential Intelligence is a first-class Super App module and can be found by
  certificate, credential, skills, mastery or verification searches.

## Responsive contract

- The shared content frame is capped at `85rem` and keeps fluid gutters.
- Capability navigation uses `minmax(0, 1fr)` to prevent intrinsic content from
  forcing horizontal overflow at 100% browser zoom.
- Four columns collapse to two below `68rem` and one below `42rem`.
- Long identifiers and descriptions use safe wrapping.
- Touch targets remain at least 44px and motion is removed when the user asks
  for reduced motion.

## Extension rule

Future learning paths, document workflows and credential profiles must extend
the typed registry and reuse the shared rail. Do not create a separate visual
or navigation model for a new capability page.
