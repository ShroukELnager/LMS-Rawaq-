'use client';

import { ClipboardList, FileText } from 'lucide-react';

import useGetAssignments from '@/Features/Dashboard/Hooks/useGetAssignments';

type AssignmentCardProps = {
  groupId: string;
};

export default function AssignmentCard({ groupId }: AssignmentCardProps) {
  const { data: assignments, isPending } = useGetAssignments(groupId);

  if (isPending) {
    return (
      <div className="grid gap-5 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[220px] animate-pulse rounded-2xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (!assignments?.length) {
    return (
      <div className="flex min-h-[280px] items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white">
        <div className="flex max-w-sm flex-col items-center text-center">
          <div className="mb-4 rounded-full bg-[#EEF8FA] p-4">
            <ClipboardList className="size-8 text-[#006D77]" />
          </div>

          <h3 className="text-lg font-semibold text-[#101828]">
            No Assignments Yet
          </h3>

          <p className="mt-2 text-sm text-[#667085]">
            There are no assignments available for this group yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      {assignments.map((assignment) => {
        const progress = assignment.reviewed
          ? 100
          : assignment.submitted
            ? 60
            : 0;

        const status = assignment.reviewed
          ? 'REVIEWED'
          : assignment.submitted
            ? 'SUBMITTED'
            : 'ACTIVE';

        return (
          <div
            key={assignment.id}
            className="
              w-full
              rounded-2xl
              border
              border-[#D0D5DD]
              bg-[#FCFCFF]
              p-6
              transition
              hover:shadow-md
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <span
                className="
                  rounded-md
                  bg-[#007C83]
                  px-3
                  py-1.5
                  text-xs
                  font-semibold
                  tracking-wide
                  text-[#D9F8FF]
                "
              >
                {status}
              </span>

              <FileText size={24} strokeWidth={2} className="text-[#475467]" />
            </div>

            {/* Title */}
            <h2
              className="
                mt-5
                break-words
                text-xl
                font-semibold
                leading-7
                text-[#101828]
              "
            >
              {assignment.title}
            </h2>

            {/* Deadline */}
            <p
              className="
                mt-3
                text-sm
                font-medium
                text-[#475467]
              "
            >
              <span className="font-semibold">Due:</span>{' '}
              {new Date(assignment.deadline).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>

            {/* Progress */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between gap-4">
                <span
                  className="
                    text-sm
                    font-medium
                    text-[#475467]
                  "
                >
                  Submission Progress
                </span>

                <span
                  className="
                    whitespace-nowrap
                    text-base
                    font-bold
                    text-[#006D77]
                  "
                >
                  {progress}/{assignment.total_grade}
                </span>
              </div>

              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#E9E4D2]">
                <div
                  className="
                    h-full
                    rounded-full
                    bg-[#E3BE54]
                    transition-all
                    duration-300
                  "
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
