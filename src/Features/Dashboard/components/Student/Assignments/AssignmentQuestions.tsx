'use client';

import { useMemo, useState } from 'react';
import QuestionTracker from './QuestionTracker';
import QuestionRenderer from './QuestionRenderer';
import NavigationButtons from './NavigationButtons';



type Option = {
  id: string;
  option_text: string;
};

type Question = {
  id: string;
  question: string;
  question_type: 'single_choice' | 'multiple_choice' | 'text';
  grade: number;
  sort_order: number;
  options: Option[];
};


type AssignmentQuestionsProps = {
  questions: Question[];
  assignmentTitle: string;
};

export default function AssignmentQuestions({
  questions,
  assignmentTitle,
}: AssignmentQuestionsProps) {
  const sortedQuestions = useMemo(
    () => [...questions].sort((a, b) => a.sort_order - b.sort_order),
    [questions]
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  if (sortedQuestions.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
        <h3 className="text-xl font-semibold">
          No questions have been added yet.
        </h3>
      </div>
    );
  }

  const currentQuestion = sortedQuestions[currentQuestionIndex];

  const handleAnswer = (value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < sortedQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleGoToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = () => {
  };

  const questionTypeMap = {
    single_choice: 'Single Choice',
    multiple_choice: 'Multiple Choice',
    text: 'Text',
  };

  return (
    <div className="mt-10 grid grid-cols-[260px_1fr] gap-8">
      {/* Sidebar */}

      <QuestionTracker
        questions={sortedQuestions}
        currentQuestion={currentQuestionIndex}
        answers={answers}
        onSelectQuestion={handleGoToQuestion}
        onSubmit={handleSubmit}
      />

      {/* Question */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">
        {/* Header */}

        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#EAF7FA] px-3 py-1 text-xs font-semibold text-[#006D77]">
                Question {currentQuestionIndex + 1} of {sortedQuestions.length}
              </span>

              <span className="rounded-full bg-[#FFF7E8] px-3 py-1 text-xs font-semibold text-[#A16207]">
                {currentQuestion.grade} Points
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold text-[#045D6C]">
              {currentQuestion.question}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-xs font-semibold uppercase text-gray-500">
              Type
            </p>

            <p className="font-semibold text-[#344054]">
              {questionTypeMap[currentQuestion.question_type]}
            </p>
          </div>
        </div>

        {/* Answers */}

        <div className="mt-10">
          <QuestionRenderer
            question={currentQuestion}
            value={answers[currentQuestion.id]}
            onChange={handleAnswer}
          />
        </div>

        {/* Footer */}

        <NavigationButtons
          currentQuestion={currentQuestionIndex}
          totalQuestions={sortedQuestions.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
