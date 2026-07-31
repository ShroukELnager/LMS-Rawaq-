import { useRouter } from 'next/navigation';
import ErrorState from '../../Errors/ErrorToLoadPage';
import useGetGroupAssignments from '../../Hooks/useGEtAllGroupsAssignments';
import AssignmentCardSkeleton from '../../Skeleton/Teacher/AssignmentCardSkeleton';
import { GroupAssignmentsResponse } from '../../Types';
import {
  CalendarDays,
  Star,
  SquareArrowOutUpRight,
  ArrowRight,
  Plus,
} from 'lucide-react';
type Props={
  groupId: string;
}
export default function TeacherAssignmentsGroup({ groupId }: Props) {
  const {
    data: assignments,
    isPending,
    isError,
    refetch,
    error,
  } = useGetGroupAssignments(groupId);

  const router = useRouter();
  if (isPending) {
    return <AssignmentCardSkeleton />;
  }

  if (isError) {
    return <ErrorState message={error?.message} onRetry={() => refetch()} />;
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h1 className="text-center text-3xl font-bold text-primary md:text-left md:text-4xl">
          Group Assignments
        </h1>

        <button
          onClick={() => {
            router.push(`/group/${groupId}/assignments/create`);
          }}
          className="w-full cursor-pointer rounded-lg bg-primary px-5 py-3 text-sm text-white transition hover:bg-[#094B53] md:w-auto"
        >
          + Create Assignment
        </button>
      </div>

      <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {assignments?.map((assignment: GroupAssignmentsResponse) => {
          const progress =
            assignment.total_students === 0
              ? 0
              : (assignment.number_of_submissions / assignment.total_students) *
                100;

          return (
            <div
              key={assignment.id}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition hover:shadow-lg"
            >
              {/* <div className="inline-flex items-center gap-1 rounded-full bg-[#EAF7F6] px-3 py-1 text-xs font-medium text-primary">
                <span className="h-2 w-2 rounded-full bg-primary" />
                {assignment.status === 'active' ? 'Active' : 'Closed'}
              </div> */}

              <h2 className="mt-5 line-clamp-2 text-[24px] font-bold text-[#1D2939]">
                {assignment.title}
              </h2>

              <p className="mt-3 h-[56px] overflow-hidden text-[16px] leading-7 text-[#667085] line-clamp-2">
                {assignment.description}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-y-6">
                <div className="flex gap-2">
                  <CalendarDays size={17} className="mt-0.5 text-[#98A2B3]" />

                  <div>
                    <p className="text-xs text-[#667085]">Deadline</p>
                    <p className="font-semibold text-[#1D2939]">
                      {new Date(assignment.deadline).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Star size={17} className="mt-0.5 text-[#98A2B3]" />

                  <div>
                    <p className="text-xs text-[#667085]">Total Grade</p>
                    <p className="font-semibold text-[#1D2939]">
                      {assignment.total_grade} pts
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <SquareArrowOutUpRight
                    size={17}
                    className="mt-0.5 text-[#98A2B3]"
                  />

                  <div>
                    <p className="text-xs text-[#667085]">Questions</p>
                    <p className="font-semibold text-[#1D2939]">
                      {assignment.number_of_questions}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-[#667085]">Submission Progress</span>

                  <span className="font-semibold text-primary">
                    {assignment.number_of_submissions}/
                    {assignment.total_students} submitted
                  </span>
                </div>

                <div className="h-[6px] overflow-hidden rounded-full bg-[#E4E7EC]">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary font-medium text-white transition hover:bg-[#094B53]">
                  View Details
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={() => {
                    router.push(
                      `/group/${groupId}/assignments/${assignment.id}/submissions`
                    );
                  }}
                  className="h-12 w-full cursor-pointer rounded-lg border border-primary bg-white font-medium text-primary transition hover:bg-[#F2FBFA]"
                >
                  View Submissions
                </button>
              </div>
            </div>
          );
        })}

        <div className="group flex min-h-[480px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#D0D5DD] bg-[#FCFCFD] p-6 transition-all hover:border-primary hover:bg-[#F8FCF8]">
          <button
            onClick={() => {
              router.push(`/group/${groupId}/assignments/create`);
            }}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF2FF] transition group-hover:scale-105"
          >
            <Plus size={28} className="text-[#667085]" />
          </button>

          <h3 className="mt-8 text-center text-xl font-semibold text-[#667085]">
            Create New Assignment
          </h3>

          <p className="mt-3 max-w-[220px] text-center text-base leading-6 text-xs text-[#98A2B3]">
            Start with a template or build from scratch.
          </p>
        </div>
      </div>
    </div>
  );
}
