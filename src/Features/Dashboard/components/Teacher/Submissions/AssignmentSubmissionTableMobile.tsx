import ScrollableTabs from '@/Features/Dashboard/lib/ScrollableTabs';
import { AssignmentSubmissionsResponse } from '@/Features/Dashboard/Types';
import StudentAvatar from '@/Shared/Components/StudentAvatar';
import { UseQueryResult } from '@tanstack/react-query';
import { Search } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";
import AssignmentSubmissionTableMobileSkeleton from './AssignmentSubmissionTableMobileSkeleton';
type Props = {
  AssignmentSubmissionsData: UseQueryResult<
    AssignmentSubmissionsResponse,
    Error
  >;
  status: string | null;
  search: string;
  onStatusChange: (status: string | null) => void;
  onSearchChange: (search: string) => void;
  groupId: string;
  assignmentId:string
};
export default function AssignmentSubmissionTableMobile({
  AssignmentSubmissionsData,
  status,
  search,
  onStatusChange,
  onSearchChange,
  groupId,
  assignmentId,
}: Props) {
  const students = AssignmentSubmissionsData.data?.students ?? [];
  const assignment = AssignmentSubmissionsData.data?.assignment;
  const router = useRouter();
if (AssignmentSubmissionsData.isPending) {
  return <AssignmentSubmissionTableMobileSkeleton />;
}
  const tabs = [
    {
      value: null,
      label: `All (${assignment?.total_students ?? 0})`,
    },
    {
      value: 'submitted',
      label: `Submitted (${assignment?.submitted ?? 0})`,
    },
    {
      value: 'reviewed',
      label: `Reviewed (${assignment?.reviewed ?? 0})`,
    },
    {
      value: 'not_submitted',
      label: `Not Submitted (${assignment?.not_submitted ?? 0})`,
    },
  ];

  return (
    <div className="space-y-4 lg:hidden">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
        />

        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search students..."
          className="h-11 w-full rounded-lg border border-[#D0D5DD] pl-10 pr-4 text-sm outline-none focus:border-primary"
        />
      </div>

      <ScrollableTabs
        items={tabs}
        activeValue={status}
        onChange={onStatusChange}
      />

      <div className="space-y-4">
        {students.map((student) => (
          <div
            key={student.user_id}
            className="rounded-xl border border-[#EAECF0] bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="flex gap-3">
                <StudentAvatar
                  firstName={student.first_name}
                  lastName={student.last_name}
                  avatarUrl={student.avatar_url}
                  size={48}
                />

                <div>
                  <h3 className="font-semibold text-[#101828]">
                    {student.first_name} {student.last_name}
                  </h3>

                  {student.submitted_at ? (
                    <p className="mt-1 text-xs text-[#667085]">
                      Submitted{' '}
                      {new Date(student.submitted_at).toLocaleDateString(
                        'en-GB',
                        {
                          day: '2-digit',
                          month: 'short',
                        }
                      )}
                      ,{' '}
                      {new Date(student.submitted_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  ) : (
                    <p className="mt-1 text-xs font-medium text-red-500">
                      Missing Submission
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 flex items-end justify-between">
              <div>
                <p className="text-xs text-[#667085]">Grade</p>

                <p className="mt-1 font-semibold">
                  {student.total_grade_awarded ?? '--'} /{' '}
                  {assignment?.total_grade}
                </p>
              </div>

              {student.status === 'submitted' && (
                <button
                  onClick={() =>
                    router.push(
                      `/group/${groupId}/assignments/${assignmentId}/submissions/${student.user_id}`
                    )
                  }
                  className="rounded-md bg-primary px-6 py-2 text-sm text-white"
                >
                  Review
                </button>
              )}

              {student.status === 'reviewed' && (
                <button className="rounded-md border border-primary px-6 py-2 text-sm text-primary">
                  View
                </button>
              )}

              {student.status === 'not_submitted' && (
                <button
                  disabled
                  className="rounded-md bg-[#EEF2FF] px-6 py-2 text-sm text-[#98A2B3]"
                >
                  N/A
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
