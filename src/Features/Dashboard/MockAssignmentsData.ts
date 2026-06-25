export type AssignmentStatus = "draft" | "published";

export interface AssignmentQuestion {
  id: string;
  order: number;
  title: string;
  instructions: string;
  grade: number;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  status: AssignmentStatus;
  questions: AssignmentQuestion[];
}

export const assignmentMock: Assignment = {
  id: "assignment-1",

  title: "Introduction to Islamic Philosophy",

  description:
    "Analyze key philosophical concepts and compare the contributions of major Islamic thinkers.",

  deadline: new Date("2024-02-20"),

  status: "draft",

  questions: [
    {
      id: "question-1",
      order: 1,
      title: "Summarize the primary tenets of scholastic logic.",
      instructions:
        "Discuss the foundations and major principles with examples.",
      grade: 10,
    },

    {
      id: "question-2",
      order: 2,
      title:
        "Compare and contrast the views of Al-Farabi and Avicenna.",
      instructions:
        "Focus on metaphysics, epistemology, and political philosophy.",
      grade: 10,
    },
  ],
};