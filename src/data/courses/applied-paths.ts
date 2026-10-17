import type { Course } from "@/types/course";
import { assertCourseLearningReady } from "@/lib/learning-standard";

export const appliedCourses: Course[] = ([
  {
    "id": "country-fit",
    "version": "1.0.0",
    "title": "Country Fit: Choose Where You Can Thrive",
    "description": "Compare countries against your constraints, evidence and priorities before committing to a move.",
    "category": "Decision Intelligence",
    "level": "Practical Foundation",
    "audience": "People preparing a realistic international life or career plan.",
    "estimatedMinutes": 60,
    "modules": [
      {
        "id": "country-fit-1-module",
        "title": "Define your non-negotiables",
        "description": "Separate legal feasibility from lifestyle preferences.",
        "outcome": "Write three non-negotiables and the official source needed to validate each.",
        "competencyIds": [
          "country-fit-1-skill"
        ],
        "lessons": [
          {
            "id": "country-fit-1",
            "title": "Define your non-negotiables",
            "objective": "Separate legal feasibility from lifestyle preferences.",
            "scenario": "You love a destination, but have not checked whether you can legally live and work there.",
            "summary": "A beautiful destination is not yet a feasible option. Build two layers: eligibility gates first, preferences second. Record citizenship, intended activity, length of stay and dependants. Verify the relevant route with the destination government; tourist entry does not automatically permit employment. Mark each gate confirmed, uncertain or blocked, with a source and check date. An uncertain requirement needs research before a deposit or ticket.",
            "durationMinutes": 20,
            "coachNotes": [
              "Create a gate table with residence route, work permission and language needs.",
              "Use immigration authority pages for eligibility; use TGPI Compare to organize trade-offs.",
              "Record uncertainty explicitly rather than assigning it a favourable score."
            ],
            "commonMistake": {
              "avoid": "Book housing while prices are low.",
              "reason": "Feasibility is a gate: a high lifestyle score cannot compensate for an unavailable legal route.",
              "useInstead": "Verify the legal route before financial commitments."
            },
            "dialogue": [
              {
                "speaker": "Learner",
                "line": "You love a destination, but have not checked whether you can legally live and work there."
              },
              {
                "speaker": "TGPI coach",
                "line": "A beautiful destination is not yet a feasible option. Build two layers: eligibility gates first, preferences second. Record citizenship, intended activity, length of stay and dependants. Verify the relevant route with the destination government; tourist entry does not automatically permit employment. Mark each gate confirmed, uncertain or blocked, with a source and check date. An uncertain requirement needs research before a deposit or ticket."
              },
              {
                "speaker": "Learner",
                "line": "What should I produce before moving forward?"
              },
              {
                "speaker": "TGPI coach",
                "line": "Write three non-negotiables and the official source needed to validate each."
              }
            ],
            "keyPhrases": [
              {
                "phrase": "Evidence",
                "meaning": "A traceable basis for the decision.",
                "example": "Create a gate table with residence route, work permission and language needs."
              },
              {
                "phrase": "Constraint",
                "meaning": "A condition that shapes the available options.",
                "example": "Use immigration authority pages for eligibility; use TGPI Compare to organize trade-offs."
              },
              {
                "phrase": "Next action",
                "meaning": "A concrete step you can complete and review.",
                "example": "Record uncertainty explicitly rather than assigning it a favourable score."
              },
              {
                "phrase": "Decision record",
                "meaning": "A written record of assumptions, reasoning and review date.",
                "example": "Write three non-negotiables and the official source needed to validate each."
              }
            ],
            "practiceTask": {
              "title": "Build your practical output",
              "instruction": "Write your response outside TGPI, compare it with the lesson criteria, then complete the checkpoint. Written work is self-reviewed and is not uploaded or graded.",
              "prompt": "Write three non-negotiables and the official source needed to validate each."
            },
            "checkpoint": {
              "prompt": "A destination scores highly for lifestyle but your work permission is unconfirmed. What comes first?",
              "options": [
                {
                  "id": "option-0",
                  "label": "Verify the legal route before financial commitments."
                },
                {
                  "id": "option-1",
                  "label": "Book housing while prices are low."
                },
                {
                  "id": "option-2",
                  "label": "Assume remote work is permitted."
                }
              ],
              "correctOptionId": "option-0",
              "explanation": "Feasibility is a gate: a high lifestyle score cannot compensate for an unavailable legal route."
            }
          }
        ]
      },
      {
        "id": "country-fit-2-module",
        "title": "Build an evidence-based shortlist",
        "description": "Use consistent measures to compare three destinations.",
        "outcome": "Build a three-country table with five criteria, weights and evidence confidence.",
        "competencyIds": [
          "country-fit-2-skill"
        ],
        "lessons": [
          {
            "id": "country-fit-2",
            "title": "Build an evidence-based shortlist",
            "objective": "Use consistent measures to compare three destinations.",
            "scenario": "One city advertises a high salary; another has lower rent. You need a comparison on the same basis.",
            "summary": "Define measurable criteria before looking at rankings. Compare net monthly income against comparable housing, essential spending and savings targets. Keep the household size, location type and time period consistent. Assign preference weights that sum to 100, score each eligible destination from 1 to 5, and compute the sum of weight × score / 5. Keep evidence confidence separate from preference: a precise number from an old or mismatched source is still weak evidence.",
            "durationMinutes": 20,
            "coachNotes": [
              "Choose five criteria and allocate 100 points of importance.",
              "For each value record geography, date, units, household and source.",
              "Keep ranges when a single figure hides variation."
            ],
            "commonMistake": {
              "avoid": "Gross salary in one city versus net salary in another.",
              "reason": "Comparable definitions matter before any weighted score can be useful.",
              "useInstead": "Same household, time period and net-income basis."
            },
            "dialogue": [
              {
                "speaker": "Learner",
                "line": "One city advertises a high salary; another has lower rent. You need a comparison on the same basis."
              },
              {
                "speaker": "TGPI coach",
                "line": "Define measurable criteria before looking at rankings. Compare net monthly income against comparable housing, essential spending and savings targets. Keep the household size, location type and time period consistent. Assign preference weights that sum to 100, score each eligible destination from 1 to 5, and compute the sum of weight × score / 5. Keep evidence confidence separate from preference: a precise number from an old or mismatched source is still weak evidence."
              },
              {
                "speaker": "Learner",
                "line": "What should I produce before moving forward?"
              },
              {
                "speaker": "TGPI coach",
                "line": "Build a three-country table with five criteria, weights and evidence confidence."
              }
            ],
            "keyPhrases": [
              {
                "phrase": "Evidence",
                "meaning": "A traceable basis for the decision.",
                "example": "Choose five criteria and allocate 100 points of importance."
              },
              {
                "phrase": "Constraint",
                "meaning": "A condition that shapes the available options.",
                "example": "For each value record geography, date, units, household and source."
              },
              {
                "phrase": "Next action",
                "meaning": "A concrete step you can complete and review.",
                "example": "Keep ranges when a single figure hides variation."
              },
              {
                "phrase": "Decision record",
                "meaning": "A written record of assumptions, reasoning and review date.",
                "example": "Build a three-country table with five criteria, weights and evidence confidence."
              }
            ],
            "practiceTask": {
              "title": "Build your practical output",
              "instruction": "Write your response outside TGPI, compare it with the lesson criteria, then complete the checkpoint. Written work is self-reviewed and is not uploaded or graded.",
              "prompt": "Build a three-country table with five criteria, weights and evidence confidence."
            },
            "checkpoint": {
              "prompt": "Which comparison is defensible?",
              "options": [
                {
                  "id": "option-0",
                  "label": "Same household, time period and net-income basis."
                },
                {
                  "id": "option-1",
                  "label": "Gross salary in one city versus net salary in another."
                },
                {
                  "id": "option-2",
                  "label": "National rent average versus a central-city studio."
                }
              ],
              "correctOptionId": "option-0",
              "explanation": "Comparable definitions matter before any weighted score can be useful."
            }
          }
        ]
      },
      {
        "id": "country-fit-3-module",
        "title": "Stress-test your decision",
        "description": "Identify what would change your preferred option.",
        "outcome": "Produce a one-page decision memo and add one research action to your TGPI plan.",
        "competencyIds": [
          "country-fit-3-skill"
        ],
        "lessons": [
          {
            "id": "country-fit-3",
            "title": "Stress-test your decision",
            "objective": "Identify what would change your preferred option.",
            "scenario": "Your preferred country wins by a small margin, but rent and job-search time are uncertain.",
            "summary": "A decision is robust when it survives plausible changes. Recalculate using higher rent, delayed income and a less favourable exchange rate. Change your top criterion weight and see whether the winner changes. If small changes reverse the ranking, collect evidence on the variable with the biggest effect. Write a decision memo: preferred option, reasons, unresolved conditions, maximum acceptable downside and a review date. A shortlist is a working hypothesis, not a promise.",
            "durationMinutes": 20,
            "coachNotes": [
              "Test a 20% rent increase as an illustrative stress scenario.",
              "Set a no-go trigger such as an unverified work route or insufficient runway.",
              "Choose a reversible first step before a major commitment."
            ],
            "commonMistake": {
              "avoid": "Hide the sensitivity to maintain confidence.",
              "reason": "A sensitive ranking calls for stronger evidence and conditional action.",
              "useInstead": "Investigate housing evidence and keep the decision conditional."
            },
            "dialogue": [
              {
                "speaker": "Learner",
                "line": "Your preferred country wins by a small margin, but rent and job-search time are uncertain."
              },
              {
                "speaker": "TGPI coach",
                "line": "A decision is robust when it survives plausible changes. Recalculate using higher rent, delayed income and a less favourable exchange rate. Change your top criterion weight and see whether the winner changes. If small changes reverse the ranking, collect evidence on the variable with the biggest effect. Write a decision memo: preferred option, reasons, unresolved conditions, maximum acceptable downside and a review date. A shortlist is a working hypothesis, not a promise."
              },
              {
                "speaker": "Learner",
                "line": "What should I produce before moving forward?"
              },
              {
                "speaker": "TGPI coach",
                "line": "Produce a one-page decision memo and add one research action to your TGPI plan."
              }
            ],
            "keyPhrases": [
              {
                "phrase": "Evidence",
                "meaning": "A traceable basis for the decision.",
                "example": "Test a 20% rent increase as an illustrative stress scenario."
              },
              {
                "phrase": "Constraint",
                "meaning": "A condition that shapes the available options.",
                "example": "Set a no-go trigger such as an unverified work route or insufficient runway."
              },
              {
                "phrase": "Next action",
                "meaning": "A concrete step you can complete and review.",
                "example": "Choose a reversible first step before a major commitment."
              },
              {
                "phrase": "Decision record",
                "meaning": "A written record of assumptions, reasoning and review date.",
                "example": "Produce a one-page decision memo and add one research action to your TGPI plan."
              }
            ],
            "practiceTask": {
              "title": "Build your practical output",
              "instruction": "Write your response outside TGPI, compare it with the lesson criteria, then complete the checkpoint. Written work is self-reviewed and is not uploaded or graded.",
              "prompt": "Produce a one-page decision memo and add one research action to your TGPI plan."
            },
            "checkpoint": {
              "prompt": "A small rent change reverses the ranking. What should you do?",
              "options": [
                {
                  "id": "option-0",
                  "label": "Investigate housing evidence and keep the decision conditional."
                },
                {
                  "id": "option-1",
                  "label": "Hide the sensitivity to maintain confidence."
                },
                {
                  "id": "option-2",
                  "label": "Increase the preferred country score manually."
                }
              ],
              "correctOptionId": "option-0",
              "explanation": "A sensitive ranking calls for stronger evidence and conditional action."
            }
          }
        ]
      }
    ],
    "outcomes": [
      "Separate legal feasibility from lifestyle preferences.",
      "Use consistent measures to compare three destinations.",
      "Identify what would change your preferred option."
    ],
    "completionRequirements": [
      "Complete all three applied lessons.",
      "Pass each formative checkpoint.",
      "Create and self-review the three practical outputs."
    ],
    "competencies": [
      {
        "id": "country-fit-1-skill",
        "title": "Define your non-negotiables",
        "description": "Separate legal feasibility from lifestyle preferences.",
        "canDoStatement": "Separate legal feasibility from lifestyle preferences.",
        "level": "foundation",
        "evidence": [
          "Write three non-negotiables and the official source needed to validate each."
        ]
      },
      {
        "id": "country-fit-2-skill",
        "title": "Build an evidence-based shortlist",
        "description": "Use consistent measures to compare three destinations.",
        "canDoStatement": "Use consistent measures to compare three destinations.",
        "level": "foundation",
        "evidence": [
          "Build a three-country table with five criteria, weights and evidence confidence."
        ]
      },
      {
        "id": "country-fit-3-skill",
        "title": "Stress-test your decision",
        "description": "Identify what would change your preferred option.",
        "canDoStatement": "Identify what would change your preferred option.",
        "level": "foundation",
        "evidence": [
          "Produce a one-page decision memo and add one research action to your TGPI plan."
        ]
      }
    ],
    "assessment": {
      "masteryThreshold": 80,
      "retakePolicy": "Review feedback and retry the formative checkpoint. These short courses do not issue a professional certificate.",
      "components": [
        {
          "id": "formative-checkpoints",
          "title": "Applied checkpoints",
          "description": "Three formative decisions with immediate feedback; no professional certification.",
          "count": 3,
          "status": "live",
          "weight": 100
        }
      ],
      "rubric": [
        {
          "id": "evidence",
          "title": "Evidence and application",
          "description": "Self-review your practical output against the lesson guidance.",
          "weight": 100
        }
      ]
    },
    "credential": {
      "title": "Applied learning record",
      "type": "Professional Certificate",
      "issuer": "TGPI — The Global Polymath Institute",
      "status": "planned",
      "verification": "Progress is recorded in your account. This short course does not issue a professional certificate.",
      "evidenceRequired": [],
      "includes": [
        "Lesson progress",
        "Completed checkpoints",
        "Course version",
        "Practical output guidance"
      ],
      "frameworkTargets": []
    },
    "learningStandard": {
      "version": "1.0",
      "title": "TGPI Applied Learning",
      "description": "Orient, learn, rehearse, prove understanding and reflect on application.",
      "frameworkAlignments": [],
      "phases": [
        {
          "id": "orient",
          "title": "Orient",
          "description": "Understand the situation and its constraints."
        },
        {
          "id": "learn",
          "title": "Learn",
          "description": "Study the worked example and decision rules."
        },
        {
          "id": "rehearse",
          "title": "Rehearse",
          "description": "Create the practical output."
        },
        {
          "id": "prove",
          "title": "Prove",
          "description": "Pass the formative decision checkpoint."
        },
        {
          "id": "reflect",
          "title": "Reflect",
          "description": "Review your assumptions and choose a next action."
        }
      ]
    }
  },
  {
    "id": "relocation-budget",
    "version": "1.0.0",
    "title": "Move Abroad: Build Your Financial Runway",
    "description": "Build a relocation budget, test your runway and create a practical financial go/no-go plan.",
    "category": "Economics & Opportunity",
    "level": "Practical Foundation",
    "audience": "People preparing a realistic international life or career plan.",
    "estimatedMinutes": 60,
    "modules": [
      {
        "id": "relocation-budget-1-module",
        "title": "Calculate the real cost of arrival",
        "description": "Separate one-time cash needs from recurring living costs.",
        "outcome": "Create an arrival-cost ledger with at least eight relevant items and sources.",
        "competencyIds": [
          "relocation-budget-1-skill"
        ],
        "lessons": [
          {
            "id": "relocation-budget-1",
            "title": "Calculate the real cost of arrival",
            "objective": "Separate one-time cash needs from recurring living costs.",
            "scenario": "You saved three months of rent, but a deposit, temporary housing and document costs arrive before your first salary.",
            "summary": "Build three buckets: arrival costs, recurring essentials and a separate contingency reserve. Arrival costs can include travel, official application fees, temporary accommodation, deposits, initial insurance and setup. A refundable deposit is still cash unavailable for daily spending. Use written quotes and official fee schedules, date each estimate and track the currency. Do not add a deposit again to recurring rent; distinguish total cash required from costs that may later be recovered.",
            "durationMinutes": 20,
            "coachNotes": [
              "List each cost with amount, currency, timing and evidence.",
              "Separate refundable deposits from non-refundable expenses.",
              "Use a range for costs without a reliable quote."
            ],
            "commonMistake": {
              "avoid": "As spendable emergency cash.",
              "reason": "Refundability does not make the deposit liquid during your relocation.",
              "useInstead": "As locked cash needed at arrival."
            },
            "dialogue": [
              {
                "speaker": "Learner",
                "line": "You saved three months of rent, but a deposit, temporary housing and document costs arrive before your first salary."
              },
              {
                "speaker": "TGPI coach",
                "line": "Build three buckets: arrival costs, recurring essentials and a separate contingency reserve. Arrival costs can include travel, official application fees, temporary accommodation, deposits, initial insurance and setup. A refundable deposit is still cash unavailable for daily spending. Use written quotes and official fee schedules, date each estimate and track the currency. Do not add a deposit again to recurring rent; distinguish total cash required from costs that may later be recovered."
              },
              {
                "speaker": "Learner",
                "line": "What should I produce before moving forward?"
              },
              {
                "speaker": "TGPI coach",
                "line": "Create an arrival-cost ledger with at least eight relevant items and sources."
              }
            ],
            "keyPhrases": [
              {
                "phrase": "Evidence",
                "meaning": "A traceable basis for the decision.",
                "example": "List each cost with amount, currency, timing and evidence."
              },
              {
                "phrase": "Constraint",
                "meaning": "A condition that shapes the available options.",
                "example": "Separate refundable deposits from non-refundable expenses."
              },
              {
                "phrase": "Next action",
                "meaning": "A concrete step you can complete and review.",
                "example": "Use a range for costs without a reliable quote."
              },
              {
                "phrase": "Decision record",
                "meaning": "A written record of assumptions, reasoning and review date.",
                "example": "Create an arrival-cost ledger with at least eight relevant items and sources."
              }
            ],
            "practiceTask": {
              "title": "Build your practical output",
              "instruction": "Write your response outside TGPI, compare it with the lesson criteria, then complete the checkpoint. Written work is self-reviewed and is not uploaded or graded.",
              "prompt": "Create an arrival-cost ledger with at least eight relevant items and sources."
            },
            "checkpoint": {
              "prompt": "How should a refundable housing deposit be treated?",
              "options": [
                {
                  "id": "option-0",
                  "label": "As locked cash needed at arrival."
                },
                {
                  "id": "option-1",
                  "label": "As spendable emergency cash."
                },
                {
                  "id": "option-2",
                  "label": "As a recurring monthly expense."
                }
              ],
              "correctOptionId": "option-0",
              "explanation": "Refundability does not make the deposit liquid during your relocation."
            }
          }
        ]
      },
      {
        "id": "relocation-budget-2-module",
        "title": "Measure your runway",
        "description": "Calculate how long liquid funds cover a monthly shortfall.",
        "outcome": "Calculate your base and no-income runway in a single currency.",
        "competencyIds": [
          "relocation-budget-2-skill"
        ],
        "lessons": [
          {
            "id": "relocation-budget-2",
            "title": "Measure your runway",
            "objective": "Calculate how long liquid funds cover a monthly shortfall.",
            "scenario": "You have 12000 units of liquid funds, 3000 of arrival costs and want to preserve a 3000 emergency reserve. Monthly essentials are 2000.",
            "summary": "Available runway funds equal liquid savings minus arrival costs minus protected reserves. In this example: 12000 - 3000 - 3000 = 6000. With no income and 2000 monthly essentials, the runway is 3 months. If reliable net income covers part of spending, divide available funds by the positive monthly shortfall instead. If income covers all essentials, there is no current monthly drawdown; still test delayed income, taxes and irregular expenses. Keep all amounts in one currency and document the exchange-rate assumption.",
            "durationMinutes": 20,
            "coachNotes": [
              "Count only liquid funds you can actually access.",
              "Use net income and avoid counting an unsigned job offer as guaranteed cash.",
              "Calculate a no-income scenario as well as your base case."
            ],
            "commonMistake": {
              "avoid": "6 months.",
              "reason": "Only 6000 remains after arrival costs and the protected reserve; 6000 / 2000 = 3.",
              "useInstead": "3 months."
            },
            "dialogue": [
              {
                "speaker": "Learner",
                "line": "You have 12000 units of liquid funds, 3000 of arrival costs and want to preserve a 3000 emergency reserve. Monthly essentials are 2000."
              },
              {
                "speaker": "TGPI coach",
                "line": "Available runway funds equal liquid savings minus arrival costs minus protected reserves. In this example: 12000 - 3000 - 3000 = 6000. With no income and 2000 monthly essentials, the runway is 3 months. If reliable net income covers part of spending, divide available funds by the positive monthly shortfall instead. If income covers all essentials, there is no current monthly drawdown; still test delayed income, taxes and irregular expenses. Keep all amounts in one currency and document the exchange-rate assumption."
              },
              {
                "speaker": "Learner",
                "line": "What should I produce before moving forward?"
              },
              {
                "speaker": "TGPI coach",
                "line": "Calculate your base and no-income runway in a single currency."
              }
            ],
            "keyPhrases": [
              {
                "phrase": "Evidence",
                "meaning": "A traceable basis for the decision.",
                "example": "Count only liquid funds you can actually access."
              },
              {
                "phrase": "Constraint",
                "meaning": "A condition that shapes the available options.",
                "example": "Use net income and avoid counting an unsigned job offer as guaranteed cash."
              },
              {
                "phrase": "Next action",
                "meaning": "A concrete step you can complete and review.",
                "example": "Calculate a no-income scenario as well as your base case."
              },
              {
                "phrase": "Decision record",
                "meaning": "A written record of assumptions, reasoning and review date.",
                "example": "Calculate your base and no-income runway in a single currency."
              }
            ],
            "practiceTask": {
              "title": "Build your practical output",
              "instruction": "Write your response outside TGPI, compare it with the lesson criteria, then complete the checkpoint. Written work is self-reviewed and is not uploaded or graded.",
              "prompt": "Calculate your base and no-income runway in a single currency."
            },
            "checkpoint": {
              "prompt": "What is the no-income runway in the example?",
              "options": [
                {
                  "id": "option-0",
                  "label": "3 months."
                },
                {
                  "id": "option-1",
                  "label": "6 months."
                },
                {
                  "id": "option-2",
                  "label": "4.5 months."
                }
              ],
              "correctOptionId": "option-0",
              "explanation": "Only 6000 remains after arrival costs and the protected reserve; 6000 / 2000 = 3."
            }
          }
        ]
      },
      {
        "id": "relocation-budget-3-module",
        "title": "Create a financial go/no-go plan",
        "description": "Set thresholds and safeguards before paying non-refundable costs.",
        "outcome": "Write your funding target, protected reserve, pause trigger and next budget review date.",
        "competencyIds": [
          "relocation-budget-3-skill"
        ],
        "lessons": [
          {
            "id": "relocation-budget-3",
            "title": "Create a financial go/no-go plan",
            "objective": "Set thresholds and safeguards before paying non-refundable costs.",
            "scenario": "Your budget works only if you find work immediately and the exchange rate stays unchanged.",
            "summary": "Build base, downside and recovery scenarios. In the downside case, delay income by two months and increase essential expenses by 15% as illustrative assumptions, not forecasts. Record what you would cut, when you would pause commitments and what return or alternative plan remains affordable. Compare transfer costs using the total recipient amount, including fees and exchange-rate spread. Financial planning lessons are general education; local tax, banking and immigration questions require the relevant official guidance or a qualified adviser.",
            "durationMinutes": 20,
            "coachNotes": [
              "Keep a protected reserve separate from the spending account.",
              "Verify transfer fees and recipient amounts before moving money.",
              "Review the budget before each non-refundable commitment."
            ],
            "commonMistake": {
              "avoid": "Spend the reserve to maintain the original schedule.",
              "reason": "Resilience comes from explicit downside funding and decisions made before pressure arrives.",
              "useInstead": "Defined reserve, delayed-income test and written pause triggers."
            },
            "dialogue": [
              {
                "speaker": "Learner",
                "line": "Your budget works only if you find work immediately and the exchange rate stays unchanged."
              },
              {
                "speaker": "TGPI coach",
                "line": "Build base, downside and recovery scenarios. In the downside case, delay income by two months and increase essential expenses by 15% as illustrative assumptions, not forecasts. Record what you would cut, when you would pause commitments and what return or alternative plan remains affordable. Compare transfer costs using the total recipient amount, including fees and exchange-rate spread. Financial planning lessons are general education; local tax, banking and immigration questions require the relevant official guidance or a qualified adviser."
              },
              {
                "speaker": "Learner",
                "line": "What should I produce before moving forward?"
              },
              {
                "speaker": "TGPI coach",
                "line": "Write your funding target, protected reserve, pause trigger and next budget review date."
              }
            ],
            "keyPhrases": [
              {
                "phrase": "Evidence",
                "meaning": "A traceable basis for the decision.",
                "example": "Keep a protected reserve separate from the spending account."
              },
              {
                "phrase": "Constraint",
                "meaning": "A condition that shapes the available options.",
                "example": "Verify transfer fees and recipient amounts before moving money."
              },
              {
                "phrase": "Next action",
                "meaning": "A concrete step you can complete and review.",
                "example": "Review the budget before each non-refundable commitment."
              },
              {
                "phrase": "Decision record",
                "meaning": "A written record of assumptions, reasoning and review date.",
                "example": "Write your funding target, protected reserve, pause trigger and next budget review date."
              }
            ],
            "practiceTask": {
              "title": "Build your practical output",
              "instruction": "Write your response outside TGPI, compare it with the lesson criteria, then complete the checkpoint. Written work is self-reviewed and is not uploaded or graded.",
              "prompt": "Write your funding target, protected reserve, pause trigger and next budget review date."
            },
            "checkpoint": {
              "prompt": "Which plan is more resilient?",
              "options": [
                {
                  "id": "option-0",
                  "label": "Defined reserve, delayed-income test and written pause triggers."
                },
                {
                  "id": "option-1",
                  "label": "Spend the reserve to maintain the original schedule."
                },
                {
                  "id": "option-2",
                  "label": "Ignore transfer spreads because the fee is zero."
                }
              ],
              "correctOptionId": "option-0",
              "explanation": "Resilience comes from explicit downside funding and decisions made before pressure arrives."
            }
          }
        ]
      }
    ],
    "outcomes": [
      "Separate one-time cash needs from recurring living costs.",
      "Calculate how long liquid funds cover a monthly shortfall.",
      "Set thresholds and safeguards before paying non-refundable costs."
    ],
    "completionRequirements": [
      "Complete all three applied lessons.",
      "Pass each formative checkpoint.",
      "Create and self-review the three practical outputs."
    ],
    "competencies": [
      {
        "id": "relocation-budget-1-skill",
        "title": "Calculate the real cost of arrival",
        "description": "Separate one-time cash needs from recurring living costs.",
        "canDoStatement": "Separate one-time cash needs from recurring living costs.",
        "level": "foundation",
        "evidence": [
          "Create an arrival-cost ledger with at least eight relevant items and sources."
        ]
      },
      {
        "id": "relocation-budget-2-skill",
        "title": "Measure your runway",
        "description": "Calculate how long liquid funds cover a monthly shortfall.",
        "canDoStatement": "Calculate how long liquid funds cover a monthly shortfall.",
        "level": "foundation",
        "evidence": [
          "Calculate your base and no-income runway in a single currency."
        ]
      },
      {
        "id": "relocation-budget-3-skill",
        "title": "Create a financial go/no-go plan",
        "description": "Set thresholds and safeguards before paying non-refundable costs.",
        "canDoStatement": "Set thresholds and safeguards before paying non-refundable costs.",
        "level": "foundation",
        "evidence": [
          "Write your funding target, protected reserve, pause trigger and next budget review date."
        ]
      }
    ],
    "assessment": {
      "masteryThreshold": 80,
      "retakePolicy": "Review feedback and retry the formative checkpoint. These short courses do not issue a professional certificate.",
      "components": [
        {
          "id": "formative-checkpoints",
          "title": "Applied checkpoints",
          "description": "Three formative decisions with immediate feedback; no professional certification.",
          "count": 3,
          "status": "live",
          "weight": 100
        }
      ],
      "rubric": [
        {
          "id": "evidence",
          "title": "Evidence and application",
          "description": "Self-review your practical output against the lesson guidance.",
          "weight": 100
        }
      ]
    },
    "credential": {
      "title": "Applied learning record",
      "type": "Professional Certificate",
      "issuer": "TGPI — The Global Polymath Institute",
      "status": "planned",
      "verification": "Progress is recorded in your account. This short course does not issue a professional certificate.",
      "evidenceRequired": [],
      "includes": [
        "Lesson progress",
        "Completed checkpoints",
        "Course version",
        "Practical output guidance"
      ],
      "frameworkTargets": []
    },
    "learningStandard": {
      "version": "1.0",
      "title": "TGPI Applied Learning",
      "description": "Orient, learn, rehearse, prove understanding and reflect on application.",
      "frameworkAlignments": [],
      "phases": [
        {
          "id": "orient",
          "title": "Orient",
          "description": "Understand the situation and its constraints."
        },
        {
          "id": "learn",
          "title": "Learn",
          "description": "Study the worked example and decision rules."
        },
        {
          "id": "rehearse",
          "title": "Rehearse",
          "description": "Create the practical output."
        },
        {
          "id": "prove",
          "title": "Prove",
          "description": "Pass the formative decision checkpoint."
        },
        {
          "id": "reflect",
          "title": "Reflect",
          "description": "Review your assumptions and choose a next action."
        }
      ]
    }
  },
  {
    "id": "international-career",
    "version": "1.0.0",
    "title": "International Career: Prove Your Value",
    "description": "Turn experience into credible evidence, targeted applications and clear international interview answers.",
    "category": "Technology & Adaptability",
    "level": "Practical Foundation",
    "audience": "People preparing a realistic international life or career plan.",
    "estimatedMinutes": 60,
    "modules": [
      {
        "id": "international-career-1-module",
        "title": "Map a realistic target role",
        "description": "Compare role requirements with evidence you can show.",
        "outcome": "Create a five-employer role matrix and select one proof-building task.",
        "competencyIds": [
          "international-career-1-skill"
        ],
        "lessons": [
          {
            "id": "international-career-1",
            "title": "Map a realistic target role",
            "objective": "Compare role requirements with evidence you can show.",
            "scenario": "You want an international role, but are sending the same CV to unrelated positions.",
            "summary": "Choose one role family, seniority and market. Review five recent job descriptions from employer career pages. Extract repeated skills, communication expectations, location constraints and work-authorisation requirements. Build an evidence matrix: requirement, your example, proof and gap. A repeated requirement without proof becomes a learning task, not an invented claim. Verify whether remote means globally remote or restricted to specific countries; remote work does not remove immigration or employment constraints.",
            "durationMinutes": 20,
            "coachNotes": [
              "Identify repeated requirements rather than collecting every buzzword.",
              "Keep work-authorisation requirements as a separate eligibility gate.",
              "Choose one gap that can be closed with a practical project."
            ],
            "commonMistake": {
              "avoid": "List it as advanced to pass screening.",
              "reason": "Credible targeting distinguishes existing evidence from skills you still need to build.",
              "useInstead": "Mark the gap and build a relevant proof project."
            },
            "dialogue": [
              {
                "speaker": "Learner",
                "line": "You want an international role, but are sending the same CV to unrelated positions."
              },
              {
                "speaker": "TGPI coach",
                "line": "Choose one role family, seniority and market. Review five recent job descriptions from employer career pages. Extract repeated skills, communication expectations, location constraints and work-authorisation requirements. Build an evidence matrix: requirement, your example, proof and gap. A repeated requirement without proof becomes a learning task, not an invented claim. Verify whether remote means globally remote or restricted to specific countries; remote work does not remove immigration or employment constraints."
              },
              {
                "speaker": "Learner",
                "line": "What should I produce before moving forward?"
              },
              {
                "speaker": "TGPI coach",
                "line": "Create a five-employer role matrix and select one proof-building task."
              }
            ],
            "keyPhrases": [
              {
                "phrase": "Evidence",
                "meaning": "A traceable basis for the decision.",
                "example": "Identify repeated requirements rather than collecting every buzzword."
              },
              {
                "phrase": "Constraint",
                "meaning": "A condition that shapes the available options.",
                "example": "Keep work-authorisation requirements as a separate eligibility gate."
              },
              {
                "phrase": "Next action",
                "meaning": "A concrete step you can complete and review.",
                "example": "Choose one gap that can be closed with a practical project."
              },
              {
                "phrase": "Decision record",
                "meaning": "A written record of assumptions, reasoning and review date.",
                "example": "Create a five-employer role matrix and select one proof-building task."
              }
            ],
            "practiceTask": {
              "title": "Build your practical output",
              "instruction": "Write your response outside TGPI, compare it with the lesson criteria, then complete the checkpoint. Written work is self-reviewed and is not uploaded or graded.",
              "prompt": "Create a five-employer role matrix and select one proof-building task."
            },
            "checkpoint": {
              "prompt": "What should you do with a required skill you cannot yet demonstrate?",
              "options": [
                {
                  "id": "option-0",
                  "label": "Mark the gap and build a relevant proof project."
                },
                {
                  "id": "option-1",
                  "label": "List it as advanced to pass screening."
                },
                {
                  "id": "option-2",
                  "label": "Apply to all roles without changing the CV."
                }
              ],
              "correctOptionId": "option-0",
              "explanation": "Credible targeting distinguishes existing evidence from skills you still need to build."
            }
          }
        ]
      },
      {
        "id": "international-career-2-module",
        "title": "Build proof that travels",
        "description": "Write outcome-led experience without exaggeration.",
        "outcome": "Rewrite three CV bullets and create one shareable, privacy-safe proof artefact.",
        "competencyIds": [
          "international-career-2-skill"
        ],
        "lessons": [
          {
            "id": "international-career-2",
            "title": "Build proof that travels",
            "objective": "Write outcome-led experience without exaggeration.",
            "scenario": "Your CV says hardworking and responsible, but a recruiter cannot see what changed because of your work.",
            "summary": "Use an action-context-result structure. Explain what you did, the scope and the observable outcome. For example: redesigned an appointment reminder flow for a small clinic; reduced missed visits from 20 to 14 in a comparable month. That is a 30% relative reduction, not 6%. State the sample and limits, and do not imply causation you cannot establish. If no metric exists, show an artefact, a workflow or documented feedback. Protect client and employer information; anonymise sensitive details and ask permission before publishing.",
            "durationMinutes": 20,
            "coachNotes": [
              "Replace unsupported adjectives with a specific example.",
              "Show the baseline and period for every numeric claim.",
              "Create an anonymised portfolio page with context and limitations."
            ],
            "commonMistake": {
              "avoid": "6%, because the difference is six.",
              "reason": "The relative reduction is (20 - 14) / 20 = 30%; the absolute change is six visits.",
              "useInstead": "30%, with the period and sample stated."
            },
            "dialogue": [
              {
                "speaker": "Learner",
                "line": "Your CV says hardworking and responsible, but a recruiter cannot see what changed because of your work."
              },
              {
                "speaker": "TGPI coach",
                "line": "Use an action-context-result structure. Explain what you did, the scope and the observable outcome. For example: redesigned an appointment reminder flow for a small clinic; reduced missed visits from 20 to 14 in a comparable month. That is a 30% relative reduction, not 6%. State the sample and limits, and do not imply causation you cannot establish. If no metric exists, show an artefact, a workflow or documented feedback. Protect client and employer information; anonymise sensitive details and ask permission before publishing."
              },
              {
                "speaker": "Learner",
                "line": "What should I produce before moving forward?"
              },
              {
                "speaker": "TGPI coach",
                "line": "Rewrite three CV bullets and create one shareable, privacy-safe proof artefact."
              }
            ],
            "keyPhrases": [
              {
                "phrase": "Evidence",
                "meaning": "A traceable basis for the decision.",
                "example": "Replace unsupported adjectives with a specific example."
              },
              {
                "phrase": "Constraint",
                "meaning": "A condition that shapes the available options.",
                "example": "Show the baseline and period for every numeric claim."
              },
              {
                "phrase": "Next action",
                "meaning": "A concrete step you can complete and review.",
                "example": "Create an anonymised portfolio page with context and limitations."
              },
              {
                "phrase": "Decision record",
                "meaning": "A written record of assumptions, reasoning and review date.",
                "example": "Rewrite three CV bullets and create one shareable, privacy-safe proof artefact."
              }
            ],
            "practiceTask": {
              "title": "Build your practical output",
              "instruction": "Write your response outside TGPI, compare it with the lesson criteria, then complete the checkpoint. Written work is self-reviewed and is not uploaded or graded.",
              "prompt": "Rewrite three CV bullets and create one shareable, privacy-safe proof artefact."
            },
            "checkpoint": {
              "prompt": "Missed visits change from 20 to 14. What is the relative reduction?",
              "options": [
                {
                  "id": "option-0",
                  "label": "30%, with the period and sample stated."
                },
                {
                  "id": "option-1",
                  "label": "6%, because the difference is six."
                },
                {
                  "id": "option-2",
                  "label": "70%, because fourteen remain."
                }
              ],
              "correctOptionId": "option-0",
              "explanation": "The relative reduction is (20 - 14) / 20 = 30%; the absolute change is six visits."
            }
          }
        ]
      },
      {
        "id": "international-career-3-module",
        "title": "Interview with clarity and follow through",
        "description": "Give a concise evidence-based answer and evaluate mutual fit.",
        "outcome": "Record a 90-second answer and build a tracker with employer, role, evidence, status and next action.",
        "competencyIds": [
          "international-career-3-skill"
        ],
        "lessons": [
          {
            "id": "international-career-3",
            "title": "Interview with clarity and follow through",
            "objective": "Give a concise evidence-based answer and evaluate mutual fit.",
            "scenario": "An interviewer asks about a difficult situation. You describe the team for several minutes without explaining your own contribution.",
            "summary": "Structure a 90-second answer: situation, responsibility, action, result and learning. Use I for your contribution and we for the collective outcome. Explain one trade-off rather than listing every task. When you do not know an answer, identify what you would verify and how. Ask about success measures, working hours, location restrictions and the next step. After the interview, send a concise follow-up connecting one relevant example to the role. Never pay an unsolicited recruiter or share financial credentials; validate the employer through its official channels.",
            "durationMinutes": 20,
            "coachNotes": [
              "Rehearse one answer aloud with a timer.",
              "Ask what success in the first 90 days looks like.",
              "Record feedback and the next follow-up date in an application tracker."
            ],
            "commonMistake": {
              "avoid": "Claim sole credit for every team outcome.",
              "reason": "Clear contribution plus honest limits makes evidence easier to trust.",
              "useInstead": "A specific contribution, measured outcome and honest limitation."
            },
            "dialogue": [
              {
                "speaker": "Learner",
                "line": "An interviewer asks about a difficult situation. You describe the team for several minutes without explaining your own contribution."
              },
              {
                "speaker": "TGPI coach",
                "line": "Structure a 90-second answer: situation, responsibility, action, result and learning. Use I for your contribution and we for the collective outcome. Explain one trade-off rather than listing every task. When you do not know an answer, identify what you would verify and how. Ask about success measures, working hours, location restrictions and the next step. After the interview, send a concise follow-up connecting one relevant example to the role. Never pay an unsolicited recruiter or share financial credentials; validate the employer through its official channels."
              },
              {
                "speaker": "Learner",
                "line": "What should I produce before moving forward?"
              },
              {
                "speaker": "TGPI coach",
                "line": "Record a 90-second answer and build a tracker with employer, role, evidence, status and next action."
              }
            ],
            "keyPhrases": [
              {
                "phrase": "Evidence",
                "meaning": "A traceable basis for the decision.",
                "example": "Rehearse one answer aloud with a timer."
              },
              {
                "phrase": "Constraint",
                "meaning": "A condition that shapes the available options.",
                "example": "Ask what success in the first 90 days looks like."
              },
              {
                "phrase": "Next action",
                "meaning": "A concrete step you can complete and review.",
                "example": "Record feedback and the next follow-up date in an application tracker."
              },
              {
                "phrase": "Decision record",
                "meaning": "A written record of assumptions, reasoning and review date.",
                "example": "Record a 90-second answer and build a tracker with employer, role, evidence, status and next action."
              }
            ],
            "practiceTask": {
              "title": "Build your practical output",
              "instruction": "Write your response outside TGPI, compare it with the lesson criteria, then complete the checkpoint. Written work is self-reviewed and is not uploaded or graded.",
              "prompt": "Record a 90-second answer and build a tracker with employer, role, evidence, status and next action."
            },
            "checkpoint": {
              "prompt": "Which answer best demonstrates professional judgment?",
              "options": [
                {
                  "id": "option-0",
                  "label": "A specific contribution, measured outcome and honest limitation."
                },
                {
                  "id": "option-1",
                  "label": "Claim sole credit for every team outcome."
                },
                {
                  "id": "option-2",
                  "label": "Avoid questions about expectations and location."
                }
              ],
              "correctOptionId": "option-0",
              "explanation": "Clear contribution plus honest limits makes evidence easier to trust."
            }
          }
        ]
      }
    ],
    "outcomes": [
      "Compare role requirements with evidence you can show.",
      "Write outcome-led experience without exaggeration.",
      "Give a concise evidence-based answer and evaluate mutual fit."
    ],
    "completionRequirements": [
      "Complete all three applied lessons.",
      "Pass each formative checkpoint.",
      "Create and self-review the three practical outputs."
    ],
    "competencies": [
      {
        "id": "international-career-1-skill",
        "title": "Map a realistic target role",
        "description": "Compare role requirements with evidence you can show.",
        "canDoStatement": "Compare role requirements with evidence you can show.",
        "level": "foundation",
        "evidence": [
          "Create a five-employer role matrix and select one proof-building task."
        ]
      },
      {
        "id": "international-career-2-skill",
        "title": "Build proof that travels",
        "description": "Write outcome-led experience without exaggeration.",
        "canDoStatement": "Write outcome-led experience without exaggeration.",
        "level": "foundation",
        "evidence": [
          "Rewrite three CV bullets and create one shareable, privacy-safe proof artefact."
        ]
      },
      {
        "id": "international-career-3-skill",
        "title": "Interview with clarity and follow through",
        "description": "Give a concise evidence-based answer and evaluate mutual fit.",
        "canDoStatement": "Give a concise evidence-based answer and evaluate mutual fit.",
        "level": "foundation",
        "evidence": [
          "Record a 90-second answer and build a tracker with employer, role, evidence, status and next action."
        ]
      }
    ],
    "assessment": {
      "masteryThreshold": 80,
      "retakePolicy": "Review feedback and retry the formative checkpoint. These short courses do not issue a professional certificate.",
      "components": [
        {
          "id": "formative-checkpoints",
          "title": "Applied checkpoints",
          "description": "Three formative decisions with immediate feedback; no professional certification.",
          "count": 3,
          "status": "live",
          "weight": 100
        }
      ],
      "rubric": [
        {
          "id": "evidence",
          "title": "Evidence and application",
          "description": "Self-review your practical output against the lesson guidance.",
          "weight": 100
        }
      ]
    },
    "credential": {
      "title": "Applied learning record",
      "type": "Professional Certificate",
      "issuer": "TGPI — The Global Polymath Institute",
      "status": "planned",
      "verification": "Progress is recorded in your account. This short course does not issue a professional certificate.",
      "evidenceRequired": [],
      "includes": [
        "Lesson progress",
        "Completed checkpoints",
        "Course version",
        "Practical output guidance"
      ],
      "frameworkTargets": []
    },
    "learningStandard": {
      "version": "1.0",
      "title": "TGPI Applied Learning",
      "description": "Orient, learn, rehearse, prove understanding and reflect on application.",
      "frameworkAlignments": [],
      "phases": [
        {
          "id": "orient",
          "title": "Orient",
          "description": "Understand the situation and its constraints."
        },
        {
          "id": "learn",
          "title": "Learn",
          "description": "Study the worked example and decision rules."
        },
        {
          "id": "rehearse",
          "title": "Rehearse",
          "description": "Create the practical output."
        },
        {
          "id": "prove",
          "title": "Prove",
          "description": "Pass the formative decision checkpoint."
        },
        {
          "id": "reflect",
          "title": "Reflect",
          "description": "Review your assumptions and choose a next action."
        }
      ]
    }
  }
] satisfies Course[]).map(assertCourseLearningReady);
