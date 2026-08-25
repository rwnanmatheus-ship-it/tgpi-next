import type { CourseModule } from "@/types/course";

export const housingModule = {
  id: "housing",
  title: "Housing & Daily Setup",
  description:
    "Find accommodation, understand essential terms and solve common problems in your new home.",
  outcome:
    "You can ask precise housing questions, clarify responsibilities and report a problem in writing.",
  lessons: [
    {
      id: "housing-search",
      title: "Ask the right housing questions",
      summary:
        "Screen a room or apartment before spending time, money or personal data.",
      durationMinutes: 20,
      objective:
        "Ask about price, location, availability, deposits and what is included.",
      scenario:
        "You found an apartment listing online and need to contact the landlord before arranging a viewing.",
      keyPhrases: [
        {
          phrase: "Is the property still available?",
          meaning: "Confirm that the listing is active.",
          example: "Hello, is the one-bedroom property still available?",
        },
        {
          phrase: "What is included in the rent?",
          meaning: "Ask whether bills, furniture or services are part of the price.",
          example: "What is included in the rent — water, electricity or internet?",
        },
        {
          phrase: "How much is the deposit?",
          meaning: "Ask about the refundable amount paid before moving in.",
          example: "How much is the deposit, and where is it protected?",
        },
        {
          phrase: "Could I arrange a viewing?",
          meaning: "Request a time to inspect the property.",
          example: "Could I arrange a viewing for Thursday afternoon?",
        },
      ],
      dialogue: [
        {
          speaker: "You",
          line: "Hi, is the studio on King Street still available?",
        },
        {
          speaker: "Agent",
          line: "Yes. It is available from the first of September.",
        },
        {
          speaker: "You",
          line: "Great. What is included in the rent, and how much is the deposit?",
        },
        {
          speaker: "Agent",
          line: "Water is included. The deposit is one month’s rent.",
        },
      ],
      coachNotes: [
        "Ask the same core questions for every property so comparisons are easier.",
        "Never let urgency replace verification of the property and contract.",
        "Request important conditions in writing.",
      ],
      commonMistake: {
        avoid: "How much costs the apartment?",
        useInstead: "How much does the apartment cost?",
        reason: "English questions with “does” use the base verb “cost.”",
      },
      checkpoint: {
        prompt:
          "Which question helps you understand the true monthly housing cost?",
        options: [
          { id: "a", label: "Is the apartment beautiful?" },
          {
            id: "b",
            label: "What is included in the rent, and which bills are separate?",
          },
          { id: "c", label: "Can I move today without a contract?" },
        ],
        correctOptionId: "b",
        explanation:
          "Rent alone does not reveal the full monthly cost; separate bills can change affordability.",
      },
      practiceTask: {
        title: "Write your first housing message",
        instruction:
          "Create a five-line message that includes the listing, availability, costs, move-in date and viewing request.",
        prompt:
          "Hello, I’m contacting you about ____. Is it still available? Could you confirm ____?",
      },
    },
    {
      id: "lease-utilities",
      title: "Clarify the lease and utilities",
      summary:
        "Confirm contractual details before you sign or transfer money.",
      durationMinutes: 22,
      objective:
        "Clarify the term, notice period, utilities, inventory and payment conditions.",
      scenario:
        "The landlord sends you a lease. Some clauses and responsibilities are unclear.",
      keyPhrases: [
        {
          phrase: "Could you clarify this clause?",
          meaning: "Request a plain explanation of one contract section.",
          example: "Could you clarify the early-termination clause?",
        },
        {
          phrase: "Who is responsible for…?",
          meaning: "Confirm which party must pay or act.",
          example: "Who is responsible for routine maintenance?",
        },
        {
          phrase: "What is the notice period?",
          meaning: "Ask how early you must communicate that you are leaving.",
          example: "What is the notice period if I need to move out?",
        },
        {
          phrase: "I’d like this confirmed in writing.",
          meaning: "Ask for an auditable record of an agreement.",
          example: "I’d like the utility arrangement confirmed in writing.",
        },
      ],
      dialogue: [
        {
          speaker: "You",
          line: "Could you clarify who is responsible for the internet account?",
        },
        {
          speaker: "Landlord",
          line: "You need to open and pay for it directly.",
        },
        {
          speaker: "You",
          line: "Understood. What is the notice period if I leave after six months?",
        },
        {
          speaker: "Landlord",
          line: "It is sixty days. I’ll add that to the email.",
        },
      ],
      coachNotes: [
        "Separate what the person says from what the written agreement confirms.",
        "Ask one contract question at a time and keep the answer attached to the relevant clause.",
        "Do not sign language you cannot explain in your own words.",
      ],
      commonMistake: {
        avoid: "I have a doubt about the contract.",
        useInstead: "I have a question about the contract.",
        reason: "In this context, English normally uses “question,” not “doubt.”",
      },
      checkpoint: {
        prompt:
          "A landlord promises verbally that you may leave early without a fee. What is the strongest response?",
        options: [
          { id: "a", label: "Okay, I will remember." },
          {
            id: "b",
            label: "I’d like that condition confirmed in writing before I sign.",
          },
          { id: "c", label: "I do not need to read the lease now." },
        ],
        correctOptionId: "b",
        explanation:
          "Written confirmation reduces ambiguity and gives you a reliable record.",
      },
      practiceTask: {
        title: "Create a lease clarification list",
        instruction:
          "Write five questions covering term, deposit, bills, notice and repairs.",
        prompt: "Could you clarify ____. Who is responsible for ____?",
      },
    },
    {
      id: "home-problems",
      title: "Report a problem at home",
      summary:
        "Describe urgency, evidence and the action you need when something stops working.",
      durationMinutes: 20,
      objective:
        "Send a clear maintenance report with location, impact, evidence and requested timeline.",
      scenario:
        "There is a leak under the kitchen sink and the property manager needs enough information to respond.",
      keyPhrases: [
        {
          phrase: "I’m writing to report…",
          meaning: "Open a formal maintenance message.",
          example: "I’m writing to report a leak under the kitchen sink.",
        },
        {
          phrase: "The issue started…",
          meaning: "Provide a time reference.",
          example: "The issue started this morning at around eight.",
        },
        {
          phrase: "It is affecting…",
          meaning: "Explain the practical impact.",
          example: "It is affecting the cabinet and the floor.",
        },
        {
          phrase: "Could you arrange…?",
          meaning: "Request a specific next action.",
          example: "Could you arrange an urgent repair today?",
        },
      ],
      dialogue: [
        {
          speaker: "You",
          line: "I’m calling to report a leak under the kitchen sink.",
        },
        {
          speaker: "Manager",
          line: "When did it start, and is the water still running?",
        },
        {
          speaker: "You",
          line: "It started this morning. I closed the valve, but the cabinet is wet.",
        },
        {
          speaker: "Manager",
          line: "I’ll send a plumber between two and four.",
        },
      ],
      coachNotes: [
        "State safety risks first: gas, electricity, fire, flooding or loss of heat.",
        "Attach photos when appropriate, but never enter danger to collect evidence.",
        "Confirm the visit window and access instructions.",
      ],
      commonMistake: {
        avoid: "The water is losing.",
        useInstead: "The pipe is leaking.",
        reason: "“Leaking” describes liquid escaping from a pipe or container.",
      },
      checkpoint: {
        prompt:
          "Which report gives a property manager enough information to act?",
        options: [
          { id: "a", label: "Something is bad. Please fix." },
          {
            id: "b",
            label:
              "There is a leak under the kitchen sink. It started this morning, the valve is closed and the cabinet is wet. Could you arrange a repair today?",
          },
          { id: "c", label: "The apartment has problems sometimes." },
        ],
        correctOptionId: "b",
        explanation:
          "It identifies the problem, location, timing, status, impact and requested action.",
      },
      practiceTask: {
        title: "Record a 30-second maintenance report",
        instruction:
          "Describe one imaginary problem and include the action already taken.",
        prompt:
          "I’m reporting ____. It started ____. I have already ____. Could you ____?",
      },
    },
  ],
} satisfies CourseModule;
