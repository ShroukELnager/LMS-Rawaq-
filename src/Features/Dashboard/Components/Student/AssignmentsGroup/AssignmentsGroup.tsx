'use client';

import useStudentGroupAssignments from '@/Features/Dashboard/Hooks/useStudentGroupAssignments';
import { format } from 'date-fns';
import Eye2 from '@/assets/icons/Eye2.svg';
import Upload from '@/assets/icons/Upload.svg';
import DateIcon from '@/assets/icons/date.svg';
import CalendarDays from '@/assets/icons/CalendarDays.svg';
import Star from '@/assets/icons/Star.svg';
import { AssignmentsSkeleton } from './AssignmentsSkeleton';
import ErrorState from '@/Features/Dashboard/Errors/ErrorToLoadPage';
import EmptyAssignments from './EmptyAssignments';
import { useRouter } from 'next/navigation';

export default function StudentAssignmentsGroup({
  groupId,
}: {
  groupId: string;
}) {
  const { data, isLoading, refetch, isError, error } =
    useStudentGroupAssignments(groupId);

  const router = useRouter();

  if (isLoading) {
    return (
      <>
        <div className="mb-6">
          <h1 className="font-inter text-2xl font-bold text-[#101828]">
            Assignments
          </h1>

          <p className="mt-2 font-inter text-base font-normal leading-6 text-[#3E494A]">
            Track your assignments and submission progress across your enrolled
            study groups.
          </p>
        </div>

        <AssignmentsSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <ErrorState
        message={error?.message || 'Failed to load Assignments'}
        onRetry={() => refetch()}
      />
    );
  }

  if (data?.length === 0) {
    return <EmptyAssignments />;
  }

  const assignments = data ?? [];

  const statusConfig = {
    not_submitted: {
      border: 'border-t-[#E6E3D0]',
      badge: 'bg-[#E6E3D0] text-[#666556]',
      btn: 'Submit Assignment',
      btnIcon: Upload,
    },
    submitted: {
      border: 'border-t-[#D8E3FA]',
      badge: 'bg-[#DEE8FF] text-[#1C666F]',
      btn: 'View Submission',
      btnIcon: Eye2,
    },
    reviewed: {
      border: 'border-t-[#FFDF96]',
      badge: 'bg-[#FFDF96] text-[#5A4400]',
      btn: 'View Review',
      btnIcon: CalendarDays,
    },
  };

  return (
    <>
      <div className="mb-6">
        <h1 className="font-inter text-2xl font-bold text-[#101828]">
          Assignments
        </h1>

        <p className="mt-2 font-inter text-base font-normal leading-6 tracking-normal text-[#3E494A]">
          Track your assignments and submission progress across your enrolled
          study groups.
        </p>
      </div>

      <div className="grid min-w-0 grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
        {assignments.map((assignment) => {
          const config = statusConfig[assignment.status];
          const Icon = config.btnIcon;

          const isOverdue =
            assignment.status === 'not_submitted' &&
            new Date(assignment.deadline) < new Date();

          return (
            <div
              key={assignment.id}
              className={`flex min-w-0 w-full flex-col rounded-xl border border-slate-200 border-t-[7px] ${config.border} bg-white p-5 shadow-sm transition hover:shadow-md`}
            >
              <div className="mb-4 flex min-w-0 items-center justify-between gap-3">
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium capitalize ${config.badge}`}
                >
                  {assignment.status.replace('_', ' ')}
                </span>

                {assignment.status === 'reviewed' && (
                  <span className="shrink-0 whitespace-nowrap font-inter text-xs font-medium leading-5 tracking-[0.14px] text-[#5E4700]">
                    {assignment.total_grade_awarded} / {assignment.total_grade}
                  </span>
                )}

                {assignment.status === 'not_submitted' && (
                  <span className="flex shrink-0 items-center gap-1 whitespace-nowrap font-inter text-xs font-medium leading-5 tracking-[0.14px] text-[#5E4700]">
                    <Star className="h-4 w-4 text-[#F5B800]" />
                    {assignment.total_grade} Pts
                  </span>
                )}
              </div>

              <h3 className="mb-3 line-clamp-2 min-w-0 text-lg font-bold leading-7 text-[#101828] md:text-xl">
                {assignment.title}
              </h3>
              <div className="mb-4 hidden min-w-0 md:block">
                <p className="line-clamp-2 font-inter text-base font-normal leading-6 text-[#6F797A]">
                  {assignment.description || ' '}
                </p>
              </div>

              <div className="mb-4 flex min-h-[68px] flex-col justify-start">
                {assignment.status === 'submitted' && (
                  <div className="flex min-h-[68px] items-center gap-3 rounded-lg bg-slate-50 p-3">
                    <DateIcon size={18} className="shrink-0 text-red-500" />

                    <div className="min-w-0">
                      <p className="font-inter text-xs font-semibold uppercase leading-4 tracking-[-0.3px] text-[#6F797A]">
                        Submitted On
                      </p>

                      <p className="whitespace-nowrap text-sm font-medium text-[#101828]">
                        {format(
                          new Date(assignment.submitted_at!),
                          'MMM dd, yyyy'
                        )}
                      </p>
                    </div>
                  </div>
                )}

                {assignment.status === 'not_submitted' && (
                  <div className="flex min-h-[68px] items-center gap-3 rounded-lg bg-slate-50 p-3">
                    <DateIcon size={18} className="shrink-0 text-red-500" />

                    <div className="min-w-0">
                      <p className="font-inter text-xs font-semibold uppercase leading-4 tracking-[-0.3px] text-[#6F797A]">
                        Deadline
                      </p>

                      <div className="flex min-w-0 flex-wrap items-center gap-2">
                        <p className="whitespace-nowrap text-sm font-medium text-[#101828]">
                          {format(
                            new Date(assignment.deadline),
                            'MMM dd, yyyy'
                          )}
                        </p>

                        {isOverdue && (
                          <span className="whitespace-nowrap rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                            Overdue
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() =>
                  router.push(
                    `/group/${groupId}/assignments/${assignment.id}/my-submission`
                  )
                }
                className={`mt-auto flex h-11 min-h-11 w-full min-w-0 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary px-3 text-center font-inter text-sm font-medium leading-5 transition ${
                  assignment.status === 'not_submitted'
                    ? 'bg-primary text-white hover:opacity-90'
                    : 'bg-white text-primary hover:bg-slate-50'
                }`}
              >
                <span className="truncate">{config.btn}</span>

                <Icon
                  size={16}
                  className={
                    assignment.status === 'not_submitted'
                      ? 'shrink-0 text-white'
                      : 'shrink-0 text-primary'
                  }
                />
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
}
