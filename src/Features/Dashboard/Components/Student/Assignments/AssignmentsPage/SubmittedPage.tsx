'use client';

import { AssignmentDetails, AssignmentSubmission, AssignmentSubmissionRequestBody, Question } from '@/Features/Dashboard/Types';
import { Check } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useFormContext } from 'react-hook-form';
import Success from '@/assets/icons/success.svg'
type Props = {
  submissionDate: Date ;
  questions: Question[];
};

export default function SubmittedPage({ submissionDate, questions }: Props) {
  const { watch } = useFormContext<AssignmentSubmissionRequestBody>();
  const router = useRouter();
  const answers = watch('p_answers');

const submittedDate = submissionDate.toLocaleString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
});
  const totalQuestions = questions?.length ?? 0;

  return (
    <div className="min-h-screen bg-[#F8F9FF] flex items-center justify-center px-5">
      <div className="flex w-full max-w-3xl flex-col items-center text-center">
    <div className="relative mt-8">
  {/* Excellent work badge */}
  <div className="absolute -right-3 -top-4 z-10 flex items-center gap-1 rounded-full bg-[#E6E3D0] px-4 py-2 text-xs font-medium text-[#6B6B45]">
    <Success />
    Excellent work
  </div>

  {/* Card */}
  <div className="flex h-[250px] w-[258px] flex-col items-center rounded-[30px] border border-[#E5EAF5] bg-white pt-[37px] shadow-[0_15px_40px_rgba(15,23,42,0.12)]">
    {/* Check Circle */}
    <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#007C83] shadow-lg">
      <Check
        size={34}
        strokeWidth={3}
        className="text-white"
        color="#9BECF7"
      />
    </div>

    {/* Image */}
    <div className="mt-[18px] h-[83px] w-[152px] overflow-hidden">
      <Image
        src="/images/submitImg.png"
        alt="submitted"
        width={152}
        height={83}
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
          <span className="flex items-center gap-1">
            STATUS:
            <p className="text-gray-700">COMPLETED</p>
          </span>

          <span className="h-4 w-px bg-gray-300" />

          <span>
            Total questions answered:{' '}
            <strong className="text-[#005F63]">
              {answers?.length}/{totalQuestions}
            </strong>
          </span>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={() => router.back()}
            className="rounded-xl bg-[#005F63] cursor-pointer px-8 py-3 text-sm font-medium text-white transition hover:bg-[#00494C]"
          >
            Back to Group
          </button>

          <button className="rounded-xl cursor-pointer border border-[#005F63] px-8 py-3 text-sm font-medium text-[#005F63] transition bg-[#F3F2F1]">
            View My Submission
          </button>
        </div>
      </div>
    </div>
  );
}
