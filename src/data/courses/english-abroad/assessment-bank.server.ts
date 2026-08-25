import "server-only";

import type {
  LearningAssessment,
  LearningAssessmentQuestion,
} from "@/types/learning";

type ScoredLearningAssessmentQuestion = LearningAssessmentQuestion & {
  correctOptionId: string;
  explanation: string;
};

export type ScoredLearningAssessment = Omit<
  LearningAssessment,
  "questions"
> & {
  questions: ScoredLearningAssessmentQuestion[];
};

const bank: ScoredLearningAssessment[] = [
  {
    id: "arrival-gate",
    kind: "module_gate",
    moduleId: "arrival",
    title: "Arrival & First Contact Gate",
    description:
      "Demonstrate clear introductions, border responses and communication recovery under arrival pressure.",
    durationMinutes: 8,
    masteryThreshold: 75,
    questions: [
      {
        id: "arrival-purpose",
        competencyId: "first-contact-communication",
        prompt:
          "A border officer asks why you are entering the country. Which response is clearest and complete?",
        options: [
          { id: "a", label: "I am here for things and maybe work later." },
          { id: "b", label: "I am here for a three-month English course. My return flight is on 18 October." },
          { id: "c", label: "My friend arranged everything, so you should ask them." },
        ],
        correctOptionId: "b",
        explanation:
          "A precise purpose and relevant timing answer the officer's decision without adding uncertainty.",
      },
      {
        id: "arrival-repair",
        competencyId: "first-contact-communication",
        prompt:
          "You do not understand an important question at passport control. What is the strongest recovery?",
        options: [
          { id: "a", label: "Yes, yes. Everything is okay." },
          { id: "b", label: "I do not speak English." },
          { id: "c", label: "Could you repeat that more slowly, please? Do you mean where I will stay?" },
        ],
        correctOptionId: "c",
        explanation:
          "The response requests controlled repetition and checks the likely meaning before answering.",
      },
      {
        id: "arrival-introduction",
        competencyId: "first-contact-communication",
        prompt:
          "At orientation, a classmate asks about you. Which introduction creates the best next conversation?",
        options: [
          { id: "a", label: "I am Alex. I am from Brazil." },
          { id: "b", label: "I am Alex, originally from Brazil. I am here to study design. What brings you here?" },
          { id: "c", label: "My complete professional history is very long." },
        ],
        correctOptionId: "b",
        explanation:
          "It combines identity, current purpose and a natural follow-up question in a concise structure.",
      },
      {
        id: "arrival-transport",
        competencyId: "first-contact-communication",
        prompt:
          "An airport employee gives fast directions. Which response protects you from taking the wrong route?",
        options: [
          { id: "a", label: "Okay, I think I understand." },
          { id: "b", label: "So I take the blue line, change at Central, then use exit four. Is that correct?" },
          { id: "c", label: "Can you just take me there?" },
        ],
        correctOptionId: "b",
        explanation:
          "Repeating the route in sequence turns passive recognition into an actionable confirmation.",
      },
    ],
  },
  {
    id: "housing-gate",
    kind: "module_gate",
    moduleId: "housing",
    title: "Housing Navigation Gate",
    description:
      "Protect money, information and responsibilities during accommodation decisions.",
    durationMinutes: 8,
    masteryThreshold: 75,
    questions: [
      {
        id: "housing-screen",
        competencyId: "housing-navigation",
        prompt:
          "Before sending personal documents for an online listing, what should you establish first?",
        options: [
          { id: "a", label: "Availability, total cost, viewing process and the landlord or agent's verifiable identity." },
          { id: "b", label: "Whether the furniture matches your preferred color." },
          { id: "c", label: "Whether you can transfer the deposit immediately." },
        ],
        correctOptionId: "a",
        explanation:
          "Verification and complete cost information reduce fraud and decision risk before sensitive data is shared.",
      },
      {
        id: "housing-cost",
        competencyId: "housing-navigation",
        prompt:
          "The rent is advertised as 900. Which question reveals the real monthly commitment?",
        options: [
          { id: "a", label: "Can the rent become cheaper later?" },
          { id: "b", label: "What is included in the rent, and which bills or fees are paid separately?" },
          { id: "c", label: "Is the neighborhood popular online?" },
        ],
        correctOptionId: "b",
        explanation:
          "Separating included and excluded costs prevents a misleading comparison based on headline rent.",
      },
      {
        id: "housing-responsibility",
        competencyId: "housing-navigation",
        prompt:
          "A contract contains an unclear repair clause. What is the strongest response before signing?",
        options: [
          { id: "a", label: "I am sure it will be fine." },
          { id: "b", label: "Could you confirm in writing who pays for urgent and routine repairs under this clause?" },
          { id: "c", label: "I will sign now and ask after moving in." },
        ],
        correctOptionId: "b",
        explanation:
          "Written clarification creates usable evidence and prevents responsibility from remaining ambiguous.",
      },
      {
        id: "housing-report",
        competencyId: "housing-navigation",
        prompt:
          "A serious leak begins in your apartment. Which message is most actionable?",
        options: [
          { id: "a", label: "There is a problem. Please help." },
          { id: "b", label: "Water is leaking from the kitchen ceiling above the light at 14 King Street. I turned off the electricity. Please confirm the emergency repair time." },
          { id: "c", label: "The apartment is terrible and I am angry." },
        ],
        correctOptionId: "b",
        explanation:
          "Location, immediate risk, action already taken and requested response give the recipient what they need to act.",
      },
    ],
  },
  {
    id: "independence-gate",
    kind: "module_gate",
    moduleId: "daily-independence",
    title: "Everyday Independence Gate",
    description:
      "Navigate transport, transactions and essential healthcare without passive dependence.",
    durationMinutes: 8,
    masteryThreshold: 75,
    questions: [
      {
        id: "independence-route",
        competencyId: "everyday-independence",
        prompt:
          "Your train is cancelled and your appointment begins in 35 minutes. What should you ask first?",
        options: [
          { id: "a", label: "Why does this always happen?" },
          { id: "b", label: "What is the fastest alternative to City Hospital, and where do I change?" },
          { id: "c", label: "Will the train return tomorrow?" },
        ],
        correctOptionId: "b",
        explanation:
          "The question is tied to the actual constraint: destination, time and required transfer.",
      },
      {
        id: "independence-transaction",
        competencyId: "everyday-independence",
        prompt:
          "A shop charges you twice. Which response is firm and verifiable?",
        options: [
          { id: "a", label: "You stole my money." },
          { id: "b", label: "I may be wrong, but forget it." },
          { id: "c", label: "This receipt shows two charges for the same item. Could you check the transaction and reverse the duplicate?" },
        ],
        correctOptionId: "c",
        explanation:
          "The response identifies evidence, the exact error and the requested remedy without unnecessary escalation.",
      },
      {
        id: "independence-health",
        competencyId: "everyday-independence",
        prompt:
          "At a clinic, which sequence communicates essential health information most safely?",
        options: [
          { id: "a", label: "Main symptom, when it began, severity, allergies and current medication." },
          { id: "b", label: "Your full travel history, then your main symptom." },
          { id: "c", label: "Only say that you feel bad and wait for questions." },
        ],
        correctOptionId: "a",
        explanation:
          "The sequence prioritizes information that affects immediate clinical decisions and medication safety.",
      },
      {
        id: "independence-confirmation",
        competencyId: "everyday-independence",
        prompt:
          "A pharmacist explains a dosage quickly. What is the safest confirmation?",
        options: [
          { id: "a", label: "Thank you. I will read it later." },
          { id: "b", label: "Let me confirm: one tablet after food, twice a day, for five days. Is that correct?" },
          { id: "c", label: "I normally take medicine differently." },
        ],
        correctOptionId: "b",
        explanation:
          "Repeating dose, condition, frequency and duration checks the complete instruction before use.",
      },
    ],
  },
  {
    id: "career-gate",
    kind: "module_gate",
    moduleId: "career",
    title: "Professional Communication Gate",
    description:
      "Present evidence, answer competency questions and clarify workplace expectations.",
    durationMinutes: 8,
    masteryThreshold: 75,
    questions: [
      {
        id: "career-introduction",
        competencyId: "professional-communication",
        prompt:
          "Which structure gives a recruiter the clearest 30-second introduction?",
        options: [
          { id: "a", label: "Role and specialization, relevant experience, one result, then current direction." },
          { id: "b", label: "Every job in chronological order." },
          { id: "c", label: "Personal interests followed by salary expectations." },
        ],
        correctOptionId: "a",
        explanation:
          "The structure connects professional identity to evidence and the opportunity being discussed.",
      },
      {
        id: "career-evidence",
        competencyId: "professional-communication",
        prompt:
          "An interviewer asks about a difficult deadline. Which answer demonstrates capability?",
        options: [
          { id: "a", label: "I always work hard and never have problems." },
          { id: "b", label: "Describe the situation, your responsibility, the action you took and the measurable result." },
          { id: "c", label: "Explain why another team caused the delay." },
        ],
        correctOptionId: "b",
        explanation:
          "A structured example makes the claim inspectable and keeps responsibility clear.",
      },
      {
        id: "career-clarify",
        competencyId: "professional-communication",
        prompt:
          "Your manager says a task is urgent but gives no deadline. What is the strongest response?",
        options: [
          { id: "a", label: "I will do it as soon as possible." },
          { id: "b", label: "To prioritize correctly, what time is this needed and which current task should move behind it?" },
          { id: "c", label: "Everything is urgent here." },
        ],
        correctOptionId: "b",
        explanation:
          "The response converts urgency into an explicit deadline and a visible trade-off.",
      },
      {
        id: "career-misunderstanding",
        competencyId: "professional-communication",
        prompt:
          "A colleague interprets your message differently. What protects the working relationship and the task?",
        options: [
          { id: "a", label: "My message was already clear." },
          { id: "b", label: "Let us check the intended outcome. I understood that I would deliver the draft today and you would review it tomorrow." },
          { id: "c", label: "Ignore the difference and continue." },
        ],
        correctOptionId: "b",
        explanation:
          "Restating the shared outcome and responsibilities repairs the operational meaning without assigning blame.",
      },
    ],
  },
  {
    id: "safety-gate",
    kind: "module_gate",
    moduleId: "safety-culture",
    title: "Safety & Cultural Confidence Gate",
    description:
      "Communicate urgency, boundaries and cultural repair when the stakes are high.",
    durationMinutes: 8,
    masteryThreshold: 75,
    questions: [
      {
        id: "safety-emergency",
        competencyId: "safety-cultural-confidence",
        prompt:
          "Which order gives emergency services the most actionable information?",
        options: [
          { id: "a", label: "Your name, travel purpose, then a long description." },
          { id: "b", label: "Service needed, exact location, immediate danger and people affected." },
          { id: "c", label: "How frightened you are, then the location." },
        ],
        correctOptionId: "b",
        explanation:
          "The sequence prioritizes dispatch, location and active risk before secondary detail.",
      },
      {
        id: "safety-boundary",
        competencyId: "safety-cultural-confidence",
        prompt:
          "Someone repeatedly requests a document they do not need. Which boundary is clearest?",
        options: [
          { id: "a", label: "I would prefer not to share that document. Please explain the legal purpose and provide the request in writing." },
          { id: "b", label: "Maybe later." },
          { id: "c", label: "You are definitely trying to scam me." },
        ],
        correctOptionId: "a",
        explanation:
          "The response refuses the request, asks for purpose and creates a written verification path.",
      },
      {
        id: "safety-repair",
        competencyId: "safety-cultural-confidence",
        prompt:
          "A local colleague says your direct comment felt disrespectful. What is the strongest repair?",
        options: [
          { id: "a", label: "That was not my intention, so there is no problem." },
          { id: "b", label: "Thank you for telling me. I intended to be efficient, but I understand the impact. How would you normally express that here?" },
          { id: "c", label: "This is normal in my culture." },
        ],
        correctOptionId: "b",
        explanation:
          "It separates intention from impact, acknowledges the signal and asks for a locally useful alternative.",
      },
      {
        id: "safety-escalation",
        competencyId: "safety-cultural-confidence",
        prompt:
          "A service provider refuses to document an important decision. What should you do next?",
        options: [
          { id: "a", label: "Accept the verbal answer to avoid conflict." },
          { id: "b", label: "Summarize the decision in writing, request confirmation and use the formal escalation channel if needed." },
          { id: "c", label: "Post an accusation online immediately." },
        ],
        correctOptionId: "b",
        explanation:
          "A written record and proportionate escalation protect evidence without creating avoidable risk.",
      },
    ],
  },
  {
    id: "global-action-gate",
    kind: "module_gate",
    moduleId: "global-action",
    title: "Integrated Global Action Gate",
    description:
      "Coordinate calls, relationships and multi-step actions without losing critical details.",
    durationMinutes: 8,
    masteryThreshold: 75,
    questions: [
      {
        id: "action-call",
        competencyId: "integrated-global-action",
        prompt:
          "A first appointment time does not work. Which response keeps the call moving?",
        options: [
          { id: "a", label: "No, that is impossible." },
          { id: "b", label: "That time does not work for me. Do you have anything after three on Wednesday or Thursday morning?" },
          { id: "c", label: "I will call again another day." },
        ],
        correctOptionId: "b",
        explanation:
          "The response rejects one option and immediately supplies two constrained alternatives.",
      },
      {
        id: "action-confirm",
        competencyId: "integrated-global-action",
        prompt:
          "Before ending an important call, what should you confirm?",
        options: [
          { id: "a", label: "Only the time." },
          { id: "b", label: "Date, time, location, required documents and the next responsible person." },
          { id: "c", label: "Whether the receptionist is busy." },
        ],
        correctOptionId: "b",
        explanation:
          "The full confirmation turns a conversation into a reliable next action.",
      },
      {
        id: "action-connection",
        competencyId: "integrated-global-action",
        prompt:
          "Which follow-up best turns a first local conversation into a useful connection?",
        options: [
          { id: "a", label: "We should meet sometime." },
          { id: "b", label: "I enjoyed our conversation about design. Would you like to continue it over coffee next Tuesday after work?" },
          { id: "c", label: "Please add me to every local group." },
        ],
        correctOptionId: "b",
        explanation:
          "It recalls shared context and proposes a specific, low-pressure next step.",
      },
      {
        id: "action-priority",
        competencyId: "integrated-global-action",
        prompt:
          "You have three urgent tasks abroad. Which principle should order them?",
        options: [
          { id: "a", label: "Do the easiest task first." },
          { id: "b", label: "Prioritize safety and fixed deadlines, then tasks that unblock other actions." },
          { id: "c", label: "Wait until someone tells you what to do." },
        ],
        correctOptionId: "b",
        explanation:
          "Safety, immovable deadlines and dependencies create a defensible action sequence.",
      },
    ],
  },
  {
    id: "global-english-capstone",
    kind: "capstone",
    title: "24-Hour Abroad Decision Simulation",
    description:
      "Complete a connected day of arrival, housing, mobility, work and safety decisions, then transfer the learning to your own plan.",
    durationMinutes: 20,
    masteryThreshold: 80,
    reflectionPrompt:
      "Describe one situation from this simulation that is likely to occur in your real international plan, the exact response you would use and the risk that response helps you control.",
    questions: [
      {
        id: "capstone-01",
        competencyId: "first-contact-communication",
        prompt:
          "Your accommodation address is questioned at the border. You have the booking on your phone. What do you do?",
        options: [
          { id: "a", label: "Say that a friend knows the address." },
          { id: "b", label: "State the address clearly, show the booking and confirm the length of stay." },
          { id: "c", label: "Give only the city name." },
        ],
        correctOptionId: "b",
        explanation:
          "The response combines a direct answer with evidence and the relevant duration.",
      },
      {
        id: "capstone-02",
        competencyId: "first-contact-communication",
        prompt:
          "The officer uses a word you do not know. What is the best recovery?",
        options: [
          { id: "a", label: "Guess and answer quickly." },
          { id: "b", label: "Ask them to repeat the complete question louder." },
          { id: "c", label: "Ask for the word to be explained and confirm the meaning before answering." },
        ],
        correctOptionId: "c",
        explanation:
          "Clarifying meaning is safer than increasing volume or guessing in a formal interaction.",
      },
      {
        id: "capstone-03",
        competencyId: "housing-navigation",
        prompt:
          "Your host asks for an unexpected cash fee not listed in the booking. What is the strongest first response?",
        options: [
          { id: "a", label: "Pay now to avoid losing the room." },
          { id: "b", label: "Ask what the fee covers, request it in writing and compare it with the booking terms before paying." },
          { id: "c", label: "Leave without collecting evidence." },
        ],
        correctOptionId: "b",
        explanation:
          "The response pauses payment and creates a verifiable comparison with the original agreement.",
      },
      {
        id: "capstone-04",
        competencyId: "everyday-independence",
        prompt:
          "A transit disruption makes you late for an interview. What is the best combined action?",
        options: [
          { id: "a", label: "Find the fastest verified alternative and notify the recruiter with a realistic arrival time." },
          { id: "b", label: "Keep trying the original route without contacting anyone." },
          { id: "c", label: "Cancel the interview immediately." },
        ],
        correctOptionId: "a",
        explanation:
          "The action solves the route problem while protecting the professional relationship with timely information.",
      },
      {
        id: "capstone-05",
        competencyId: "professional-communication",
        prompt:
          "The interviewer asks why your international experience is relevant. Which response is strongest?",
        options: [
          { id: "a", label: "I like traveling and meeting people." },
          { id: "b", label: "Connect one international situation to an action, measurable result and capability relevant to this role." },
          { id: "c", label: "List every country you have visited." },
        ],
        correctOptionId: "b",
        explanation:
          "Relevance comes from evidence of transferable capability, not exposure alone.",
      },
      {
        id: "capstone-06",
        competencyId: "professional-communication",
        prompt:
          "You receive a job instruction with two possible interpretations. What should you do?",
        options: [
          { id: "a", label: "Choose one silently so you appear independent." },
          { id: "b", label: "State your current interpretation, ask which outcome is intended and confirm the deadline." },
          { id: "c", label: "Wait until the deadline is close." },
        ],
        correctOptionId: "b",
        explanation:
          "Explicit confirmation prevents hidden rework while preserving initiative.",
      },
      {
        id: "capstone-07",
        competencyId: "safety-cultural-confidence",
        prompt:
          "A stranger requests your passport to arrange a service. What is the safest response?",
        options: [
          { id: "a", label: "Hand it over if they seem professional." },
          { id: "b", label: "Refuse, ask for the documented legal requirement and verify the organization independently." },
          { id: "c", label: "Send a full photo instead." },
        ],
        correctOptionId: "b",
        explanation:
          "The response protects identity data and moves verification outside the requester's control.",
      },
      {
        id: "capstone-08",
        competencyId: "safety-cultural-confidence",
        prompt:
          "A local norm surprises you and your reaction causes tension. What is the strongest repair?",
        options: [
          { id: "a", label: "Explain that your own culture is different." },
          { id: "b", label: "Acknowledge the impact, ask how the situation is normally handled and adapt the next action." },
          { id: "c", label: "Avoid the people involved from then on." },
        ],
        correctOptionId: "b",
        explanation:
          "Repair requires recognizing impact, learning the local expectation and changing behavior.",
      },
      {
        id: "capstone-09",
        competencyId: "integrated-global-action",
        prompt:
          "You must choose between visiting a clinic, resolving a housing payment and attending a social event. You have an urgent symptom. What is the correct priority?",
        options: [
          { id: "a", label: "Attend the social event because it cannot be repeated." },
          { id: "b", label: "Address the health risk, notify the housing contact and reschedule the social event." },
          { id: "c", label: "Resolve the payment before discussing the symptom." },
        ],
        correctOptionId: "b",
        explanation:
          "Safety comes first, while concise communication preserves the other commitments.",
      },
      {
        id: "capstone-10",
        competencyId: "integrated-global-action",
        prompt:
          "At the end of the day, which practice creates the strongest next-day readiness?",
        options: [
          { id: "a", label: "Rely on memory because the day is over." },
          { id: "b", label: "Record confirmed details, unresolved risks, responsible contacts and the first next action." },
          { id: "c", label: "Collect more general travel advice online." },
        ],
        correctOptionId: "b",
        explanation:
          "A concise operational record preserves evidence and converts experience into controlled follow-through.",
      },
    ],
  },
];

export function getEnglishAbroadAssessmentBank() {
  return bank;
}

export function getEnglishAbroadAssessment(assessmentId: string) {
  return bank.find((assessment) => assessment.id === assessmentId);
}

export function toPublicLearningAssessment(
  assessment: ScoredLearningAssessment,
): LearningAssessment {
  return {
    description: assessment.description,
    durationMinutes: assessment.durationMinutes,
    id: assessment.id,
    kind: assessment.kind,
    masteryThreshold: assessment.masteryThreshold,
    moduleId: assessment.moduleId,
    questions: assessment.questions.map(
      ({ competencyId, id, options, prompt }) => ({
        competencyId,
        id,
        options,
        prompt,
      }),
    ),
    reflectionPrompt: assessment.reflectionPrompt,
    title: assessment.title,
  };
}
