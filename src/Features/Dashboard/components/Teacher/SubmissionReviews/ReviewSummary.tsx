'use client';

import { AnswerGrade, GradeSubmissionRequest } from "@/Features/Dashboard/Types";
import { useFormContext } from "react-hook-form";



type SummaryReviewProps = {
  totalQuestions: number;
  totalGrade:number
  onPublish: () => void;
  isPending: boolean;
};

export default function SummaryReview({
  totalQuestions,
  totalGrade,
  onPublish,
  isPending,
}: SummaryReviewProps) {
  const { watch } = useFormContext();

  const answers = watch('p_answers');

  const totalAwardedGrade = answers.reduce(
    (total: number, answer: AnswerGrade) => total + (answer.grade_awarded || 0),
    0
  );

  const reviewedQuestionsCount = answers.filter(
    (answer: AnswerGrade) => answer.grade_awarded > 0
  ).length;

  const progress = (reviewedQuestionsCount / totalQuestions) * 100;
  const remaining = totalQuestions - reviewedQuestionsCount;

  return (
    <div className="w-full rounded-3xl  p-6  bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
      {/* Assignment Progress */}
      <h3 className="align-middle font-inter text-[14px] font-bold uppercase leading-[20px] tracking-[0.14px] text-[#3E494A]">
        Assignment Progress
      </h3>

      <div className="mt-6 flex items-center justify-between">
        <span className="align-middle font-inter text-[12px] font-semibold leading-[16px] tracking-[0px] text-[#111C2C]">
          Questions Reviewed
        </span>
        <span className="align-middle font-inter text-[12px] font-bold leading-[16px] tracking-[0px] text-[#005F6B]">
          {reviewedQuestionsCount} / {totalQuestions}
        </span>
      </div>

      {/* Progress */}
      <div className="mt-3 h-3 w-[341.33px] overflow-hidden rounded-full bg-[#E6E3D0]">
        <div
          className="h-full rounded-full bg-[#005F6B] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-3 align-middle font-inter text-[12px] font-semibold italic leading-[16px] tracking-[0px] text-[#3E494A]">
        {remaining} {remaining === 1 ? 'question' : 'questions'} remaining
      </p>

      <hr className="my-8 border-[#D9D9D9]" />

      {/* Grade */}
      <h3 className="font-inter text-[14px] font-bold uppercase leading-[20px] tracking-[0.14px] align-middle text-[#3E494A]">
        Total Awarded Grade
      </h3>

      <div className="mt-5 flex items-end gap-2">
        <span className="font-inter text-[36px] font-bold leading-[40px] tracking-[0px] align-middle text-[#005F6B]">
          {totalAwardedGrade}
        </span>

        <span className="pb-1 align-middle font-inter text-[24px] font-semibold leading-[32px] tracking-[0px] text-[#3E494A]">
          / {totalGrade}
        </span>
      </div>

      {/* Status */}
      <div className="mt-10 flex items-center justify-between">
        <span className="align-middle font-inter text-[14px] font-medium leading-[20px] tracking-[0.14px] text-[#3E494A]">
          Status:
        </span>{' '}
      </div>

      <hr className="mt-3 border-[#D9D9D9]" />

      {/* Button */}
      <button
        type="button"
        onClick={onPublish}
        disabled={isPending}
        className="mt-6 h-12 w-full rounded-xl bg-[#005F6B] font-inter text-[16px] font-bold leading-6 tracking-[0px] text-center text-white transition hover:bg-[#004D57] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? 'Publishing...' : 'Publish Review'}
      </button>
    </div>
  );
}
