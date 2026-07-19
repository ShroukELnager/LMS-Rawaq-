import {
  AssignmentSubmissionsResponse,
  GetAssignmentSubmissionsRequest,
} from '../../../Types';

export const getAssignmentSubmissionsService = async (
  data: GetAssignmentSubmissionsRequest
): Promise<AssignmentSubmissionsResponse> => {
  const res = await fetch('/api/teacher/getAssignmentSubmissions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
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

  return res.json() as Promise<AssignmentSubmissionsResponse>;
};
