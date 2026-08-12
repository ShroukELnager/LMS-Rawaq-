'use client';

import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import QuestionTracker from './QuestionTracker';
import QuestionRenderer from './QuestionRenderer';
import NavigationButtons from './NavigationButtons';

import {
  AssignmentSubmission,
  AssignmentSubmissionRequestBody,
  Question,
} from '@/Features/Dashboard/Types';
import useSubmitAssignments from '@/Features/Dashboard/Hooks/useSubmitAssignments';
import SubmittedPage from './AssignmentsPage/SubmittedPage';
import { toast } from 'sonner';
 type AssignmentQuestionsProps = {
   questions: Question[];
   assignmentId: string;
  submission: AssignmentSubmission;
 };
export default function AssignmentQuestions({
  questions,
  assignmentId,
    submission
,
}: AssignmentQuestionsProps) {
  const methods = useForm<AssignmentSubmissionRequestBody>({
    defaultValues: {
      p_assignment_id: assignmentId,
      p_answers: questions.map((question) => ({
        question_id: question.id,
        selected_option_ids: question.question_type !== 'text' ? [] : undefined,
        text_answer: question.question_type === 'text' ? '' : undefined,
      })),
    },
  });

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!questions.length) {
    return (
      <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
        <h3 className="text-xl font-semibold">
          No questions have been added yet.
        </h3>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
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
  const { mutateAsync } = useSubmitAssignments();

  const [isSubmitted, setIsSubmitted] = useState(false);
const [submitResponse, setSubmitResponse] = useState<Date | null>(null);

const onSubmit = async (data: AssignmentSubmissionRequestBody) => {
  if (submission?.status === 'submitted') {
    toast.error('Assignment already submitted');
    return;
  }

  try {
    const response = await mutateAsync(data);

    console.log('res', response);

    setSubmitResponse(
      response?.submitted_at ? new Date(response.submitted_at) : null
    );

    setIsSubmitted(true);
  } catch (error) {
    console.error('Failed to submit assignment:', error);
    toast.error('Failed to submit assignment');
  }
};


  const questionTypeMap = {
    single_choice: 'Single Choice',
    multiple_choice: 'Multiple Choice',
    text: 'Text',
  };

  return (
    <FormProvider {...methods}>
      {isSubmitted ? (
        submitResponse ? (
          <SubmittedPage
            submissionDate={submitResponse}
            questions={questions}
          />
        ) : null
      ) : (
        <div className="w-full p-8">
          {/* Tracker + Question Content */}
          <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-start">
            {/* Question Tracker */}
            <div className="w-full shrink-0 lg:w-[280px]">
              <QuestionTracker
                questions={questions}
                currentQuestion={currentQuestionIndex}
                onSelectQuestion={handleGoToQuestion}
                onSubmit={onSubmit}
              />
            </div>

            {/* Question + Navigation */}
            <div className="min-w-0 flex-1">
              {/* Question Card */}
              <div className="rounded-[28px] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-[#00535B1A] px-4 py-2 text-sm font-semibold text-[#00535B]">
                        Question {currentQuestionIndex + 1} of{' '}
                        {questions.length}
                      </span>

                      <span className="font-inter text-[12px] font-semibold uppercase leading-4 tracking-[0.6px] text-right align-middle text-[#5E4700]">
                        {currentQuestion.grade} Points
                      </span>
                    </div>

                    <h2 className="mt-6 text-2xl font-bold leading-relaxed text-[#045D6C] lg:text-3xl">
                      {currentQuestion.question}
                    </h2>
                  </div>

                  {/* Question Type */}
                  <div className="shrink-0 px-5 py-4 text-center">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#3E494A]">
                      Type
                    </p>

                    <p className="font-inter text-sm font-bold leading-5 tracking-[0.14px] text-right text-[#605F50]">
                      {questionTypeMap[currentQuestion.question_type]}
                    </p>
                  </div>
                </div>

                {/* Question */}
                <div className="mt-12">
                  <QuestionRenderer
                    question={currentQuestion}
                    questionIndex={currentQuestionIndex}
                  />
                </div>
              </div>

              {/* Navigation Buttons - Outside Card */}
              <div className="">
                <NavigationButtons
                  currentQuestion={currentQuestionIndex}
                  totalQuestions={questions.length}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </FormProvider>
  );
}
