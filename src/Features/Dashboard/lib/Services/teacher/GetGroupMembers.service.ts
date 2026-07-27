import { GetGroupMemberResponse, GetGroupMembersRequest } from '@/Features/Dashboard/Types';

export const GetGroupMembersService = async (
  data: GetGroupMembersRequest
): Promise<GetGroupMemberResponse> => {
  const res = await fetch('/api/teacher/getGroupMembers', {
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