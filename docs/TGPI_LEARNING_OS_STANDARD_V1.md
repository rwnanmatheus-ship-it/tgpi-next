# TGPI Learning OS Standard V1

Status: Foundation specification  
Product language: English  
Owner: TGPI - The Global Polymath Institute

## Product promise

TGPI Learning develops practical global capabilities and produces evidence of what a learner can do. Completion time alone never qualifies a learner for a professional credential.

## The five-phase learning loop

Every lesson follows the same reusable sequence:

1. **Orient** - enter a realistic situation and identify the decision that matters.
2. **Learn** - acquire the smallest useful set of concepts, patterns and examples.
3. **Rehearse** - retrieve and apply the skill under controlled pressure.
4. **Prove** - complete a decision or performance check and receive feedback.
5. **Reflect** - identify a correction and transfer the skill to a real goal.

This rhythm must be consistent across language, decision intelligence, AI adaptability and global economics courses. The interaction changes by subject; the evidence standard does not.

## The three publication gates

### 1. Catalog ready

A course may appear in the learning catalog only when it has:

- a concrete learner audience;
- at least three observable outcomes;
- a named competency map;
- every module mapped to one or more competencies;
- realistic duration and complete lesson content;
- an owner and course version.

### 2. Learning ready

A course may accept learners only when it also has:

- the five-phase TGPI learning loop;
- formative checks with corrective feedback;
- an assessment blueprint totaling 100 percent;
- a performance rubric totaling 100 percent;
- a declared mastery threshold of at least 70 percent;
- a retake and feedback policy;
- accessibility and mobile continuity checks.

### 3. Credential ready

A course may issue a TGPI Professional Certificate only when it also has:

- every assessment component live;
- authenticated learner identity;
- server-side attempt and evidence records;
- module performance gates;
- an integrated capstone or equivalent summative task;
- a final result at or above the course mastery threshold;
- an immutable credential record with revocation status;
- a public verification URL that exposes no private learner data;
- course, assessment, issuer and credential version history.

The product must not display a certificate as earned while this gate is incomplete.

## Assessment architecture

The default TGPI blueprint is:

| Component | Purpose | Default weight |
| --- | --- | ---: |
| Scenario checkpoints | Formative decisions and corrective feedback | 20% |
| Module performance gates | Observable application of each capability | 30% |
| Integrated capstone | Multi-step summative performance | 40% |
| Transfer reflection | Connection to a real global plan | 10% |

Weights may change by discipline, but the total must equal 100 percent. A course cannot become credential ready if any weighted component is not live.

The default performance rubric evaluates clarity, accuracy, judgment and recovery. Subject teams may add dimensions when needed, but the rubric must remain observable, understandable by the learner and versioned with the assessment.

## Credential record

The TGPI credential service must issue a unique, revocable record containing:

- credential ID and public verification URL;
- issuer identity;
- learner-approved public name;
- program ID, title and version;
- credential standard version;
- issue date and current status;
- learning volume;
- competencies demonstrated;
- assessment result and mastery threshold;
- evidence summary and rubric version;
- cryptographic proof or signature method.

Target interoperability standards:

- [1EdTech Open Badges 3.0](https://standards.1edtech.org/open-badges/guides/standards/v3p0/impl)
- [W3C Verifiable Credentials Data Model 2.0](https://www.w3.org/TR/vc-data-model-2.0/)
- [1EdTech Comprehensive Learner Record 2.0](https://www.1edtech.org/standards/clr)

These are implementation targets. TGPI must not claim conformance or certification until the emitted records pass the applicable conformance tests.

## Language-course reference framework

TGPI language courses may map outcomes and can-do statements to the Council of Europe's [CEFR Companion Volume](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-companion-volume-and-its-language-versions).

This is a curriculum reference, not an official CEFR exam or external accreditation. Public copy must preserve that distinction.

## Scalable learning records

Clerk remains the source of identity and may hold a compact summary for the TGPI workspace. Detailed learning records must move to a server-controlled database before the credential gate is released.

Recommended entities:

- `course_versions`
- `competencies`
- `course_competencies`
- `enrollments`
- `lesson_attempts`
- `assessment_attempts`
- `evidence_artifacts`
- `mastery_records`
- `credentials`
- `credential_status_events`

Rules:

- clients never write scores or credential status directly;
- correct answers and scoring rubrics stay server-side;
- attempts are append-only;
- mastery records are derived from validated attempts;
- credentials are issued idempotently after an eligibility transaction;
- revocation never deletes the original issuance event;
- public verification reads a purpose-built credential record, never scans users.

## Course authoring workflow

1. Define the real-world decision or performance outcome.
2. Write observable can-do statements.
3. Build the competency and prerequisite map.
4. Design the capstone before writing lessons.
5. Define rubric dimensions and mastery threshold.
6. Design module performance gates.
7. Write lessons with Orient, Learn, Rehearse, Prove and Reflect.
8. Run content, accessibility, security and assessment-quality review.
9. Pilot with a small learner cohort and analyze item performance.
10. Release the credential only after the credential gate passes.

## Quality and recognition roadmap

World recognition is earned through evidence, interoperability, governance and external trust. The roadmap is:

1. implement the TGPI Learning Standard and verifiable credential service;
2. publish transparent assessment and credential policies;
3. create a qualified academic and industry advisory board;
4. run cohort pilots and publish outcome evidence;
5. pursue partner recognition with employers, schools and mobility organizations;
6. evaluate conformance and certification against relevant standards;
7. prepare the educational management system for [ISO 21001:2025](https://www.iso.org/standard/21001) when TGPI has sufficient operating evidence.

ISO 21001 certification, third-party accreditation and partner recognition are separate claims. TGPI must use each term only after the corresponding external process is complete.
