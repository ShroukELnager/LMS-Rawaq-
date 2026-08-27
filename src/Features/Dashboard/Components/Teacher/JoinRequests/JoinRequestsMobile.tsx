'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

import UserAvatar from '@/Shared/Utils/UserAvatar';
import { formatRequestTime } from '@/Features/Dashboard/lib/FormatRequestTime';
import { JoinGroupResponse } from '@/Features/Dashboard/Types';

import useAcceptRequest from '@/Features/Dashboard/Hooks/useAcceptRequest';
import useRejectRequest from '@/Features/Dashboard/Hooks/useRejectRequest';

interface Props {
  requests: JoinGroupResponse[];
  isLoading?: boolean;
  hasNextPage: boolean;
  isFetching: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

export default function JoinRequestsMobile({
  requests,
  isLoading = false,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  fetchNextPage,
}: Props) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const acceptRequest = useAcceptRequest();
  const rejectRequest = useRejectRequest();

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element || !hasNextPage || isFetching || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '0px 0px 300px 0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetching, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="space-y-4 px-4 pb-6">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="h-48 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="mx-4 rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
        <p className="text-sm text-gray-500">No join requests at the moment.</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4 px-4 pb-6">
        {requests.map((request) => (
          <div
            key={request.id}
            className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <UserAvatar size={48} />

              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {request.user.first_name} {request.user.last_name}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {request.user.email}
                    </p>
                  </div>

                  <span className="shrink-0 text-[11px] text-gray-400">
                    {formatRequestTime(request.created_at)}
                  </span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <Image
                    src="/images/group.png"
                    alt="group"
                    width={14}
                    height={14}
                  />

                  <span className="text-xs font-medium text-[#005F67]">
                    {request.group_name}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                disabled={acceptRequest.isPending}
                onClick={() =>
                  acceptRequest.acceptRequest({
                    p_request_id: request.id,
                  })
                }
                className="h-11 w-full rounded-xl bg-[#005F67] text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {acceptRequest.isPending ? 'Accepting...' : 'Accept'}
              </button>

              <button
                type="button"
                disabled={rejectRequest.isPending}
                onClick={() =>
                  rejectRequest.rejectRequest({
                    p_request_id: request.id,
                  })
                }
                className="h-11 w-full rounded-xl border border-gray-300 bg-white text-sm text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {rejectRequest.isPending ? 'Rejecting...' : 'Reject'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        ref={loadMoreRef}
        className="flex min-h-16 items-center justify-center px-4 pb-6"
      >
        {isFetchingNextPage && (
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-primary" />
        )}
      </div>

    </>
  );
}
