'use client';

import { AssignmentDetails } from '@/Features/Dashboard/Types';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  assignmentDetails: AssignmentDetails;

};

export default function SubmittedPage({ assignmentDetails }: Props) {
  const router = useRouter();

  const submittedDate = assignmentDetails.submission.submitted_at
    ? new Date(assignmentDetails.submission.submitted_at).toLocaleString(
        'en-US',
        {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }
      )
    : '--';

  const totalQuestions = assignmentDetails.questions?.length ?? 0;

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center px-5">
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
        <div className="relative mt-8">
          <div className="absolute -right-3 -top-4 rounded-full bg-[#E6E3D0] px-4 py-1 text-xs font-medium text-[#6B6B45]">
            Excellent work
          </div>

          <div className="flex h-[200px] w-[200px] flex-col items-center rounded-[30px] border border-[#E5EAF5] bg-white pt-8 shadow-[0_15px_40px_rgba(15,23,42,0.12)]">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#007C83] shadow-lg">
              <Check
                size={34}
                strokeWidth={3}
                className="text-white "
                color="#9BECF7"
              />
            </div>

            <div className="mt-6 h-[65px] w-[120px] overflow-hidden">
              <img
                src="/images/submitImg.png"
                alt="submitted"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <h1 className="mt-10 text-4xl font-bold text-[#005F63]">
          Assignment submitted successfully.
        </h1>

        <p className="mt-5 text-sm text-gray-600">
          Submission Date:{' '}
          <span className="font-medium text-gray-700">{submittedDate}</span>
        </p>

        <div className="mt-3 flex items-center gap-4 rounded-lg bg-[#EEF4FF] px-5 py-2 text-xs text-gray-600">
          <span>
            STATUS: <p className="text-gray-700">COMPLETED</p>
          </span>

          <span className="h-4 w-px bg-gray-300" />

          <span>
            Total questions answered:{' '}
            <strong className="text-[#005F63]">
              {totalQuestions}/{totalQuestions}
            </strong>
          </span>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.back}
            className="rounded-xl bg-[#005F63] px-8 py-3 text-sm font-medium text-white transition hover:bg-[#00494C]"
          >
            Back to Group
          </button>

          <button className="rounded-xl border border-[#005F63] px-8 py-3 text-sm font-medium text-[#005F63] transition bg-[#F3F2F1]">
            View My Submission
          </button>
        </div>
      </div>
    </div>
  );
}
