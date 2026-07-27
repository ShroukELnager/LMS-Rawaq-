import { AssignmentDetails } from '@/Features/Dashboard/Types';
import StatCard from '../../StatAssignmentCart';
import { CalendarDays, CircleAlert, FileText, Send, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

type Props = {
  assignmentDetails: AssignmentDetails;
  groupId: string;
  assignmentId:string
};

export default function NotSubmittedPage({ assignmentDetails, groupId, assignmentId }: Props) {
  const router = useRouter();
  if (!assignmentDetails) return null;
console.log('deadline', assignmentDetails.deadline);

//   type AssignmentStatus = 'Submitted' | 'Reviewed' | 'Not Submitted' | 'Late';
// console.log('deadline', assignmentDetails.deadline);
//   const status: AssignmentStatus =
//     assignmentDetails.submission.status === 'graded'
//       ? 'Reviewed'
//       : assignmentDetails.submission.status === 'submitted'
//         ? 'Submitted'
//         : assignmentDetails.submission.status === 'is_late'
//           ? 'Late'
//           : 'Not Submitted';

//   const statusStyles: Record<
//     AssignmentStatus,
//     {
//       badge: string;
//     }
//   > = {
//     Submitted: {
//       badge: 'bg-[#006D77] text-white',
//     },

//     'Not Submitted': {
//       badge: 'bg-red-100 text-red-600',
//     },

//     Reviewed: {
//       badge: 'bg-blue-100 text-blue-700',
//     },

//     Late: {
//       badge: 'bg-orange-100 text-orange-700',
//     },
//   };

//   const currentStyle = statusStyles[status];
  return (
    <>
      <div className="hidden lg:block">
        <div className="mx-auto max-w-7xl space-y-4 p-8">
          {/* Status Badge */}
          <div className="flex">
            {/* <span
              className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-4
        py-2
        text-xs
        font-semibold
        ${currentStyle.badge}
      `}
            >
              <span className="size-2 rounded-full bg-current" />
              {status}
            </span> */}
          </div>

          {/* Assignment Card */}
          <div className="rounded-3xl bg-white p-10 shadow-xl">
            <h1 className="text-4xl font-bold text-[#045D6C]">
              {assignmentDetails.title}
            </h1>

            <p className="mt-6 max-w-3xl text-gray-600">
              {assignmentDetails.description}
            </p>

            <div className="mt-10 grid grid-cols-3 gap-5">
              <StatCard
                icon={<Star size={18} />}
                title="Total Grade"
                value={assignmentDetails.total_grade}
              />

              <StatCard
                icon={<FileText size={18} />}
                title="Questions"
                value={assignmentDetails.questions.length}
              />

              <StatCard
                icon={<CalendarDays size={18} />}
                title="Deadline"
                value={new Date(assignmentDetails.deadline).toLocaleDateString(
                  'en-US',
                  {
                    month: 'short',
                    day: 'numeric',
                  }
                )}
              />
            </div>

            {assignmentDetails.deadline && (
              <p className="mt-6 text-sm text-gray-500">
                Submitted on{' '}
                {new Date(assignmentDetails.deadline).toLocaleString()}
              </p>
            )}

            <div className="mt-8 flex gap-4  pt-6">
              <button
                onClick={() =>
                  router.push(`/group/${groupId}/assignments/${assignmentId}`)
                }
                className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#006D77] px-8 py-3 font-medium text-white transition hover:bg-[#00545c]"
              >
                <Send size={18} />
                <span>Start Assignment</span>
              </button>

              <button
                onClick={() => router.back()}
                className="rounded-xl border cursor-pointer border-[#006D77] px-8 py-3 font-medium text-[#006D77] transition hover:bg-[#006D77] hover:text-white"
              >
                Back to Assignments
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden min-h-screen bg-[#F8FAFC] p-4">
        <div className="rounded-3xl bg-white p-5 shadow-sm">
          <h1 className="text-3xl font-bold leading-tight text-[#101828]">
            {assignmentDetails.title}
          </h1>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <StatCard
              icon={<Star size={18} />}
              title="Grade"
              value={`${assignmentDetails.total_grade} pts`}
            />

            <StatCard
              icon={<FileText size={18} />}
              title="Questions"
              value={assignmentDetails.questions.length}
            />
          </div>

          <div className="relative mt-4 rounded-2xl bg-[#EAF0FF] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
              Due Date
            </p>

            <p className="mt-1 font-medium text-[#101828]">
              {new Date(assignmentDetails.deadline).toLocaleDateString(
                'en-US',
                {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                }
              )}
            </p>

           {/* <span
              className={`
          absolute
          right-4
          top-4
          rounded-full
          px-3
          py-1
          text-[10px]
          font-bold
          ${currentStyle.badge}
        `}
            >
              {status}
            </span>  */}
          </div>

          <div className="mt-10 flex flex-col items-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
              <CircleAlert className="size-12 text-red-600" />
            </div>

            <h2 className="mt-5 max-w-xs text-center text-2xl font-bold text-red-600">
              Open desktop screen to answer the assignment
            </h2>
          </div>

          <button
            onClick={() => router.back()}
            className="mt-10 cursor-pointer w-full rounded-xl border border-[#006D77] py-3 font-medium text-[#006D77]"
          >
            Back to Assignments
          </button>
        </div>
      </div>
    </>
  );
}
