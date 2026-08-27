import { ListGroupsResponse } from "@/Features/Dashboard/Types";

export interface PaginatedGroupsResponse {
  data: ListGroupsResponse[];
  totalCount: number;
  offset: number;
  limit: number;
}

export const ListGroupsService = async (
  search = '',
  limit = 6,
  offset = 0
): Promise<PaginatedGroupsResponse> => {
  const params = new URLSearchParams();

  params.set('limit', String(limit));
  params.set('offset', String(offset));

  if (search.trim()) {
    params.set('search', search.trim());
  }

  const res = await fetch(`/api/student/groups?${params.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    let message = 'Failed to load groups';

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
