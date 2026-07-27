'use client';

import { AssignmentDetails } from '@/Features/Dashboard/Types';
import { AlertTriangle, ArrowLeft, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  assignmentDetails: AssignmentDetails;

};
export default function LateSubmissionPage({ assignmentDetails }:Props) {
  const router = useRouter();

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-[#F8FAFC] px-6">
      <div className="grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-sm rounded-3xl bg-white p-12 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FFE7E3]">
              <AlertTriangle
                size={42}
                strokeWidth={2}
                className="text-[#C52828]"
              />
            </div>

            <div className="mt-8 flex justify-center">
              <span className="rounded-full bg-[#FFE2DE] px-5 py-2 text-xs font-bold uppercase tracking-wide text-[#C52828]">
                Deadline Passed
              </span>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[4px] text-gray-400">
            Assignment Status
          </p>

          <h1 className="mt-3 text-5xl font-bold leading-tight text-[#045D6C]">
            Deadline Expired
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-8 text-[#4B5563]">
            The deadline for this assignment passed on{' '}
            {new Date(assignmentDetails.deadline).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
            . You can no longer start or submit answers.
          </p>
          <div className="mt-8 flex max-w-lg items-start gap-3 rounded-2xl border border-[#D8E3F0] bg-[#F8FBFF] p-5">
            <Info size={20} className="mt-0.5 shrink-0 text-[#045D6C]" />

            <p className="text-sm leading-6 text-gray-600">
              If you believe this is an error, please contact your mentor.
            </p>
          </div>

          <button
            onClick={() => router.back()}
            className="mt-8 flex cursor-pointer items-center gap-2 rounded-xl bg-[#045D6C] px-8 py-4 text-sm font-medium text-white transition hover:bg-[#034A56]"
          >
            <ArrowLeft size={18} />
            Back to Assignments
          </button>
        </div>
      </div>
    </div>
  );
}
