import { useQuery } from '@tanstack/react-query';

import {
  viewGroupService,
  ViewGroupParams,
} from '../lib/Services/teacher/getAllRequests.service';

export default function useJoinRequests({
  search = '',
  groupId,
  page = 1,
  limit = 5,
}: ViewGroupParams = {}) {
  const query = useQuery({
    queryKey: ['joinRequests', search, groupId, page, limit],

    queryFn: () =>
      viewGroupService({
        search,
        groupId,
        page,
        limit,
      }),

    placeholderData: (previousData) => previousData,
  });

  return {
    requests: query.data?.data ?? [],

    totalCount: query.data?.totalCount ?? 0,

    offset: query.data?.offset ?? 0,

    end: query.data?.end ?? 0,

    isPending: query.isPending,

    isFetching: query.isFetching,

    isError: query.isError,

    error: query.error,

    refetch: query.refetch,
  };
}
