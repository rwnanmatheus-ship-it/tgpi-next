import type { CourseModule } from "@/types/course";

export const safetyCultureModule = {
  id: "safety-culture",
  title: "Safety, Rights & Cultural Confidence",
  description:
    "Use calm, direct language when safety, boundaries or cultural differences raise the stakes.",
  outcome:
    "You can request emergency help, protect a boundary and repair a misunderstanding respectfully.",
  lessons: [
    {
      id: "emergency-english",
      title: "Communicate in an emergency",
      summary:
        "Give emergency services the information they need in the correct order.",
      durationMinutes: 18,
      objective:
        "State the emergency, exact location, current danger and number of people affected.",
      scenario:
        "You witness a road accident and call the local emergency number.",
      keyPhrases: [
        {
          phrase:
            "I need an ambulance / the police / the fire service.",
          meaning: "Request the correct emergency response.",
          example: "I need an ambulance. A cyclist has been injured.",
        },
        {
          phrase: "We are at…",
          meaning: "Give the exact or best available location.",
          example:
            "We are at the corner of Pine Street and Second Avenue.",
        },
        {
          phrase: "The immediate danger is…",
          meaning: "Identify a risk that is still active.",
          example:
            "The immediate danger is traffic moving around the vehicle.",
        },
        {
          phrase: "There are … people affected.",
          meaning: "State how many people may need help.",
          example: "There are two people affected; one is unconscious.",
        },
      ],
      dialogue: [
        {
          speaker: "Operator",
          line: "Emergency services. What has happened?",
        },
        {
          speaker: "You",
          line: "There has been a road accident. I need an ambulance.",
        },
        { speaker: "Operator", line: "What is your exact location?" },
        {
          speaker: "You",
          line: "We are outside 48 King Street, next to the pharmacy. One person is injured.",
        },
      ],
      coachNotes: [
        "Learn the emergency number for the country before you need it.",
        "Follow the operator’s instructions and do not perform unsafe actions.",
        "Keep your location available offline when possible.",
      ],
      commonMistake: {
        avoid: "Please come fast somewhere near the center.",
        useInstead: "We are outside 48 King Street, next to the pharmacy.",
        reason: "Emergency responders need a precise, verifiable location.",
      },
      checkpoint: {
        prompt:
          "What information should you give first during an emergency call?",
        options: [
          {
            id: "a",
            label: "A long explanation of your travel plans.",
          },
          {
            id: "b",
            label:
              "The emergency, exact location, current danger and people affected.",
          },
          {
            id: "c",
            label: "Your opinion about who caused the situation.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "These facts allow the operator to dispatch the right help quickly.",
      },
      practiceTask: {
        title: "Run a 20-second emergency drill",
        instruction:
          "Choose an imaginary location and speak the four critical facts in order.",
        prompt:
          "I need ____. We are at ____. The danger is ____. There are ____ people affected.",
      },
    },
    {
      id: "rights-boundaries",
      title: "Set a clear boundary",
      summary:
        "Use direct, documented language when you do not agree, feel unsafe or need formal support.",
      durationMinutes: 20,
      objective:
        "Say no clearly, request the reason for an action and ask for an interpreter or written record.",
      scenario:
        "A person pressures you to sign a document you do not fully understand.",
      keyPhrases: [
        {
          phrase: "I’m not comfortable signing this yet.",
          meaning: "Pause consent without escalating unnecessarily.",
          example:
            "I’m not comfortable signing this until I understand every section.",
        },
        {
          phrase: "Please explain the reason for…",
          meaning: "Request the basis for a decision or request.",
          example:
            "Please explain the reason for this additional fee.",
        },
        {
          phrase: "I would like an interpreter.",
          meaning:
            "Request language support for a consequential conversation.",
          example: "I would like an interpreter before we continue.",
        },
        {
          phrase: "Please provide that in writing.",
          meaning: "Create a record of the information or instruction.",
          example:
            "Please provide the reason and next steps in writing.",
        },
      ],
      dialogue: [
        {
          speaker: "Representative",
          line: "You need to sign this form now.",
        },
        {
          speaker: "You",
          line: "I’m not comfortable signing it until I understand the final section.",
        },
        {
          speaker: "Representative",
          line: "It is standard. There is nothing to worry about.",
        },
        {
          speaker: "You",
          line: "Please explain the section and provide a copy. I would also like an interpreter.",
        },
      ],
      coachNotes: [
        "Clear boundaries do not require aggressive language.",
        "For legal, medical, police or immigration matters, professional interpretation may be essential.",
        "This course is not legal advice; verify local rights with an authorized source.",
      ],
      commonMistake: {
        avoid: "I don’t want nothing.",
        useInstead: "I do not agree to this yet.",
        reason:
          "The direct sentence avoids a double negative and states the boundary precisely.",
      },
      checkpoint: {
        prompt:
          "You do not understand a consequential document. What is the strongest response?",
        options: [
          { id: "a", label: "Sign quickly so the conversation ends." },
          {
            id: "b",
            label:
              "I’m not comfortable signing this yet. I need an explanation and a copy in writing.",
          },
          {
            id: "c",
            label: "Pretend you understand and ask a friend later.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "It pauses consent and requests the information needed for an informed decision.",
      },
      practiceTask: {
        title: "Practice a calm refusal",
        instruction:
          "Say the boundary once, state what you need and avoid over-explaining.",
        prompt:
          "I’m not comfortable ____. Before we continue, I need ____ in writing.",
      },
    },
    {
      id: "cultural-repair",
      title: "Repair a cultural misunderstanding",
      summary:
        "Clarify intent, acknowledge impact and ask about local expectations without becoming defensive.",
      durationMinutes: 20,
      objective:
        "Use a four-step repair when tone, timing or behavior is interpreted differently.",
      scenario:
        "A colleague says your message sounded too direct, although you intended to be efficient.",
      keyPhrases: [
        {
          phrase: "That wasn’t my intention.",
          meaning:
            "Clarify intent without denying the other person’s experience.",
          example:
            "That wasn’t my intention. I can see how the message sounded abrupt.",
        },
        {
          phrase: "Thank you for telling me.",
          meaning: "Recognize feedback before explaining yourself.",
          example:
            "Thank you for telling me — I want to communicate more clearly.",
        },
        {
          phrase: "How would this normally be expressed here?",
          meaning: "Ask for a local communication model.",
          example:
            "How would this request normally be expressed on this team?",
        },
        {
          phrase: "Next time, I’ll…",
          meaning: "Commit to an observable adjustment.",
          example:
            "Next time, I’ll add context and make the deadline a question.",
        },
      ],
      dialogue: [
        {
          speaker: "Colleague",
          line: "Your message sounded like an order, not a request.",
        },
        {
          speaker: "You",
          line: "Thank you for telling me. That wasn’t my intention, but I understand the impact.",
        },
        {
          speaker: "Colleague",
          line: "We usually give more context before asking for a deadline.",
        },
        {
          speaker: "You",
          line: "That helps. Next time, I’ll add the context and ask what timeline is realistic.",
        },
      ],
      coachNotes: [
        "Impact and intention can be different; addressing both builds trust.",
        "Avoid treating one person’s preference as a rule for an entire country.",
        "Observe patterns, ask questions and adapt without erasing your identity.",
      ],
      commonMistake: {
        avoid: "You misunderstood me, so it is not my fault.",
        useInstead:
          "That wasn’t my intention, but I understand how it sounded.",
        reason:
          "The second sentence clarifies intent while acknowledging impact.",
      },
      checkpoint: {
        prompt:
          "Which response best repairs a cross-cultural misunderstanding?",
        options: [
          {
            id: "a",
            label: "People in my country understand me, so you should too.",
          },
          {
            id: "b",
            label:
              "That wasn’t my intention. Thank you for telling me — how would this normally be expressed here?",
          },
          { id: "c", label: "Say nothing and avoid the person." },
        ],
        correctOptionId: "b",
        explanation:
          "It clarifies intent, acknowledges feedback and seeks a practical adjustment.",
      },
      practiceTask: {
        title: "Write a repair message",
        instruction:
          "Use an imaginary misunderstanding and include acknowledgment, intent, question and next action.",
        prompt:
          "Thank you for ____. That wasn’t my intention. How would ____? Next time, I’ll ____.",
      },
    },
  ],
} satisfies CourseModule;
