export type Lesson = {
  id: string;
  title: string;
  content: string;
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  modules: Module[];
};

export const courses: Course[] = [
  {
    id: "english-abroad",
    title: "English for Living Abroad",
    description:
      "Learn practical English for real-life situations abroad: airports, jobs, housing and daily life.",
    category: "Language",
    level: "Beginner",
    modules: [
      {
        id: "basics",
        title: "Basic Communication",
        lessons: [
          {
            id: "intro",
            title: "Introduction",
            content:
              "Learn how to introduce yourself, say your name, country and basic personal information.",
          },
          {
            id: "daily",
            title: "Daily Conversations",
            content:
              "Essential phrases for restaurants, transport, shopping and daily life.",
          },
        ],
      },
      {
        id: "work",
        title: "Work & Professional",
        lessons: [
          {
            id: "interview",
            title: "Job Interview",
            content:
              "How to answer common interview questions and present yourself professionally.",
          },
        ],
      },
    ],
  },
];