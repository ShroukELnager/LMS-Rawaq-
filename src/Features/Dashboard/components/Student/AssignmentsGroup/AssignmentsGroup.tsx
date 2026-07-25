import useStudentGroupAssignments from '@/Features/Dashboard/Hooks/useStudentGroupAssignments';
import { format } from 'date-fns';
import CalendarDays from '@/assets/icons/CalendarDays.svg'
import Eye2 from '@/assets/icons/Eye2.svg';
import Upload from '@/assets/icons/Upload.svg';
import DateIcon from '@/assets/icons/date.svg'
import Check from '@/assets/icons/CalendarDays.svg'
import Star from '@/assets/icons/Star.svg';
import { AssignmentsSkeleton } from './AssignmentsSkeleton';
import { AssignmentsHeaderSkeleton } from './AssignmentsHeaderSkeleton';
import ErrorState from '@/Features/Dashboard/Errors/ErrorToLoadPage';
import EmptyAssignments from './EmptyAssignments';
export default function StudentAssignmentsGroup({
  groupId,
}: {
  groupId: string;
}) {
  const { data, isLoading,refetch,isError,error } = useStudentGroupAssignments(groupId);
console.log(data);
if (isLoading) {
  return (
    <div className="space-y-6">
      <AssignmentsHeaderSkeleton />
      <AssignmentsSkeleton />
    </div>
  );
}
if(isError){
    return <ErrorState
                  message={error?.message || 'Failed to load Assignments'}
                  onRetry={() => refetch()}
                />
}
if(data?.length === 0){
    return (<EmptyAssignments/>)
}
  const assignments = data?? [];

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
  <div className="space-y-6">
    <div className="flex flex-col gap-3">
      <h2 className="font-inter text-[32px] font-semibold leading-[40px] tracking-[-0.32px] text-[#111C2C]">
        Group Assignments
      </h2>

      <p className="font-inter text-base font-normal leading-6 tracking-normal text-[#3E494A]">
        Track your assignments and submission progress across your enrolled
        study groups.
      </p>
    </div>

    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {assignments.map((assignment) => {
        const config = statusConfig[assignment.status];
        const Icon = config.btnIcon;

        return (
          <div
            key={assignment.id}
            className={`flex h-[360px] flex-col rounded-xl border border-slate-200 border-t-[7px] ${config.border} bg-white p-5 shadow-sm transition hover:shadow-md`}
          >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${config.badge}`}
              >
                {assignment.status.replace('_', ' ')}
              </span>

              {assignment.status === 'reviewed' && (
                <span className="font-inter text-xs font-medium leading-5 tracking-[0.14px] text-[#5E4700]">
                  {assignment.total_grade_awarded} / {assignment.total_grade}
                </span>
              )}

              {assignment.status === 'submitted' && (
                <span className="font-inter text-xs font-medium leading-5 tracking-[0.14px] text-[#5E4700]">
                  Waiting for review
                </span>
              )}

              {assignment.status === 'not_submitted' && (
                <span className="font-inter text-xs font-medium leading-5 tracking-[0.14px] text-[#5E4700]">
                  Not graded
                </span>
              )}
            </div>

            {/* Title */}
            <h3 className="mb-3 line-clamp-2 min-h-[56px] text-xl font-bold">
              {assignment.title}
            </h3>

            {/* Description */}
            <div className="mb-4 h-[76px] overflow-hidden">
              <p className="font-inter text-base font-normal leading-6 tracking-normal text-[#6F797A]">
                {assignment.description || ' '}
              </p>
            </div>

            <div className="mb-4 h-[68px]">
              {assignment.status !== 'reviewed' && (
                <div className="flex h-full items-center gap-3 rounded-lg bg-slate-50 p-3">
                  <DateIcon size={18} className="text-red-500" />

                  <div>
                    <p className="font-inter text-xs font-semibold uppercase leading-4 tracking-[-0.3px] text-[#6F797A]">
                      {assignment.status === 'submitted'
                        ? 'Submitted On'
                        : 'Deadline'}
                    </p>

                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">
                        {format(
                          new Date(
                            assignment.status === 'submitted'
                              ? assignment.submitted_at!
                              : assignment.deadline
                          ),
                          'MMM dd, yyyy'
                        )}
                      </p>

                      {assignment.status === 'not_submitted' &&
                        new Date(assignment.deadline) < new Date() && (
                          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                            Overdue
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Button */}
            <button
              className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-primary py-2.5 text-sm font-medium transition ${
                assignment.status === 'not_submitted'
                  ? 'bg-primary text-white hover:opacity-90'
                  : 'bg-white text-primary hover:bg-slate-50'
              }`}
            >
              {config.btn}

              <Icon
                size={16}
                className={
                  assignment.status === 'not_submitted'
                    ? 'text-white'
                    : 'text-primary'
                }
              />
            </button>
          </div>
        );
      })}
    </div>
  </div>
);
}
