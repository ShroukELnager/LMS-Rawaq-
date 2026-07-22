import { AssignmentSubmissionsResponse } from '@/Features/Dashboard/Types';
import StudentAvatar from '@/Shared/Components/StudentAvatar';
import { UseQueryResult } from '@tanstack/react-query';
import { Check, Search } from 'lucide-react';
import NotSubmitted from '@/assets/icons/notsubmitted.svg';
import Submitted from '@/assets/icons/submitted.svg';
import { useRouter } from 'next/navigation';

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
export default function AssignmentSubmissionTableDesktop({
  AssignmentSubmissionsData,
  status,
  search,
  onStatusChange,
  onSearchChange,
  groupId,
  assignmentId,
}: Props) {
  const students = AssignmentSubmissionsData.data?.students ?? [];
console.log('students', students);
  const totalGrade =
    AssignmentSubmissionsData.data?.assignment.total_grade ?? 100;

  const tabs = [
    { key: null, label: 'All' },
    { key: 'submitted', label: 'Submitted' },
    { key: 'reviewed', label: 'Reviewed' },
    { key: 'not_submitted', label: 'Not Submitted' },
  ];

  const router = useRouter();
  return (
    <div className="overflow-hidden rounded-2xl border border-[#EAECF0] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#EAECF0] bg-white px-6 py-4">
        <div className="flex items-center rounded-xl bg-[#F0F3FF] p-1">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => onStatusChange(tab.key)}
              className={`rounded-lg px-5 py-2 text-sm font-medium transition ${
                status === tab.key
                  ? 'bg-white text-[#0B5D66] shadow-sm'
                  : 'text-[#667085] hover:text-[#344054]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative w-[260px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
          />

          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search students..."
            className="h-10 w-full rounded-lg border border-[#D0D5DD] bg-white pl-10 pr-3 text-sm outline-none focus:border-[#0B5D66]"
          />
        </div>
      </div>

      <table className="w-full">
        <thead className="bg-[#F0F3FF]">
          <tr className="text-left text-sm font-semibold uppercase tracking-wide text-[#3E494A]">
            <th className="px-6 py-8">Student</th>
            <th className="px-6 py-8">Status</th>
            <th className="px-6 py-8">Awarded Grade</th>
            <th className="px-6 py-8">Submitted At</th>
            <th className="px-6 py-8 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-8 text-center text-[#667085]">
                <div className="flex flex-col items-center gap-3">
                  <h3 className="text-lg font-semibold text-[#344054]">
                    No Students Found
                  </h3>

                  <p className="text-sm text-[#667085]">
                    {status
                      ? `There are no students with "${status.replace('_', ' ')}" status.`
                      : search
                        ? 'No students match your search.'
                        : 'There are no students in this assignment.'}
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            students.map((student) => {
              const fullName = `${student.first_name} ${student.last_name}`;

              const badge =
                student.status === 'reviewed'
                  ? 'bg-[#E8F8EE] text-[#067647]'
                  : student.status === 'submitted'
                    ? 'bg-[#EEF4FF] text-[#175CD3]'
                    : 'bg-[#F2F4F7] text-[#667085]';

              return (
                <tr
                  key={student.user_id}
                  className="border-t border-[#EAECF0] hover:bg-[#FCFCFD]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <StudentAvatar
                        firstName={student.first_name}
                        lastName={student.last_name}
                        avatarUrl={student.avatar_url}
                        size={44}
                      />

                      <span className="text-sm font-medium text-[#101828]">
                        {fullName}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${badge}`}
                    >
                      {student.status === 'reviewed' ? (
                        <>
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#17B26A]">
                            <Check
                              size={10}
                              strokeWidth={3}
                              className="text-white"
                            />
                          </span>
                          Reviewed
                        </>
                      ) : student.status === 'submitted' ? (
                        <>
                          <Submitted className="h-3 w-3" />
                          Submitted
                        </>
                      ) : (
                        <>
                          <NotSubmitted className="h-3 w-3" />
                          Not Submitted
                        </>
                      )}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {student.total_grade_awarded == null ? (
                      <span className="text-[#98A2B3]">—</span>
                    ) : (
                      <span className="text-sm font-semibold text-[#0B5D66]">
                        {student.total_grade_awarded}
                        <span className="font-normal text-[#667085]">
                          /{totalGrade}
                        </span>
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    {student.submitted_at ? (
                      <>
                        <div className="text-sm text-[#344054]">
                          {new Date(student.submitted_at).toLocaleDateString(
                            'en-GB',
                            {
                              day: '2-digit',
                              month: 'short',
                              year: 'numeric',
                            }
                          )}
                        </div>

                        <div className="text-xs text-[#98A2B3]">
                          {new Date(student.submitted_at).toLocaleTimeString(
                            [],
                            {
                              hour: '2-digit',
                              minute: '2-digit',
                            }
                          )}
                        </div>
                      </>
                    ) : (
                      <span className="text-sm italic text-[#98A2B3]">
                        Not Submitted
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {student.status === 'reviewed' && (
                      <button className=" cursor-pointer inline-flex items-center gap-2 rounded-lg border border-[#0B5D66] bg-white px-5 py-2 text-sm font-medium text-[#0B5D66] transition hover:bg-[#F2FBFA]">
                        View
                      </button>
                    )}

                    {student.status === 'submitted' && (
                      <button
                        onClick={() =>
                          router.push(
                            `/group/${groupId}/assignments/${assignmentId}/submissions/${student.user_id}`
                          )
                        }
                        className=" cursor-pointer rounded-lg bg-[#0B5D66] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#094B53]"
                      >
                        Review
                      </button>
                    )}

                    {student.status === 'not_submitted' && (
                      <button
                        disabled
                        className="rounded-lg  bg-[#EEF2FF] px-5 py-2 text-sm font-medium text-[#98A2B3]"
                      >
                        N/A
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}