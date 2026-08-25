import type { CourseModule } from "@/types/course";

export const arrivalModule = {
  id: "arrival",
  title: "Arrival & First Contact",
  description:
    "Communicate clearly from the moment you land and reduce uncertainty during your first hours abroad.",
  outcome:
    "You can introduce yourself, answer border questions and recover when you do not understand.",
  lessons: [
    {
      id: "intro",
      title: "Introduce yourself with clarity",
      summary:
        "Build a short, adaptable introduction for social, academic and professional situations.",
      durationMinutes: 18,
      objective:
        "Deliver a confident 20-second introduction and ask a natural follow-up question.",
      scenario:
        "You have just met a classmate, colleague or host for the first time. They ask: “Tell me about yourself.”",
      keyPhrases: [
        {
          phrase: "I’m originally from…",
          meaning: "State where you come from without implying where you live now.",
          example: "I’m originally from Brazil, and I’m currently based in Madrid.",
        },
        {
          phrase: "I’m here to…",
          meaning: "State the purpose of your stay in a direct way.",
          example: "I’m here to study design and improve my English.",
        },
        {
          phrase: "What brings you here?",
          meaning: "Ask naturally about someone’s purpose or situation.",
          example: "What brings you here — work or study?",
        },
        {
          phrase: "It’s great to meet you.",
          meaning: "Close an introduction warmly.",
          example: "It’s great to meet you. I hope we can stay in touch.",
        },
      ],
      dialogue: [
        { speaker: "Maya", line: "Hi, I’m Maya. I don’t think we’ve met yet." },
        {
          speaker: "You",
          line: "Hi, I’m Alex. I’m originally from Brazil, and I’m here to study international business.",
        },
        { speaker: "Maya", line: "Nice. How long will you be here?" },
        { speaker: "You", line: "About one year. What brings you here?" },
      ],
      coachNotes: [
        "Lead with your name, origin and purpose — not your full life story.",
        "Use one follow-up question to turn a speech into a conversation.",
        "Speak slightly slower than usual, but keep a natural rhythm.",
      ],
      commonMistake: {
        avoid: "I have 25 years.",
        useInstead: "I’m 25 years old.",
        reason: "English uses the verb “to be” for age, not “to have.”",
      },
      checkpoint: {
        prompt:
          "Which introduction is clearest when meeting a new colleague abroad?",
        options: [
          { id: "a", label: "Myself Alex, Brazil, and I come for working." },
          {
            id: "b",
            label:
              "Hi, I’m Alex. I’m originally from Brazil, and I’m here to work with the product team.",
          },
          {
            id: "c",
            label: "I will explain everything about me from the beginning.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "It gives the listener the three details they need: name, origin and purpose.",
      },
      practiceTask: {
        title: "Build your 20-second introduction",
        instruction:
          "Say it aloud three times: once for a neighbor, once for a classmate and once for a recruiter.",
        prompt:
          "Hi, I’m ____. I’m originally from ____, and I’m here to ____. What brings you here?",
      },
    },
    {
      id: "border-control",
      title: "Answer border-control questions",
      summary:
        "Respond calmly and consistently when an immigration officer asks about your trip.",
      durationMinutes: 22,
      objective:
        "Explain your purpose, accommodation, duration and return plan in short factual answers.",
      scenario:
        "You reach passport control after a long flight. The officer asks why you are entering the country and where you will stay.",
      keyPhrases: [
        {
          phrase: "I’m here for…",
          meaning: "State the documented purpose of your trip.",
          example: "I’m here for a two-week business conference.",
        },
        {
          phrase: "I’ll be staying at…",
          meaning: "Name your accommodation.",
          example: "I’ll be staying at the Central Park Hotel.",
        },
        {
          phrase: "I’m staying for…",
          meaning: "Give the planned duration.",
          example: "I’m staying for twelve days.",
        },
        {
          phrase: "Here is my…",
          meaning: "Offer a supporting document without unnecessary detail.",
          example: "Here is my return ticket and hotel confirmation.",
        },
      ],
      dialogue: [
        { speaker: "Officer", line: "What is the purpose of your visit?" },
        { speaker: "You", line: "I’m here for tourism for twelve days." },
        { speaker: "Officer", line: "Where will you be staying?" },
        {
          speaker: "You",
          line: "I’ll be staying at the Central Park Hotel. Here is my reservation.",
        },
      ],
      coachNotes: [
        "Answer only the question asked and keep details consistent with your documents.",
        "Do not joke, guess or invent information at border control.",
        "If a question is unclear, ask for repetition before answering.",
      ],
      commonMistake: {
        avoid: "I stay twelve days.",
        useInstead: "I’m staying for twelve days.",
        reason: "Use the present continuous for a temporary planned stay.",
      },
      checkpoint: {
        prompt:
          "The officer asks: “Where will you be staying?” What is the best answer?",
        options: [
          { id: "a", label: "Maybe with someone. I am not sure." },
          { id: "b", label: "I want to visit many places." },
          {
            id: "c",
            label:
              "I’ll be staying at the North Hotel. Here is the booking confirmation.",
          },
        ],
        correctOptionId: "c",
        explanation:
          "The answer is specific, factual and supported by a document.",
      },
      practiceTask: {
        title: "Prepare your four border answers",
        instruction:
          "Practice your purpose, duration, accommodation and return date without reading.",
        prompt:
          "I’m here for ____. I’m staying for ____. I’ll be staying at ____. I return on ____.",
      },
    },
    {
      id: "transit-help",
      title: "Recover when you feel lost",
      summary:
        "Ask for directions, clarification and slower speech without losing confidence.",
      durationMinutes: 18,
      objective:
        "Use a simple recovery sequence when you miss information in a station or airport.",
      scenario:
        "A gate changes, an announcement is unclear and you need to reach the correct platform quickly.",
      keyPhrases: [
        {
          phrase: "Could you say that again, more slowly?",
          meaning: "Request repetition and a slower pace politely.",
          example: "Sorry, could you say that again, more slowly?",
        },
        {
          phrase: "Did you say gate…?",
          meaning: "Confirm one critical detail.",
          example: "Did you say gate thirty-two?",
        },
        {
          phrase: "How do I get to…?",
          meaning: "Ask for the route to a place.",
          example: "How do I get to platform six from here?",
        },
        {
          phrase: "Could you show me on the map?",
          meaning: "Switch from spoken instructions to visual help.",
          example: "Could you show me on the map, please?",
        },
      ],
      dialogue: [
        {
          speaker: "Staff",
          line: "Your train now leaves from platform fourteen.",
        },
        {
          speaker: "You",
          line: "Sorry, did you say platform four or fourteen?",
        },
        { speaker: "Staff", line: "Fourteen. Go upstairs and turn right." },
        { speaker: "You", line: "Thank you. Could you show me on the map?" },
      ],
      coachNotes: [
        "Confirm numbers, names and times individually.",
        "Use “Sorry” to interrupt politely; you do not need to apologize repeatedly.",
        "A clarification question is a sign of control, not weak English.",
      ],
      commonMistake: {
        avoid: "Repeat!",
        useInstead: "Could you say that again, please?",
        reason: "The full request sounds collaborative rather than demanding.",
      },
      checkpoint: {
        prompt:
          "You hear “fifteen” but are unsure if the person said “fifty.” What should you do?",
        options: [
          { id: "a", label: "Guess and continue." },
          { id: "b", label: "Ask: “Did you say fifteen — one-five?”" },
          { id: "c", label: "Say only: “What?”" },
        ],
        correctOptionId: "b",
        explanation:
          "Repeating and spelling out the number removes the ambiguity immediately.",
      },
      practiceTask: {
        title: "Use the recovery sequence",
        instruction:
          "Practice: interrupt politely, ask for repetition, confirm the detail and thank the person.",
        prompt:
          "Sorry — could you ____. Did you say ____? Thank you for clarifying.",
      },
    },
  ],
} satisfies CourseModule;
