'use client';

import { useEffect, useState } from 'react';

import useJoinRequests from '@/Features/Dashboard/Hooks/useJoinRequests';
import useInfiniteJoinRequests from '@/Features/Dashboard/Hooks/useInfiniteJoinRequests';
import { useGetAllTeacherGroups } from '@/Features/Dashboard/Hooks/useGetAllTeacherGroups';
import { JoinGroupResponse, TeacherGroup } from '@/Features/Dashboard/Types';

import JoinRequestsDesktop from './JoinRequestsDesktop';
import JoinRequestsMobile from './JoinRequestsMobile';
import JoinRequestsHeader from './JoinRequestsDesktopHeader';

const PAGE_SIZE = 2;

export default function JoinRequests() {
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setSearch(searchInput.trim());
    }, 400);

    return () => window.clearTimeout(timeout);
  }, [searchInput]);

  useEffect(() => {
    setPage(1);
  }, [search, selectedGroupId]);

  const joinRequestsQuery = useJoinRequests({
    search,
    groupId: selectedGroupId ?? undefined,
    page,
    limit: PAGE_SIZE,
  });
  const groupsQuery = useGetAllTeacherGroups();
  const mobileRequestsQuery = useInfiniteJoinRequests({
    search,
    groupId: selectedGroupId ?? undefined,
    limit: PAGE_SIZE,
  });
  const groups = Array.isArray(groupsQuery.data)
    ? (groupsQuery.data as TeacherGroup[])
    : [];
  const requests = joinRequestsQuery.requests as JoinGroupResponse[];

  const handlePageChange = (nextPage: number) => {
    const totalPages = Math.max(
      1,
      Math.ceil(joinRequestsQuery.totalCount / PAGE_SIZE)
    );

    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  };

  return (
    <section className="min-h-screen bg-[#F7F8FC] py-4 lg:p-6">
      <JoinRequestsHeader
        count={joinRequestsQuery.totalCount}
        groups={groups}
        search={searchInput}
        selectedGroupId={selectedGroupId}
        isGroupsLoading={groupsQuery.isPending}
        isRequestsLoading={joinRequestsQuery.isFetching}
        onSearchChange={setSearchInput}
        onGroupChange={setSelectedGroupId}
      />

      {joinRequestsQuery.isError || mobileRequestsQuery.isError ? (
        <div className="mx-auto w-[95%] rounded-xl border border-red-200 bg-red-50 px-4 py-8 text-center text-sm text-red-700">
          Failed to load students requests
        </div>
      ) : (
        <>
      <div className="hidden lg:block">
            {joinRequestsQuery.isPending ? (
              <div className="mx-auto flex min-h-48 w-[95%] items-center justify-center rounded-xl bg-white">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
              </div>
            ) : (
              <JoinRequestsDesktop
                requests={requests}
                totalCount={joinRequestsQuery.totalCount}
                currentPage={page}
                pageSize={PAGE_SIZE}
                onPageChange={handlePageChange}
              />
            )}
      </div>

      <div className="block lg:hidden">
            <JoinRequestsMobile
              requests={mobileRequestsQuery.requests}
              isLoading={mobileRequestsQuery.isPending}
              hasNextPage={mobileRequestsQuery.hasNextPage}
              isFetching={mobileRequestsQuery.isFetching}
              isFetchingNextPage={mobileRequestsQuery.isFetchingNextPage}
              fetchNextPage={() => {
                void mobileRequestsQuery.fetchNextPage();
              }}
            />
      </div>

        </>
      )}
    </section>
  );
}
