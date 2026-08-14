import { Category } from "@/Features/Dashboard/Types";

export const GetSingleGroupService = async (
  groupId: string
): Promise<Category[]> => {
  const res = await fetch(`/api/student/singleGroup?groupId=${groupId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
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
