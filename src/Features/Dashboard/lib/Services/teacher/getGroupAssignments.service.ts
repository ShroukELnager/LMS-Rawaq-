import { GetGroupAssignmentsRequest } from '../../../Types';

export const getGroupAssignmentsService = async (
  data: GetGroupAssignmentsRequest
) => {
  const res = await fetch('/api/teacher/getGroupAssignments', {
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

  return res.json();
};
