import type { CourseModule } from "@/types/course";

export const dailyIndependenceModule = {
  id: "daily-independence",
  title: "Everyday Independence",
  description:
    "Manage transport, purchases and healthcare without depending on another person to translate.",
  outcome:
    "You can complete common transactions, correct mistakes and communicate essential health information.",
  lessons: [
    {
      id: "daily",
      title: "Navigate transport and directions",
      summary:
        "Ask for routes, tickets, stops and timing while confirming critical information.",
      durationMinutes: 18,
      objective:
        "Plan a simple journey and recover when a route changes.",
      scenario:
        "You need to reach an appointment using a bus and train connection in an unfamiliar city.",
      keyPhrases: [
        {
          phrase: "Does this go to…?",
          meaning: "Confirm whether a vehicle reaches your destination.",
          example: "Does this train go to Central Station?",
        },
        {
          phrase: "Where do I change?",
          meaning: "Ask where to transfer to another service.",
          example: "Where do I change for the airport line?",
        },
        {
          phrase: "Which stop should I get off at?",
          meaning: "Confirm the correct stop.",
          example: "Which stop should I get off at for the university?",
        },
        {
          phrase: "How long does it take?",
          meaning: "Ask about journey duration.",
          example: "How long does it take at this time of day?",
        },
      ],
      dialogue: [
        {
          speaker: "You",
          line: "Excuse me, does this bus go to City Hospital?",
        },
        {
          speaker: "Driver",
          line: "Not directly. Change to the number eight at Market Square.",
        },
        {
          speaker: "You",
          line: "Which stop should I get off at for Market Square?",
        },
        { speaker: "Driver", line: "The fourth stop. I’ll let you know." },
      ],
      coachNotes: [
        "Use a destination name, not only a street address, when asking transport staff.",
        "Confirm the transfer point and final stop separately.",
        "Leave extra time when the route involves an unfamiliar connection.",
      ],
      commonMistake: {
        avoid: "Where I need to get down?",
        useInstead: "Where should I get off?",
        reason: "English uses “get off” for leaving a bus, train or plane.",
      },
      checkpoint: {
        prompt:
          "You must transfer to another line. Which question is most useful?",
        options: [
          { id: "a", label: "Where do I change for the airport line?" },
          { id: "b", label: "Is this city very large?" },
          { id: "c", label: "Can transport be difficult?" },
        ],
        correctOptionId: "a",
        explanation:
          "It identifies the exact action and destination you need.",
      },
      practiceTask: {
        title: "Explain a two-step journey",
        instruction:
          "Choose a real destination and explain the first route, transfer point and final stop.",
        prompt: "Take ____. Change at ____. Get off at ____.",
      },
    },
    {
      id: "money-shopping",
      title: "Handle payments, returns and mistakes",
      summary:
        "Complete purchases and correct a transaction without escalating the situation.",
      durationMinutes: 20,
      objective:
        "Ask about price, payment, receipts, refunds and an incorrect charge.",
      scenario:
        "A shop charges you twice and you need to explain the issue at the service desk.",
      keyPhrases: [
        {
          phrase: "Could I have a receipt?",
          meaning: "Request proof of purchase.",
          example: "Could I have an itemized receipt, please?",
        },
        {
          phrase: "I think I was charged twice.",
          meaning: "Flag a possible duplicate payment without accusing anyone.",
          example: "I think I was charged twice for this item.",
        },
        {
          phrase: "What is your return policy?",
          meaning: "Ask about the conditions for returning an item.",
          example: "What is your return policy for sale items?",
        },
        {
          phrase: "Could you check the transaction?",
          meaning: "Request verification of the payment record.",
          example: "Could you check the transaction ending in 4821?",
        },
      ],
      dialogue: [
        {
          speaker: "You",
          line: "Hi, I think I was charged twice for this order.",
        },
        {
          speaker: "Staff",
          line: "Do you have the receipt or the card transaction?",
        },
        {
          speaker: "You",
          line: "Yes. Both payments appear here. Could you check the transaction?",
        },
        {
          speaker: "Staff",
          line: "You’re right. I’ll reverse the second charge.",
        },
      ],
      coachNotes: [
        "Use evidence and neutral language before assuming intent.",
        "Keep the receipt until the refund appears in your account.",
        "Ask how long the reversal will take and how it will be confirmed.",
      ],
      commonMistake: {
        avoid: "You robbed my money.",
        useInstead: "I think there may be an incorrect charge.",
        reason:
          "Neutral language keeps the conversation factual and easier to resolve.",
      },
      checkpoint: {
        prompt:
          "Your bank app shows the same shop payment twice. What should you say first?",
        options: [
          { id: "a", label: "You stole from me." },
          {
            id: "b",
            label: "I think I was charged twice. Could you check the transaction?",
          },
          { id: "c", label: "Give money now." },
        ],
        correctOptionId: "b",
        explanation:
          "It explains the issue and asks for verification without creating unnecessary conflict.",
      },
      practiceTask: {
        title: "Practice a transaction correction",
        instruction:
          "Role-play the customer and staff sides, including evidence and expected resolution time.",
        prompt: "I think ____. Here is ____. Could you check ____?",
      },
    },
    {
      id: "health-care",
      title: "Explain a health concern",
      summary:
        "Communicate symptoms, duration, severity and medication safely in a routine appointment.",
      durationMinutes: 22,
      objective:
        "Give a structured symptom description and understand basic follow-up questions.",
      scenario:
        "You need a same-day clinic appointment because a symptom has become worse.",
      keyPhrases: [
        {
          phrase: "I’ve had… for…",
          meaning: "Connect a symptom with its duration.",
          example: "I’ve had a fever for two days.",
        },
        {
          phrase: "It gets worse when…",
          meaning: "Explain what increases the symptom.",
          example: "The pain gets worse when I breathe deeply.",
        },
        {
          phrase: "I’m allergic to…",
          meaning: "State a known allergy clearly.",
          example: "I’m allergic to penicillin.",
        },
        {
          phrase: "I currently take…",
          meaning: "List a medicine you use now.",
          example:
            "I currently take ten milligrams of this medication daily.",
        },
      ],
      dialogue: [
        { speaker: "Clinician", line: "What brings you in today?" },
        {
          speaker: "You",
          line: "I’ve had a severe sore throat for three days, and it is getting worse.",
        },
        {
          speaker: "Clinician",
          line: "Do you have a fever or any allergies?",
        },
        {
          speaker: "You",
          line: "I had a fever last night, and I’m allergic to penicillin.",
        },
      ],
      coachNotes: [
        "Keep a medication list on your phone with names, doses and allergies.",
        "Describe what you feel; do not diagnose yourself as a substitute for medical assessment.",
        "Repeat back critical instructions about dosage and follow-up.",
      ],
      commonMistake: {
        avoid: "I am with fever since Monday.",
        useInstead: "I’ve had a fever since Monday.",
        reason:
          "Use “have had” for a symptom that started earlier and continues now.",
      },
      checkpoint: {
        prompt: "Which description is most useful to a clinician?",
        options: [
          { id: "a", label: "I feel bad." },
          {
            id: "b",
            label:
              "I’ve had sharp pain in my lower back for two days, and it gets worse when I move.",
          },
          {
            id: "c",
            label: "I found many possible diseases online.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "It identifies location, type, duration and the condition that makes the symptom worse.",
      },
      practiceTask: {
        title: "Build a symptom summary",
        instruction:
          "Use a real minor past symptom or an imaginary example. Include location, duration, severity and allergies.",
        prompt:
          "I’ve had ____ for ____. It feels ____. It gets worse when ____. I’m allergic to ____.",
      },
    },
  ],
} satisfies CourseModule;
