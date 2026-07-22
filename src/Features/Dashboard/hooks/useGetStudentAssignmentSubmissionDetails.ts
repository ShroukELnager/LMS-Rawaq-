import { useQuery } from '@tanstack/react-query';
import { SubmissionReviewDetailsService } from '../lib/Services/teacher/getStudentAssignmentSubmissionDetails.service';

export default function useGetStudentSubmissionDetails({
  assignmentId,
  studentId,
}: {
  assignmentId: string;
  studentId: string;
}) {
  return useQuery({
    queryKey: ['assignmentsStudentSubmissions', assignmentId, studentId],
    queryFn: () =>
      SubmissionReviewDetailsService({
        p_assignment_id: assignmentId,
        p_student_id: studentId,
      }),
  });
}
