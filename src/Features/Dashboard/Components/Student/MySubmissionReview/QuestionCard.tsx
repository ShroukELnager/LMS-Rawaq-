import { SubmissionReviewDetailsResponse } from '@/Features/Dashboard/Types';
import { UseQueryResult } from '@tanstack/react-query';
import { CheckCircle2, XCircle } from 'lucide-react';
import Info from '@/assets/icons/Info (2).svg';
import QuestionCardSkeleton from './QuestionCardSkeleton';
export type QuestionReviewProps = {
  data: UseQueryResult<SubmissionReviewDetailsResponse, Error>;
  index: number;
};

export default function QuestionCard({ data, index }: QuestionReviewProps) {
  const assignmentDetails = data.data;

  const question = assignmentDetails?.questions[index];

  if (!question || !assignmentDetails) return null;

  const isText = question.question_type === 'text';

  const selectedOptionIds = question.answer.selected_option_ids ?? [];

  const isFullGrade = (question.answer.grade_awarded ?? 0) === question.grade;
const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

if (data.isLoading) {
  return <QuestionCardSkeleton />;
}

if (!question || !assignmentDetails) {
  return null;
}
  return (
    <>
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
        {/* Header */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8F3F5] text-xs font-semibold text-primary">
              {index + 1}
            </span>

            <h3 className="font-inter text-[ 1.125rem] font-bold leading-7 tracking-normal text-[#111C2C]">
              {question.question}
            </h3>
          </div>

          <p className="font-inter text-sm font-semibold whitespace-nowrap">
            Grade:{' '}
            <span className={isFullGrade ? 'text-primary' : 'text-[#DC2626]'}>
              {question.answer.grade_awarded ?? 0}
            </span>{' '}
            / {question.grade}
          </p>
        </div>

        {/* Answer */}
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
                    className={`font-inter  text-[15px] font-medium ${
                      isNormalOption ? 'text-[#6F797A]' : 'text-[#111C2C]'
                    }`}
                  >
                    {option.option_text}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* Student correct answer */}
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

                    {/* Correct answer */}
                    {isCorrectAnswer && (
                      <>
                        <span className="font-inter text-xs font-semibold text-[#15803D]">
                          Correct Answer
                        </span>

                        <CheckCircle2 size={20} className="text-[#16A34A]" />
                      </>
                    )}

                    {/* Wrong student answer */}
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

        {/* Feedback */}
        {question.answer.teacher_feedback && (
          <div className="mt-5 flex w-full items-start gap-3 rounded-[8px] bg-[#E7EEFF] p-4">
            <Info size={20} className="mt-0.5 shrink-0 text-primary" />

            <div>
              <p className="font-inter  pt-1  text-xs font-bold leading-4 tracking-normal text-[#00535B]">
                {`${capitalize(assignmentDetails.teacher.first_name)} ${capitalize(
                  assignmentDetails.teacher.last_name
                )}'s Feedback`}{' '}
              </p>

              <p className="mt-2 font-inter text-base font-normal leading-[26px] text-[#3E494A]">
                {question.answer.teacher_feedback}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
