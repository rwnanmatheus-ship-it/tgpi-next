# TGPI Target Architecture

## Product boundaries

TGPI is organized into the following product domains:

- Marketing
- Authentication
- Member dashboard
- Country intelligence
- Country comparison
- Learning
- Credentials
- Billing
- Waitlist
- Administration

## Route groups

```text
src/app/
├── (marketing)/
├── (auth)/
├── (member)/
├── (verification)/
├── (admin)/
└── api/
```

Each route group must own its layout and access policy.

## Source organization

```text
src/
├── app/
├── features/
│   ├── auth/
│   ├── users/
│   ├── countries/
│   ├── comparison/
│   ├── learning/
│   ├── credentials/
│   ├── billing/
│   ├── onboarding/
│   └── waitlist/
├── server/
│   ├── auth/
│   ├── permissions/
│   ├── repositories/
│   ├── services/
│   ├── firebase/
│   └── stripe/
├── shared/
│   ├── ui/
│   ├── layouts/
│   ├── forms/
│   ├── feedback/
│   └── analytics/
├── schemas/
├── types/
├── data/
└── config/
```

## Authority rules

The browser may update user-owned preferences and draft content only.

The browser must never directly write:

- `role`
- `plan`
- `subscriptionStatus`
- Stripe identifiers
- XP or level
- verification status
- issued credentials
- administrative state

Those fields are server-authoritative.

## Canonical data boundaries

```text
users/{uid}
publicProfiles/{uid}
subscriptions/{uid}
users/{uid}/savedCountries/{slug}
users/{uid}/courseProgress/{courseId}
users/{uid}/countryPlans/{planId}
credentials/{credentialId}
premiumWaitlist/{leadId}
```

## Page contract

Every route must document:

- purpose;
- audience;
- access policy;
- primary CTA;
- data read;
- data written;
- permissions;
- loading, empty, error and success states;
- mobile behavior;
- analytics;
- SEO;
- accessibility;
- tests;
- definition of done.

## Definition of done

A route is complete only when:

- every interactive element works;
- access is enforced at the correct boundary;
- private data is not exposed;
- all states are implemented;
- mobile behavior is reviewed;
- keyboard navigation and visible focus work;
- public metadata is complete;
- lint, typecheck, tests and build pass;
- the Vercel Preview is reviewed.
