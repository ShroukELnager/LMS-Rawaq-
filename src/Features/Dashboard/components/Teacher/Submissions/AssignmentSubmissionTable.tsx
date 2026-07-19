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
};

export default function AssignmentSubmissionTable({
  AssignmentSubmissionsData,
  status,
  search,
  onStatusChange,
  onSearchChange,
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
        />
      </div>

      <div className="lg:hidden">
        <AssignmentSubmissionTableMobile
          AssignmentSubmissionsData={AssignmentSubmissionsData}
          status={status}
          search={search}
          onStatusChange={onStatusChange}
          onSearchChange={onSearchChange}
        />
      </div>
    </>
  );
}
