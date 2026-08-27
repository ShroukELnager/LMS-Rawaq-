export interface ViewGroupParams {
  search?: string;
  groupId?: string;
  page?: number;
  limit?: number;
}

export interface PaginatedJoinRequestsResponse<T> {
  data: T[];
  totalCount: number;
  offset: number;
  end: number;
  limit: number;
}

export const viewGroupService = async <T = unknown>({
  search = '',
  groupId,
  page = 1,
  limit = 5,
}: ViewGroupParams = {}): Promise<PaginatedJoinRequestsResponse<T>> => {
  const offset = (page - 1) * limit;

  const params = new URLSearchParams();

  params.set('limit', String(limit));

  params.set('offset', String(offset));

  if (search.trim()) {
    params.set('search', search.trim());
  }

  if (groupId) {
    params.set('group_id', groupId);
  }

  const res = await fetch(
    `/api/teacher/requests/getAllRequests?${params.toString()}`,
    {
      method: 'GET',

      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

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
