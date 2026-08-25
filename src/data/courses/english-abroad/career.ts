import type { CourseModule } from "@/types/course";

export const careerModule = {
  id: "career",
  competencyIds: ["professional-communication"],
  title: "Work & Professional Life",
  description:
    "Present your value, interview with structure and participate in everyday workplace communication.",
  outcome:
    "You can introduce your experience, answer competency questions and clarify work expectations.",
  lessons: [
    {
      id: "professional-intro",
      title: "Present your professional value",
      summary:
        "Turn your background into a concise introduction focused on relevance and results.",
      durationMinutes: 20,
      objective:
        "Deliver a 30-second professional introduction using role, strength, evidence and direction.",
      scenario:
        "A recruiter or new manager asks: “Can you walk me through your background?”",
      keyPhrases: [
        {
          phrase: "I specialize in…",
          meaning: "Name your strongest area of expertise.",
          example: "I specialize in product design for mobile services.",
        },
        {
          phrase: "My experience includes…",
          meaning: "Summarize relevant responsibilities or sectors.",
          example:
            "My experience includes research, prototyping and design systems.",
        },
        {
          phrase: "One result I’m proud of is…",
          meaning: "Introduce evidence of your impact.",
          example:
            "One result I’m proud of is reducing onboarding time by thirty percent.",
        },
        {
          phrase: "I’m now looking to…",
          meaning: "Connect your past to your next direction.",
          example:
            "I’m now looking to contribute to an international product team.",
        },
      ],
      dialogue: [
        {
          speaker: "Recruiter",
          line: "Tell me a little about your professional background.",
        },
        {
          speaker: "You",
          line: "I’m a web developer specializing in accessible, high-performance interfaces.",
        },
        {
          speaker: "Recruiter",
          line: "What kind of results have you delivered?",
        },
        {
          speaker: "You",
          line: "Most recently, I improved conversion by eighteen percent through a checkout redesign.",
        },
      ],
      coachNotes: [
        "Choose evidence that matches the opportunity instead of listing every responsibility.",
        "Use numbers only when you can explain where they came from.",
        "End with the direction you want, not only what you have done.",
      ],
      commonMistake: {
        avoid: "I am formed in computer science.",
        useInstead: "I have a degree in computer science.",
        reason:
          "English uses “have a degree in” to describe academic qualifications.",
      },
      checkpoint: {
        prompt:
          "Which introduction presents professional value most effectively?",
        options: [
          { id: "a", label: "I did many things at different jobs." },
          {
            id: "b",
            label:
              "I specialize in customer research, and my latest project increased activation by twenty percent.",
          },
          { id: "c", label: "My résumé has all the information." },
        ],
        correctOptionId: "b",
        explanation:
          "It connects a clear strength with measurable evidence.",
      },
      practiceTask: {
        title: "Record your value statement",
        instruction:
          "Record a 30-second answer, listen once and remove any detail that does not support the target role.",
        prompt:
          "I specialize in ____. My experience includes ____. One result I’m proud of is ____. I’m now looking to ____.",
      },
    },
    {
      id: "interview",
      title: "Answer interview questions with structure",
      summary:
        "Use a simple evidence framework to explain what you did and why it mattered.",
      durationMinutes: 22,
      objective:
        "Answer a behavioral question using situation, action and result in under ninety seconds.",
      scenario:
        "An interviewer asks you to describe a difficult problem you solved.",
      keyPhrases: [
        {
          phrase: "The situation was…",
          meaning: "Give only the context needed to understand the challenge.",
          example:
            "The situation was a delayed launch with two weeks remaining.",
        },
        {
          phrase: "My responsibility was…",
          meaning: "Clarify your ownership.",
          example:
            "My responsibility was to coordinate the recovery plan.",
        },
        {
          phrase: "I decided to…",
          meaning: "Explain the action and judgment you personally contributed.",
          example:
            "I decided to reduce scope and protect the critical user journey.",
        },
        {
          phrase: "As a result…",
          meaning: "Close with an outcome or lesson.",
          example:
            "As a result, we launched on time with no critical defects.",
        },
      ],
      dialogue: [
        {
          speaker: "Interviewer",
          line: "Tell me about a time you solved a difficult problem.",
        },
        {
          speaker: "You",
          line: "Our main supplier failed one week before an event. I was responsible for finding an alternative.",
        },
        { speaker: "Interviewer", line: "What did you do?" },
        {
          speaker: "You",
          line: "I compared three local vendors and renegotiated the scope. As a result, the event started on time and stayed within budget.",
        },
      ],
      coachNotes: [
        "Spend more time on your action and result than on background context.",
        "Use “I” for your contribution and “we” for the team outcome.",
        "Prepare four evidence stories that can adapt to multiple questions.",
      ],
      commonMistake: {
        avoid: "We had a problem and in the end everything worked.",
        useInstead:
          "I identified the cause, changed the process and reduced delays by two days.",
        reason:
          "Specific action and evidence make your contribution credible.",
      },
      checkpoint: {
        prompt:
          "What should receive the most attention in a behavioral interview answer?",
        options: [
          { id: "a", label: "A long history of the company." },
          {
            id: "b",
            label: "Your specific action and the result it produced.",
          },
          {
            id: "c",
            label: "Every person who attended the meeting.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "Interviewers need evidence of how you think and act, not only the setting.",
      },
      practiceTask: {
        title: "Build one evidence story",
        instruction:
          "Choose a real challenge and record a 60–90 second answer using the framework.",
        prompt:
          "The situation was ____. My responsibility was ____. I decided to ____. As a result, ____.",
      },
    },
    {
      id: "workplace-communication",
      title: "Clarify work, deadlines and feedback",
      summary:
        "Prevent avoidable mistakes by confirming expectations and responding professionally to feedback.",
      durationMinutes: 18,
      objective:
        "Clarify a task, negotiate a realistic timeline and confirm next steps in writing.",
      scenario:
        "Your manager gives you a task with an unclear scope and an ambitious deadline.",
      keyPhrases: [
        {
          phrase: "To make sure I understand…",
          meaning: "Introduce a concise restatement of the request.",
          example:
            "To make sure I understand, the priority is the mobile version by Friday — correct?",
        },
        {
          phrase: "What does success look like?",
          meaning: "Ask for the expected outcome or quality standard.",
          example: "What does success look like for the first draft?",
        },
        {
          phrase: "I can deliver X by Y if…",
          meaning: "Negotiate scope and time using a condition.",
          example:
            "I can deliver the analysis by Thursday if we move the presentation to next week.",
        },
        {
          phrase: "I’ll send a summary of the next steps.",
          meaning: "Create a written record after the discussion.",
          example:
            "I’ll send a summary of the next steps and owners after this call.",
        },
      ],
      dialogue: [
        {
          speaker: "Manager",
          line: "Can you finish the report and presentation by tomorrow?",
        },
        {
          speaker: "You",
          line: "To make sure I understand, you need the full analysis and final slides by five tomorrow?",
        },
        {
          speaker: "Manager",
          line: "The analysis is the priority. The slides can wait.",
        },
        {
          speaker: "You",
          line: "Great. I can deliver the analysis by five and the slides on Thursday. I’ll confirm that by email.",
        },
      ],
      coachNotes: [
        "Clarification is cheaper than rework.",
        "When negotiating, offer a concrete alternative rather than only saying no.",
        "Summarize decisions, owners and dates after important conversations.",
      ],
      commonMistake: {
        avoid: "I will try to finish everything maybe tomorrow.",
        useInstead:
          "I can deliver the analysis tomorrow and the final slides on Thursday.",
        reason: "A clear commitment helps both sides manage expectations.",
      },
      checkpoint: {
        prompt: "A task is unclear. What is the strongest first response?",
        options: [
          {
            id: "a",
            label:
              "Start immediately and hope your interpretation is correct.",
          },
          {
            id: "b",
            label:
              "To make sure I understand, could we confirm the priority, expected output and deadline?",
          },
          {
            id: "c",
            label: "Say the task is impossible before asking questions.",
          },
        ],
        correctOptionId: "b",
        explanation:
          "It converts an ambiguous request into three testable expectations.",
      },
      practiceTask: {
        title: "Write a confirmation message",
        instruction:
          "Summarize one imaginary assignment using deliverable, owner, deadline and open question.",
        prompt:
          "To confirm, I will deliver ____ by ____. Success means ____. The remaining question is ____.",
      },
    },
  ],
} satisfies CourseModule;
