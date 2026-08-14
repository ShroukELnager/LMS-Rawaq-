import { UpdateGroupPayload } from '@/Features/Dashboard/Types';

export const EditGroupService = async (
  groupId: string,
  data: UpdateGroupPayload
) => {
  const res = await fetch(
    `/api/teacher/editGroup?groupId=${encodeURIComponent(groupId)}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
  );

  if (!res.ok) {
    let message = "We couldn't update the group. Please try again.";

    try {
      const error = await res.json();

      if (res.status === 401 || res.status === 403) {
        message = "You don't have permission to edit this group.";
      } else {
        message = error.message || error.error || message;
      }
    } catch {
      // keep default message
    }

    throw new Error(message);
  }

  return res.json();
};
