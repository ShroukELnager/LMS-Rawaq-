import { useQuery } from '@tanstack/react-query';
import { SubmissionReviewDetailsService } from '../lib/Services/teacher/getStudentAssignmentSubmissionDetails.service';
import { SubmissionReviewResponse } from '../Types';

export default function useGetStudentSubmissionDetails({
  assignmentId,
  studentId,
}: {
  assignmentId: string;
  studentId: string;
}) {
  return useQuery<SubmissionReviewResponse>({
    queryKey: ['assignmentsStudentSubmissions', assignmentId, studentId],
    queryFn: () =>
      SubmissionReviewDetailsService({
        p_assignment_id: assignmentId,
        p_student_id: studentId,
      }),
  });
}
