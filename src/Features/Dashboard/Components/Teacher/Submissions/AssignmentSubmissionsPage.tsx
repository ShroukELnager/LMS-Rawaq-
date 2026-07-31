import useGetAssignmentSubmissions from "@/Features/Dashboard/Hooks/useGetAssignmentSubmissions";
import AssignmentSubmissionHeader from "./AssignmentSubmissionHeader";
import AssignmentSubmissionTable from "./AssignmentSubmissionTable";
import { useState } from "react";

export default function AssignmentSubmissionsPage({
  assignmentId,
  groupId,
}: {
  groupId:string
  assignmentId: string;
}) {
  const [status, setStatus] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const AssignmentSubmissionsData = useGetAssignmentSubmissions({
    assignmentId,
    status,
    search,
  });
  return (
    <section className="mx-auto w-full  space-y-6 px-4  sm:px-6 lg:px-8">
      <AssignmentSubmissionHeader
        AssignmentSubmissionsData={AssignmentSubmissionsData}
      />
      

      <AssignmentSubmissionTable
        AssignmentSubmissionsData={AssignmentSubmissionsData}
        status={status}
        search={search}
        onStatusChange={setStatus}
        onSearchChange={setSearch}
        groupId={groupId}
        assignmentId={assignmentId}
      />
    </section>
  );
}