import { SubmissionReviewDetailsRequest, SubmissionReviewDetailsResponse } from '@/Features/Dashboard/Types';

export interface AssignmentReviewDetailsRequest {
  p_assignment_id: string;
  p_student_id: string;
}

export const AssignmentReviewDetailsService = async (
  payload: SubmissionReviewDetailsRequest
): Promise<SubmissionReviewDetailsResponse> => {
  const res = await fetch('/api/student/getStudentAssignmentReview', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let message = 'Something went wrong';

    try {
      const error = await res.json();
      message = error.message || error.error || message;
    } catch {
      message = `Request failed (${res.status})`;
    }

    throw new Error(message);
  }

  return res.json();
};
