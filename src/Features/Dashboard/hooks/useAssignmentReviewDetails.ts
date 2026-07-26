import { useQuery } from '@tanstack/react-query';
import { AssignmentReviewDetailsService } from '../lib/Services/student/getStudentAssignmentReview.service';
import { SubmissionReviewDetailsResponse } from '../Types';

export default function useAssignmentReviewDetails(assignmentId: string) {
  return useQuery<SubmissionReviewDetailsResponse>({
    queryKey: ['AssignmentReviewDetails', assignmentId],

    queryFn: () =>
      AssignmentReviewDetailsService({
        p_assignment_id: assignmentId,
      }),

    enabled: !!assignmentId,
  });
}
