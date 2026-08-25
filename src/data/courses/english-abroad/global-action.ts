import type { CourseModule } from "@/types/course";

export const globalActionModule = {
  id: "global-action",
  competencyIds: ["integrated-global-action"],
  title: "Global Action Lab",
  description:
    "Combine the course language into realistic tasks that require planning, listening and decisive follow-through.",
  outcome:
    "You can organize appointments, build local connections and complete a multi-step day abroad in English.",
  lessons: [
    {
      id: "phone-appointments",
      title: "Handle phone calls and appointments",
      summary:
        "Open a call, explain the purpose, negotiate a time and confirm details before hanging up.",
      durationMinutes: 22,
      objective:
        "Complete a structured appointment call without visual cues.",
      scenario:
        "You need to book an appointment by phone and the first suggested time does not work.",
      keyPhrases: [
        {
          phrase: "I’m calling to…",
          meaning: "State the purpose immediately.",
          example:
            "I’m calling to schedule an appointment with Dr. Lee.",
        },
        {
          phrase: "Do you have anything available…?",
          meaning: "Ask about open times within a period.",
          example:
            "Do you have anything available after three on Wednesday?",
        },
        {
          phrase: "That time doesn’t work for me.",
          meaning: "Decline one option clearly and neutrally.",
          example:
            "That time doesn’t work for me. Is Thursday morning possible?",
        },
        {
          phrase: "Let me confirm the details.",
          meaning: "Repeat the date, time, location and preparation.",
          example:
            "Let me confirm the details: Thursday at ten, at the Oak Street clinic.",
        },
      ],
      dialogue: [
        { speaker: "Receptionist", line: "Good morning, Oak Street Clinic." },
        {
          speaker: "You",
          line: "Hi, I’m calling to schedule a routine appointment. Do you have anything available on Thursday?",
        },
        {
          speaker: "Receptionist",
          line: "We have nine thirty or two fifteen.",
        },
        {
          speaker: "You",
          line: "Two fifteen works. Let me confirm: Thursday the twelfth at two fifteen — correct?",
        },
      ],
      coachNotes: [
        "Keep your calendar, reference number and spelling alphabet ready before calling.",
        "Repeat names, dates and numbers before the call ends.",
        "Ask whether you need to bring documents or arrive early.",
      ],
      commonMistake: {
        avoid: "I want mark a consultation.",
        useInstead: "I’d like to schedule an appointment.",
        reason: "“Schedule an appointment” is the standard English phrase.",
      },
      checkpoint: {
        prompt: "What should you do before ending an appointment call?",
        options: [
          {
            id: "a",
            label: "Assume you remembered everything correctly.",
          },
          {
            id: "b",
            label:
              "Repeat the date, time, location and any required documents.",
          },
          {
            id: "c",
            label: "Ask the receptionist unrelated questions.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "A short confirmation prevents the most common appointment errors.",
      },
      practiceTask: {
        title: "Simulate an appointment call",
        instruction:
          "Record both sides of a call with one unavailable time and one confirmed alternative.",
        prompt:
          "I’m calling to ____. Do you have anything available ____? Let me confirm ____.",
      },
    },
    {
      id: "community-networking",
      title: "Build a local support network",
      summary:
        "Start conversations, discover shared interests and turn a first meeting into a real connection.",
      durationMinutes: 20,
      objective:
        "Move from small talk to a specific, respectful follow-up.",
      scenario:
        "You attend a community event alone and want to meet people without forcing the interaction.",
      keyPhrases: [
        {
          phrase: "How did you hear about this event?",
          meaning: "Start with a question connected to the shared setting.",
          example:
            "How did you hear about this event? It’s my first time here.",
        },
        {
          phrase: "What do you enjoy about living here?",
          meaning: "Invite a personal but low-pressure local perspective.",
          example:
            "What do you enjoy most about living in this neighborhood?",
        },
        {
          phrase: "I’m interested in…",
          meaning: "Reveal an interest that may create common ground.",
          example: "I’m interested in hiking and local history.",
        },
        {
          phrase: "Would you like to… sometime?",
          meaning: "Suggest a specific but flexible follow-up.",
          example:
            "Would you like to visit that weekend market sometime?",
        },
      ],
      dialogue: [
        {
          speaker: "You",
          line: "Hi, is this your first time at this language exchange?",
        },
        {
          speaker: "Sam",
          line: "No, I come most Thursdays. I moved here last year.",
        },
        {
          speaker: "You",
          line: "Nice. What do you enjoy about living here?",
        },
        {
          speaker: "Sam",
          line: "The parks. A few of us go walking on Sundays if you’d like to join.",
        },
      ],
      coachNotes: [
        "Use the shared environment as the safest conversation starting point.",
        "Balance questions with small pieces of information about yourself.",
        "A support network grows through repeated, low-pressure contact.",
      ],
      commonMistake: {
        avoid: "Give me your contact.",
        useInstead: "Would you like to exchange contact details?",
        reason: "The question gives the other person a comfortable choice.",
      },
      checkpoint: {
        prompt:
          "Which follow-up is specific and respectful after a good conversation?",
        options: [
          { id: "a", label: "You must meet me tomorrow." },
          {
            id: "b",
            label: "Would you like to visit the weekend market sometime?",
          },
          {
            id: "c",
            label: "Tell me all your personal information.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "It offers a clear shared activity while leaving room to choose the time or decline.",
      },
      practiceTask: {
        title: "Design a connection sequence",
        instruction:
          "Prepare one opening question, one shared-interest question and one optional follow-up.",
        prompt:
          "How did you ____? What do you enjoy about ____? Would you like to ____ sometime?",
      },
    },
    {
      id: "final-simulation",
      title: "Final simulation: your first 24 hours",
      summary:
        "Use the complete TGPI communication framework across a demanding day abroad.",
      durationMinutes: 30,
      objective:
        "Make clear decisions across arrival, housing, transport, work and an unexpected problem.",
      scenario:
        "You land in a new country, answer border questions, reach your accommodation, report a problem and attend your first professional meeting.",
      keyPhrases: [
        {
          phrase: "Let me confirm…",
          meaning: "Verify one critical detail before acting.",
          example:
            "Let me confirm: the train leaves from platform fourteen at six twenty.",
        },
        {
          phrase: "The priority is…",
          meaning: "Identify the most important outcome under pressure.",
          example:
            "The priority is to stop the leak and protect the floor.",
        },
        {
          phrase: "I need this in writing.",
          meaning:
            "Request a record for an important agreement or instruction.",
          example:
            "I need the revised check-in instructions in writing, please.",
        },
        {
          phrase: "Here is what I will do next…",
          meaning: "Close a conversation with a clear action.",
          example:
            "Here is what I will do next: send the document and call again at three.",
        },
      ],
      dialogue: [
        {
          speaker: "Host",
          line: "The apartment is not ready, so you need to wait somewhere else.",
        },
        {
          speaker: "You",
          line: "I understand there is a delay. The priority is a safe place for my luggage and a confirmed check-in time.",
        },
        {
          speaker: "Host",
          line: "You can leave your bags at our office and return at five.",
        },
        {
          speaker: "You",
          line: "Thank you. Please send the office address and five o’clock check-in confirmation in writing.",
        },
      ],
      coachNotes: [
        "Use the TGPI sequence: clarify, confirm, act and document.",
        "Under pressure, simple accurate English is stronger than complex uncertain English.",
        "Your goal is independent action, not perfect pronunciation.",
      ],
      commonMistake: {
        avoid:
          "Trying to sound advanced while the key facts remain unclear.",
        useInstead:
          "Short sentences with names, numbers, locations and next actions.",
        reason:
          "Operational clarity matters more than vocabulary range in high-pressure situations.",
      },
      checkpoint: {
        prompt:
          "Which sequence best represents the TGPI communication method?",
        options: [
          { id: "a", label: "Guess, apologize, wait and hope." },
          { id: "b", label: "Clarify, confirm, act and document." },
          {
            id: "c",
            label: "Speak faster, add detail and avoid questions.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "The sequence turns language into controlled action and creates a reliable record when needed.",
      },
      practiceTask: {
        title: "Complete your 24-hour simulation",
        instruction:
          "Speak five short scenes aloud: border control, transport, check-in, problem report and professional introduction.",
        prompt:
          "For each scene: What must I clarify? What must I confirm? What action will I take? What should be documented?",
      },
    },
  ],
} satisfies CourseModule;
