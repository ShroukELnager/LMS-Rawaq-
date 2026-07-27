'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { CircleAlert } from 'lucide-react';

import NotSubmittedPage from '@/Features/Dashboard/Components/Student/Assignments/AssignmentsPage/NotSubmittedPage';
import LateSubmissionPage from '@/Features/Dashboard/Components/Student/Assignments/AssignmentsPage/LateSubmissionPage';
import SubmittedPage from '@/Features/Dashboard/Components/Student/Assignments/AssignmentsPage/SubmittedPage';
import useGetAssignmentDetails from '@/Features/Dashboard/Hooks/useGetAssignmentDetailscomponent';

export default function Page() {
  const params = useParams();

  const assignmentId = params?.assignmentId as string;
  const groupId = params?.groupId as string;

  const { assignmentDetails, assignmentDetailsAsync, isPending, error } =
    useGetAssignmentDetails();

  useEffect(() => {
    if (!assignmentId) return;

    assignmentDetailsAsync({
      p_assignment_id: assignmentId,
    });
  }, [assignmentId, assignmentDetailsAsync]);

  // Loading state
  if (isPending) {
    return (
      <div className="mx-auto max-w-7xl space-y-6 p-8">
        <div className="h-72 animate-pulse rounded-3xl bg-gray-100" />

        <div className="grid grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-xl bg-gray-100"
            />
          ))}
        </div>

        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-xl bg-gray-100"
          />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center gap-4">
        <CircleAlert className="size-12 text-red-500" />

        <h2 className="text-xl font-semibold">Failed to load assignment</h2>

        <button
          onClick={() =>
            assignmentDetailsAsync({
              p_assignment_id: assignmentId,
            })
          }
          className="rounded-lg bg-[#006D77] px-6 py-3 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  // No data
  if (!assignmentDetails) {
    return null;
  }

  const { is_late, submission, can_submit } = assignmentDetails;

  console.log('assignmentDetails:', assignmentDetails);
  console.log('submission:', submission);
  console.log('can_submit:', can_submit);

  // Student can submit -> not submitted page
  if (can_submit) {
    return (
      <NotSubmittedPage
        assignmentDetails={assignmentDetails}
        groupId={groupId}
        assignmentId={assignmentId}
      />
    );
  }

  // Late submission
  if (is_late) {
    return <LateSubmissionPage assignmentDetails={assignmentDetails} />;
  }

  // Already submitted
  if (submission?.status === 'submitted') {
    return <SubmittedPage assignmentDetails={assignmentDetails} />;
  }

  // Default fallback
  return (
    <NotSubmittedPage
      assignmentDetails={assignmentDetails}
      groupId={groupId}
      assignmentId={assignmentId}
    />
  );
}
