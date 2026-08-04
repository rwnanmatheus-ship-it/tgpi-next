# TGPI PRODUCT BLUEPRINT v1

**Project:** TGPI — The Global Polymath Institute  
**Status:** Active product architecture document  
**Owner:** Founder / Product Direction  
**Branch:** `feat/tgpi-brand-system`  
**Purpose:** Guide product, UX, design, content, engineering, security and monetization decisions without losing consistency.

---

## 0. How this document must be used

This is not a static presentation. It is the operating blueprint for the TGPI platform.

Every relevant product change must answer five questions before implementation:

1. What user problem does this change solve?
2. Which page, flow or system owns this responsibility?
3. Which reusable component or data contract should support it?
4. How does it preserve TGPI visual and strategic consistency?
5. How will success be validated technically and through user behavior?

A page is not considered complete because it looks good. It is complete when it has a clear purpose, an understandable flow, safe interactions, responsive behavior, measurable outcomes and consistency with the rest of the platform.

---

# CHAPTER 01 — PRODUCT VISION & CORE PHILOSOPHY

## 1.1 What TGPI is

TGPI is a global education, mobility and decision-intelligence platform designed to help people understand countries, prepare for international life and make better long-term decisions.

TGPI must not be perceived as:

- a travel blog;
- a generic country directory;
- a course marketplace;
- a visa agency;
- a social network without purpose;
- a collection of disconnected tools.

TGPI must be perceived as:

> A premium global decision system for people who want to study, work, live, move, build authority or prepare for life across countries.

The product combines four core pillars:

1. **Data** — structured country, cost, language, safety and opportunity information.
2. **Education** — practical learning for international readiness.
3. **Mobility** — documents, preparation, comparisons and global planning.
4. **Decision** — filters, scores, recommendations and next actions.

---

## 1.2 The problem TGPI solves

People interested in international life usually face fragmented information:

- one platform shows salary;
- another shows cost of living;
- another discusses visas;
- social media presents idealized lifestyles;
- official information is difficult to compare;
- personal readiness is rarely considered.

This creates confusion, poor decisions and false expectations.

TGPI solves this by transforming fragmented information into a structured decision journey.

The platform must help the user answer:

- Which countries fit my current objective?
- What trade-offs am I accepting?
- What do I need to prepare?
- Which documents, skills and financial conditions are missing?
- What is my next practical step?
- Is this destination realistic for my current profile?

---

## 1.3 The transformation TGPI delivers

The desired transformation is:

```text
Curiosity
→ Clarity
→ Comparison
→ Preparation
→ Action
→ Global readiness
```

The user should begin with uncertainty and finish with a structured plan.

TGPI does not promise that a country is perfect. TGPI helps the user determine whether a country is suitable for a specific profile, objective and moment.

Core product message:

> Countries are not dreams. They are decisions.

Supporting message:

> Do not choose countries. Filter them.

---

## 1.4 Primary user profiles

### A. Explorer

A user who is curious about living, studying or working abroad but has not yet chosen a destination.

Needs:

- guided discovery;
- country filters;
- comparisons;
- simple explanations;
- low-friction entry.

Primary journey:

```text
Instagram → Home → Countries → Compare → Create account
```

### B. Planner

A user who already has one or more destinations in mind and needs practical preparation.

Needs:

- cost analysis;
- documents;
- readiness checklist;
- country reports;
- saved decisions;
- action plan.

Primary journey:

```text
Country profile → Compare → Passport/Documents → Dashboard
```

### C. Global Builder

A user focused on long-term international identity, career, authority, languages and skills.

Needs:

- profile;
- TGPI identity;
- courses;
- certificates;
- ranking;
- reputation;
- progress tracking.

Primary journey:

```text
Dashboard → Profile → Courses → Certificates → Global identity
```

### D. Premium Decision User

A user willing to pay for deeper analysis, personalization and ongoing guidance.

Needs:

- advanced comparisons;
- personalized recommendations;
- decision reports;
- saved scenarios;
- premium checklists;
- higher-value tools.

Primary journey:

```text
Free value → Clear limitation → Premium benefit → Upgrade
```

---

## 1.5 Product promise

TGPI must deliver three forms of value:

### Immediate value

The user understands something useful within the first minute.

Examples:

- a country comparison;
- a readiness signal;
- a cost estimate;
- a practical checklist;
- a clear next step.

### Progressive value

The product becomes more useful as the user completes a profile, saves countries, compares options and finishes courses.

### Compounding value

Over time, the user builds a persistent global identity composed of:

- saved destinations;
- decisions;
- readiness score;
- documents;
- courses;
- certificates;
- XP;
- reputation;
- goals;
- history.

---

## 1.6 Core product principles

### Principle 1 — Clarity before quantity

TGPI must not overwhelm the user with information simply because the data exists.

Every screen should prioritize:

1. what matters now;
2. what the user should understand;
3. what action should happen next.

### Principle 2 — Decision before decoration

Visual quality is essential, but every visual element must support understanding, trust or action.

No component should exist only to fill space.

### Principle 3 — Editorial trust + SaaS utility

The product must combine:

- the authority and calm of a premium editorial institution;
- the usefulness and interactivity of a modern SaaS platform.

The Instagram establishes editorial trust. The website converts that trust into useful interaction.

### Principle 4 — One brand across every channel

A user moving from Instagram to the website must recognize:

- the same palette;
- the same visual hierarchy;
- the same tone;
- the same strategic language;
- the same institutional quality.

The website must feel like the interactive version of the Instagram content.

### Principle 5 — Every click must have a purpose

Clickable elements must produce one of the following outcomes:

- navigate;
- compare;
- save;
- continue;
- verify;
- learn;
- prepare;
- upgrade;
- complete an action.

Decorative elements must not appear interactive.

### Principle 6 — Mobile is the acquisition surface

A large portion of new traffic will arrive from Instagram on mobile devices.

Therefore:

- primary content must be visible without horizontal friction;
- touch targets must be comfortable;
- text hierarchy must remain clear on small screens;
- the first CTA must be understandable immediately;
- no important journey can depend on desktop-only behavior.

### Principle 7 — Safety and trust are product features

Users may eventually store profile, document, billing and identity information.

Trust must be reinforced through:

- clear permissions;
- secure authentication;
- visible verification states;
- transparent data use;
- predictable interface behavior;
- no misleading claims;
- no fake urgency;
- clear distinction between educational guidance and official legal advice.

### Principle 8 — Progressive disclosure

The platform should reveal complexity when the user needs it.

Example:

```text
Country card
→ Country summary
→ Full report
→ Comparison
→ Personalized recommendation
```

### Principle 9 — Reuse before duplication

Repeated patterns must become reusable components and shared data contracts.

No page should create a new visual language for buttons, cards, badges, section headers or metrics unless the existing system cannot support the requirement.

### Principle 10 — Launchable increments

Every epic must leave the project in a deployable state:

- TypeScript: 0 errors;
- ESLint: 0 errors;
- build: successful;
- existing routes preserved;
- no unfinished critical interaction exposed to users.

---

## 1.7 Desired brand perception

TGPI should be perceived as:

- global;
- intelligent;
- calm;
- premium;
- useful;
- structured;
- trustworthy;
- ambitious;
- modern;
- institutionally credible.

TGPI should not feel:

- noisy;
- childish;
- overly gamified;
- visually random;
- aggressive in sales;
- generic;
- speculative;
- bureaucratic;
- technically confusing.

---

## 1.8 Desired emotional experience

### When arriving from Instagram

The user should feel recognition:

> This is the same TGPI I was viewing on Instagram.

### On the Home page

The user should feel orientation:

> I understand what this platform helps me do.

### In Countries and Compare

The user should feel clarity:

> I can evaluate options instead of guessing.

### During onboarding

The user should feel progress:

> The platform is becoming relevant to my situation.

### Inside the Dashboard

The user should feel direction:

> I know my current status and next step.

### At the Premium decision

The user should feel value, not pressure:

> The paid plan gives me deeper capability and saves decision time.

---

## 1.9 Strategic product loop

The core TGPI loop should become:

```text
Discover a country
→ Compare alternatives
→ Save a decision
→ Complete profile
→ Receive recommendation
→ Take an action
→ Track progress
→ Return for the next decision
```

This loop is more important than isolated page traffic.

---

## 1.10 Primary product metrics

The first product metrics should be organized by stage.

### Acquisition

- Instagram profile visits to website clicks;
- Home landing sessions;
- mobile bounce rate;
- country page entry rate.

### Activation

- account creation rate;
- onboarding completion rate;
- first saved country;
- first comparison completed;
- first readiness action completed.

### Engagement

- returning users;
- countries viewed per session;
- comparisons per user;
- dashboard return frequency;
- course or checklist progress.

### Conversion

- pricing page visits;
- premium CTA clicks;
- waitlist submissions;
- checkout starts;
- paid conversion rate.

### Retention

- weekly active users;
- saved decision revisits;
- progress updates;
- notifications opened;
- new completed actions.

---

## 1.11 Product boundaries

TGPI may educate, compare, organize and recommend.

TGPI must not present educational content as guaranteed legal, immigration, tax, medical or financial advice.

Where applicable, the product must:

- reference official validation;
- show update dates;
- indicate uncertainty;
- separate estimates from confirmed facts;
- identify partner-provided professional services clearly.

---

# CHAPTER 02 — BRAND SYSTEM STATUS

## 2.1 Current visual direction

The approved visual direction is based on the current TGPI Instagram identity:

- off-white editorial backgrounds;
- deep navy institutional sections;
- academic gold highlights;
- black and navy typography;
- serif display headings;
- clean sans-serif interface text;
- realistic global imagery;
- subtle maps, documents, architecture and data elements;
- premium editorial spacing.

## 2.2 Official palette foundation

```text
Canvas / Off-white:   #F8F5EE
Surface / White:      #FFFFFF
Ink / Black:          #0B0B0B
Deep Navy:            #0B1F3A
Academic Gold:        #B58A2A
Warm Border:          #D8D2C4
Muted Text:           #667085
```

The implementation source of truth is `src/app/globals.css`.

## 2.3 Design-system implementation status

Created:

```text
src/components/design-system/
├── Button.tsx
├── Container.tsx
├── EditorialCard.tsx
├── EditorialHeading.tsx
├── EditorialLabel.tsx
├── Section.tsx
└── index.ts
```

Global Header evolution is in progress inside:

```text
src/components/Navbar.tsx
```

---

# CHAPTER 03 — INFORMATION ARCHITECTURE OVERVIEW

## 3.1 Public acquisition layer

```text
Home
├── About
├── Why TGPI
├── Countries
│   └── Country Profile
├── Compare
├── Resources
├── Pricing
├── Premium
└── Login / Account Creation
```

## 3.2 Authenticated product layer

```text
Dashboard
├── Profile
├── Passport
├── Countries / Favorites
├── Compare / Saved comparisons
├── Courses
├── Certificates
├── Notifications
├── Ranking
├── Community / Rooms
└── Upgrade
```

## 3.3 Trust and verification layer

```text
Public Profile
├── /p/[username]
├── /u/[uid]
└── /user/[username]

Certificates
├── /certificates/[id]
├── /certificate/[id]
└── /verify/[id]
```

## 3.4 Administrative and system layer

```text
Admin
API routes
Stripe routes
Firebase Auth
Firestore
Storage
Proxy / route protection
```

---

# CHAPTER 04 — USER JOURNEY FOUNDATION

## 4.1 Instagram acquisition journey

```text
Instagram Reel / Carousel
→ Profile
→ Link in bio
→ Home or campaign landing page
→ Country intelligence or comparison
→ Account creation
→ Onboarding
→ Dashboard
```

## 4.2 Product activation journey

```text
Create account
→ Define objective
→ Define current country
→ Select target countries
→ Receive initial readiness state
→ Save first country
→ Complete first comparison
→ See next recommended action
```

## 4.3 Premium journey

```text
Use free decision tool
→ Reach a meaningful limitation
→ Understand premium outcome
→ View pricing
→ Start checkout
→ Confirm upgrade
→ Unlock advanced feature
```

Premium gates must be connected to clear product value, not arbitrary restrictions.

---

# CHAPTER 05 — PAGE BLUEPRINT PRIORITY ORDER

Each page will receive a detailed blueprint before major redesign.

## Priority 1 — Home

Purpose: acquisition, brand continuity, product explanation and first action.

## Priority 2 — Countries

Purpose: discovery and country decision intelligence.

## Priority 3 — Country Profile

Purpose: convert a country from inspiration into a structured decision report.

## Priority 4 — Compare

Purpose: expose trade-offs and help the user reduce options.

## Priority 5 — Onboarding

Purpose: collect the minimum data required to personalize the product.

## Priority 6 — Dashboard

Purpose: show status, progress and the next best action.

## Priority 7 — Profile and Global Identity

Purpose: represent the user's international readiness, achievements and authority.

## Priority 8 — Passport and Documents

Purpose: organize preparation requirements, document status and verified services.

## Priority 9 — Courses and Certificates

Purpose: transform learning into visible progress and credentials.

## Priority 10 — Premium and Pricing

Purpose: communicate value, limits and upgrade outcomes clearly.

---

# CHAPTER 06 — DELIVERY ROADMAP

## EPIC 04.0 — Brand System

- [x] Visual tokens foundation
- [x] Core design-system components
- [ ] Global Header validation and refinement
- [ ] Footer system
- [ ] Form components
- [ ] Badge and status components
- [ ] Image and illustration rules
- [ ] Motion rules

## EPIC 04.1 — Home Product Architecture

- [ ] Home objective and conversion model
- [ ] Information hierarchy
- [ ] Mobile-first wireframe
- [ ] Editorial visual direction
- [ ] Reusable section implementation
- [ ] SEO and analytics events
- [ ] User testing checklist

## EPIC 04.2 — Countries Experience

- [ ] Discovery flow
- [ ] Filter hierarchy
- [ ] Country-card standard
- [ ] Save and compare behavior
- [ ] Country report consistency
- [ ] Data freshness indicators

## EPIC 04.3 — Decision Engine

- [ ] User input model
- [ ] Fit-score logic
- [ ] Recommendation explanation
- [ ] Saved decisions
- [ ] Scenario comparison

## EPIC 04.4 — Dashboard

- [ ] Next-action architecture
- [ ] Progress model
- [ ] Personal recommendations
- [ ] Saved countries and comparisons
- [ ] Readiness and document status

## EPIC 04.5 — Identity, Passport and Credentials

- [ ] Global profile
- [ ] TGPI ID
- [ ] Certificates
- [ ] Verification
- [ ] Documents and readiness

## EPIC 04.6 — Premium

- [ ] Free vs premium capability map
- [ ] Pricing architecture
- [ ] Upgrade flow
- [ ] Stripe activation
- [ ] Billing management

## EPIC 04.7 — Launch Readiness

- [ ] Security audit
- [ ] Firestore rules review
- [ ] Analytics
- [ ] SEO
- [ ] Accessibility
- [ ] Performance
- [ ] Error monitoring
- [ ] Support and legal pages
- [ ] Production launch checklist

---

# CHAPTER 07 — DEFINITION OF DONE

A product epic is complete only when all applicable items pass:

## Product

- clear user problem;
- clear primary action;
- no duplicate responsibility across pages;
- mobile journey defined;
- empty, loading, success and error states defined.

## Design

- TGPI tokens used;
- approved typography hierarchy;
- reusable components used;
- consistent spacing;
- accessibility contrast reviewed;
- Instagram-to-site continuity preserved.

## Engineering

- TypeScript: 0 errors;
- ESLint: 0 errors;
- production build passes;
- routes preserved;
- data contracts typed;
- no critical security regression;
- responsive behavior tested.

## Business

- intended metric identified;
- conversion or engagement event defined;
- premium impact considered;
- legal or data-risk notes documented.

---

# NEXT BLUEPRINT CHAPTER

The next detailed chapter will be:

> **Home Page Blueprint — Acquisition, trust, clarity and first conversion**

It will define:

- the exact purpose of the Home;
- the first-session user flow;
- section order;
- content hierarchy;
- CTA strategy;
- Instagram continuity;
- mobile wireframe;
- reusable components;
- SEO structure;
- analytics events;
- acceptance criteria before implementation.
