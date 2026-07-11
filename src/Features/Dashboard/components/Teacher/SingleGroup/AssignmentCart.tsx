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
      <div className="space-y-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-44 animate-pulse rounded-2xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  if (!assignments?.length) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white">
        <div className="flex max-w-sm flex-col items-center text-center">
          <div className="mb-5 rounded-full bg-[#EEF8FA] p-5">
            <ClipboardList className="size-10 text-[#006D77]" />
          </div>

          <h3 className="text-xl font-semibold text-[#101828]">
            No Assignments Yet
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#667085]">
            There are no assignments available for this group yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
    {assignments.map((assignment) => {
        const progress = assignment.reviewed
          ? 100
          : assignment.submitted
            ? 60
            : 0;

        const status = assignment.reviewed
          ? 'Reviewed'
          : assignment.submitted
            ? 'Submitted'
            : 'Not Submitted';

        return (
          <div
            key={assignment.id}
            className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <span className="rounded-full bg-[#006D77] px-3 py-1 text-xs font-semibold text-white">
                {status}
              </span>

              <FileText className="text-gray-400" size={20} />
            </div>

            {/* Title */}
            <h3 className="mt-4 text-xl font-semibold text-[#101828]">
              {assignment.title}
            </h3>

            {/* Description */}
            <p className="mt-2 line-clamp-2 text-sm text-[#667085]">
              {assignment.description}
            </p>

            {/* Deadline */}
            <div className="mt-5 flex items-center justify-between text-sm">
              <span className="text-[#667085]">Deadline</span>

              <span className="font-medium text-[#101828]">
                {new Date(assignment.deadline).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>

            {/* Grade */}
            <div className="mt-3 flex items-center justify-between text-sm">
              <span className="text-[#667085]">Total Grade</span>

              <span className="font-semibold text-[#006D77]">
                {assignment.total_grade} pts
              </span>
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-[#667085]">Progress</span>

                <span className="font-medium text-[#101828]">{progress}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
                <div
                  className="h-full rounded-full bg-[#E3BE54] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
