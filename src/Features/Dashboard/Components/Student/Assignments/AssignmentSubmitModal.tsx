'use client';

import { AssignmentSubmissionRequestBody } from '@/Features/Dashboard/Types';
import { useFormContext } from 'react-hook-form';
import HeaderIcon from '@/assets/icons/ModelSubmitHeader.svg'
type Props = {
  open: boolean;
  onClose: () => void;
  totalQuestions: number;
  onSubmit: (data: AssignmentSubmissionRequestBody) => void;
};

export default function AssignmentSubmitModal({
  open,
  onClose,
  totalQuestions,
  onSubmit,
}: Props)
 {
  
  const { watch, handleSubmit } =
    useFormContext<AssignmentSubmissionRequestBody>();

  const answers = watch('p_answers');

  const answeredQuestions =
    answers?.filter(
      (answer) =>
        (answer.selected_option_ids && answer.selected_option_ids.length > 0) ||
        (answer.text_answer && answer.text_answer.trim().length > 0)
    ).length ?? 0;

  const progress =
    totalQuestions === 0
      ? 0
      : Math.round((answeredQuestions / totalQuestions) * 100);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="relative bg-[#006D77] pb-14 pt-6">
          <div className="absolute left-1/2 top-full flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg">
            <HeaderIcon size={24} />
          </div>
        </div>

        <div className="px-7 pb-8 pt-12">
          <h2 className="text-center text-3xl font-bold text-[#101828]">
            Submit Assignment?
          </h2>

          <p className="mt-4 text-center text-[#667085]">
            Are you sure you want to submit your assignment?
            <br />
            You won't be able to edit your answers after submission.
          </p>

          <div className="mt-8">
            <div className="mb-2 flex justify-between text-xs font-semibold uppercase tracking-wider text-[#667085]">
              <span>Completion Progress</span>

              <span className="text-[#006D77]">{progress}% Complete</span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-[#E4E7EC]">
              <div
                className="h-full rounded-full bg-[#D6A800] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              className="w-full cursor-pointer rounded-xl bg-[#006D77] py-3 font-semibold text-white transition hover:bg-[#00525B]"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full cursor-pointer rounded-xl border border-[#006D77] py-3 font-semibold text-[#006D77]"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
