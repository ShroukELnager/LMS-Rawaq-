'use client';

import { SubmissionReviewDetailsResponse } from '@/Features/Dashboard/Types';
import { UseQueryResult } from '@tanstack/react-query';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import Info from '@/assets/icons/Info (2).svg';
import { useRouter } from 'next/navigation';

export type QuestionReviewProps = {
  data: UseQueryResult<SubmissionReviewDetailsResponse, Error>;
  index: number;
};

export default function QuestionCard({ data, index }: QuestionReviewProps) {
  const router = useRouter();

  const assignmentDetails = data.data;
  const question = assignmentDetails?.questions[index];

  if (data.isLoading) {
    return null;
  }

  if (!question || !assignmentDetails) {
    return null;
  }

  const isText = question.question_type === 'text';

  const selectedOptionIds = question.answer.selected_option_ids ?? [];

  const isFullGrade = (question.answer.grade_awarded ?? 0) === question.grade;

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  return (
    <>
      {index === 0 && (
        <div className="flex flex-col items-center justify-center px-3 py-8 text-center md:hidden">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE2E2]">
            <AlertTriangle
              size={32}
              strokeWidth={2.5}
              className="text-[#DC2626]"
            />
          </div>

          <p className="mt-4 max-w-[220px] font-inter text-sm font-bold leading-5 text-[#DC2626]">
            Open desktop screen to view the assignment
          </p>

          <button
            type="button"
            onClick={() => router.back()}
            className="mt-4 cursor-pointer h-10 w-full rounded-lg border border-[#BEC8CA] bg-white px-4 font-inter text-xs font-medium text-primary transition hover:bg-[#F0F3FF]"
          >
            Back to Assignments
          </button>
        </div>
      )}

      <div className="hidden md:block">
        <div className="mb-5 rounded-xl border border-[#E7EEFF] bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E7EEFF] font-inter text-sm font-semibold text-primary">
                {index + 1}
              </span>

              <h3 className="font-inter text-[1.125rem] font-bold leading-7 tracking-normal text-[#111C2C]">
                {question.question}
              </h3>
            </div>

            <p className="shrink-0 whitespace-nowrap font-inter text-sm font-semibold">
              Grade:{' '}
              <span className={isFullGrade ? 'text-primary' : 'text-[#DC2626]'}>
                {question.answer.grade_awarded ?? 0}
              </span>{' '}
              / {question.grade}
            </p>
          </div>

          {isText ? (
            <div className="w-full rounded-[8px] border border-[#BEC8CA] bg-[#F0F3FF] p-6">
              <p className="font-inter text-base font-normal leading-[26px] tracking-normal text-[#3E494A]">
                {question.answer.text_answer || 'No answer submitted.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {question.options.map((option) => {
                const selected = selectedOptionIds.includes(option.id);

                const isStudentCorrect = selected && option.is_correct;

                const isStudentWrong = selected && !option.is_correct;

                const isCorrectAnswer = option.is_correct && !selected;

                const isNormalOption = !selected && !option.is_correct;

                return (
                  <div
                    key={option.id}
                    className={`flex min-h-[52px] items-center justify-between rounded-lg px-5 py-4 ${
                      isStudentCorrect
                        ? 'border border-[#9ED8C2] bg-[#F3FCF7]'
                        : isStudentWrong
                          ? 'border border-[#F4B4B4] bg-[#FFF5F5]'
                          : isCorrectAnswer
                            ? 'border border-[#9ED8C2] bg-[#F3FCF7]'
                            : 'border border-[#E7EEFF] bg-white'
                    }`}
                  >
                    <span
                      className={`font-inter text-[15px] font-medium ${
                        isNormalOption ? 'text-[#6F797A]' : 'text-[#111C2C]'
                      }`}
                    >
                      {option.option_text}
                    </span>

                    <div className="flex items-center gap-2">
                      {isStudentCorrect && (
                        <>
                          <span className="font-inter text-xs font-semibold text-primary">
                            Your Answer (Correct Answer)
                          </span>

                          <CheckCircle2
                            size={20}
                            fill="#006D77"
                            className="text-white"
                          />
                        </>
                      )}

                      {isCorrectAnswer && (
                        <>
                          <span className="font-inter text-xs font-semibold text-[#15803D]">
                            Correct Answer
                          </span>

                          <CheckCircle2 size={20} className="text-[#16A34A]" />
                        </>
                      )}

                      {isStudentWrong && (
                        <>
                          <span className="font-inter text-xs font-semibold text-[#DC2626]">
                            Your Answer
                          </span>

                          <XCircle
                            size={18}
                            fill="#DC2626"
                            className="text-white"
                          />
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {question.answer.teacher_feedback && (
            <div className="mt-5 flex w-full items-start gap-3 rounded-[8px] bg-[#E7EEFF] p-4">
              <Info size={20} className="mt-0.5 shrink-0 text-primary" />

              <div>
                <p className="pt-1 font-inter text-xs font-bold leading-4 tracking-normal text-[#00535B]">
                  {`${capitalize(
                    assignmentDetails.teacher.first_name
                  )} ${capitalize(
                    assignmentDetails.teacher.last_name
                  )}'s Feedback`}
                </p>

                <p className="mt-2 font-inter text-base font-normal leading-[26px] text-[#3E494A]">
                  {question.answer.teacher_feedback}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
