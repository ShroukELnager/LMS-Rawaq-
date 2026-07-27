import { AssignmentSubmissionsResponse } from '@/Features/Dashboard/Types';
import { UseQueryResult } from '@tanstack/react-query';
import AssignmentSubmissionTableDesktop from './AssignmentSubmissionTableDesktop';
import AssignmentSubmissionTableMobile from './AssignmentSubmissionTableMobile';

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

export default function AssignmentSubmissionTable({
  AssignmentSubmissionsData,
  status,
  search,
  onStatusChange,
  onSearchChange,
  groupId,
  assignmentId,
}: Props) {
  return (
    <>
      <div className="hidden lg:block">
        <AssignmentSubmissionTableDesktop
          AssignmentSubmissionsData={AssignmentSubmissionsData}
          status={status}
          search={search}
          onStatusChange={onStatusChange}
          onSearchChange={onSearchChange}
          groupId={groupId}
          assignmentId={assignmentId}
        />
      </div>

      <div className="lg:hidden">
        <AssignmentSubmissionTableMobile
          AssignmentSubmissionsData={AssignmentSubmissionsData}
          status={status}
          search={search}
          onStatusChange={onStatusChange}
          onSearchChange={onSearchChange}
          groupId={groupId}
          assignmentId={assignmentId}
        />
      </div>
    </>
  );
}
