import { useInfiniteQuery } from '@tanstack/react-query';

import { JoinGroupResponse } from '../Types';
import {
  viewGroupService,
  ViewGroupParams,
} from '../lib/Services/teacher/getAllRequests.service';

type InfiniteJoinRequestsParams = Omit<ViewGroupParams, 'page'>;

export default function useInfiniteJoinRequests({
  search = '',
  groupId,
  limit = 5,
}: InfiniteJoinRequestsParams = {}) {
  const query = useInfiniteQuery({
    queryKey: ['joinRequests', 'infinite', search, groupId, limit],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      viewGroupService<JoinGroupResponse>({
        search,
        groupId,
        page: pageParam,
        limit,
      }),
    getNextPageParam: (lastPage, _pages, lastPageParam) =>
      lastPage.end + 1 < lastPage.totalCount ? lastPageParam + 1 : undefined,
  });

  return {
    requests: query.data?.pages.flatMap((page) => page.data) ?? [],
    totalCount: query.data?.pages[0]?.totalCount ?? 0,
    hasNextPage: query.hasNextPage,
    isPending: query.isPending,
    isFetching: query.isFetching,
    isFetchingNextPage: query.isFetchingNextPage,
    isError: query.isError,
    fetchNextPage: query.fetchNextPage,
  };
}
