'use client';

import Image from 'next/image';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

import { ListGroupsService } from '../../lib/Services/student/groups.service';
import { ListGroupsResponse } from '../../Types';
import GroupSkeleton from '../../Skeleton/Student/group';
import ErrorState from '../../Errors/ErrorToLoadPage';
import useRequestToJoin from '../../Hooks/useRequestToJoin';
import LoadArrow from '@/assets/icons/LoadArrow.svg';

const LIMIT = 6;

export default function ListGroups() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /*
   * Navbar search
   *
   * This value comes from the URL.
   * It is NOT used as the value of the search input
   * inside this page.
   */
  const navbarSearch = searchParams?.get('search') || '';

  /*
   * Pagination params from URL
   */
  const urlOffset = Number(searchParams?.get('offset')) || 0;
  const urlLimit = Number(searchParams?.get('limit')) || LIMIT;

  /*
   * Search input inside Groups page
   *
   * This state is completely independent from navbarSearch.
   */
  const [groupSearch, setGroupSearch] = useState('');

  /*
   * Sentinel for mobile infinite scroll
   */
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  /*
   * Decide which search should be used for the API.
   *
   * If the user types inside the Groups page search,
   * use that value.
   *
   * Otherwise, use the navbar search.
   *
   * The two input values remain independent.
   */
  const activeSearch = groupSearch.trim() || navbarSearch;

  /*
   * Groups Query
   */
  const groupsQuery = useInfiniteQuery({
    queryKey: ['listGroups', activeSearch],

    initialPageParam: urlOffset,

    queryFn: ({ pageParam }) =>
      ListGroupsService(activeSearch, urlLimit, pageParam),

    getNextPageParam: (lastPage) => {
      const nextOffset = lastPage.offset + lastPage.data.length;

      if (nextOffset >= lastPage.totalCount) {
        return undefined;
      }

      return nextOffset;
    },
  });

  const joinMutation = useRequestToJoin();

  /*
   * Remove duplicated groups by ID.
   *
   * This fixes:
   * "Encountered two children with the same key..."
   */
  const groups = useMemo(() => {
    const allGroups =
      groupsQuery.data?.pages.flatMap((page) => page.data) ?? [];

    const uniqueGroups = new Map<string, ListGroupsResponse>();

    allGroups.forEach((group) => {
      if (!uniqueGroups.has(group.id)) {
        uniqueGroups.set(group.id, group);
      }
    });

    return Array.from(uniqueGroups.values());
  }, [groupsQuery.data]);

  const totalCount = groupsQuery.data?.pages[0]?.totalCount ?? 0;

  const hasMore = groups.length < totalCount;

  /*
   * Update pagination params in URL
   */
  const updatePaginationUrl = (offset: number) => {
    const params = new URLSearchParams(searchParams?.toString());

    params.set('offset', String(offset));
    params.set('limit', String(LIMIT));

    router.replace(`?${params.toString()}`, {
      scroll: false,
    });
  };

  /*
   * Load next page
   */
  const handleLoadMore = async () => {
    if (!hasMore || groupsQuery.isFetchingNextPage) {
      return;
    }

    const result = await groupsQuery.fetchNextPage();

    if (!result.data) {
      return;
    }

    const pages = result.data.pages;
    const lastPage = pages[pages.length - 1];

    if (!lastPage) {
      return;
    }

    const nextOffset = lastPage.offset + lastPage.data.length;

    updatePaginationUrl(nextOffset);
  };

  /*
   * Groups page search
   *
   * This does NOT modify the navbar input state.
   */
  const handleGroupSearch = (value: string) => {
    setGroupSearch(value);

    const params = new URLSearchParams(searchParams?.toString());

    /*
     * Page search has its own URL parameter.
     *
     * This keeps it separate from the navbar search.
     */
    if (value.trim()) {
      params.set('groupSearch', value);
    } else {
      params.delete('groupSearch');
    }

    /*
     * Reset pagination when page search changes
     */
    params.set('offset', '0');
    params.set('limit', String(LIMIT));

    router.replace(`?${params.toString()}`, {
      scroll: false,
    });
  };

  /*
   * Initialize the page search ONLY from groupSearch URL param.
   *
   * We intentionally do NOT use navbarSearch here.
   *
   * Therefore:
   *
   * Navbar:
   * ?search=react
   *
   * Page input:
   * remains empty.
   */
  useEffect(() => {
    const pageSearch = searchParams?.get('groupSearch') || '';

    setGroupSearch(pageSearch);
  }, [searchParams]);

  /*
   * Mobile Infinite Scroll
   *
   * When the sentinel gets close to the bottom,
   * load the next page automatically.
   */
  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isMobile = window.innerWidth < 1024;

        const isVisible = entries[0]?.isIntersecting;

        if (
          isMobile &&
          isVisible &&
          hasMore &&
          !groupsQuery.isFetchingNextPage
        ) {
          handleLoadMore();
        }
      },
      {
        root: null,
        rootMargin: '0px 0px 300px 0px',
        threshold: 0,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [
    hasMore,
    groupsQuery.isFetchingNextPage,
    groupsQuery.fetchNextPage,
    searchParams,
  ]);

  return (
    <div className="p-4 lg:p-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">
          Explore Learning Groups
        </h1>

        <p className="mt-2 text-gray-500">
          Join a group and start your learning journey
        </p>
      </div>

      {/* Groups Search */}
      <div className="relative mt-6">
        <Image
          src="/images/search.png"
          alt="search"
          width={16}
          height={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50"
        />

        <input
          type="text"
          value={groupSearch}
          onChange={(e) => handleGroupSearch(e.target.value)}
          placeholder="Search for groups or mentors..."
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-primary"
        />
      </div>

      {/* Initial Loading */}
      {groupsQuery.isPending ? (
        <GroupSkeleton />
      ) : groupsQuery.isError ? (
        <div className="mt-8">
          <ErrorState
            message="Failed to load groups"
            onRetry={() => groupsQuery.refetch()}
          />
        </div>
      ) : groups.length === 0 ? (
        /* Empty State */
        <div className="mt-10 rounded-xl border border-gray-200 bg-white py-12 text-center">
          <h2 className="text-lg font-semibold text-gray-900">
            No groups found
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Try searching with a different keyword.
          </p>
        </div>
      ) : (
        <>
          {/* Groups */}
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {groups.map((group: ListGroupsResponse) => {
              const percentage =
                (group.current_students_count / group.max_no_of_students) * 100;

              return (
                <div
                  key={group.id}
                  className="rounded-xl border border-gray-300 bg-white p-4 shadow-sm transition hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    {group.category && (
                      <span className="rounded-md bg-[#E5EEEF] px-3 py-1 text-xs font-medium text-primary">
                        {group.category}
                      </span>
                    )}

                    {group.duration_in_days != null && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Image
                          src="/images/clock.png"
                          alt="clock"
                          width={12}
                          height={12}
                        />

                        <span>
                          {group.duration_in_days < 7
                            ? `${group.duration_in_days} ${
                                group.duration_in_days === 1 ? 'Day' : 'Days'
                              }`
                            : `${Math.floor(group.duration_in_days / 7)} ${
                                Math.floor(group.duration_in_days / 7) === 1
                                  ? 'Week'
                                  : 'Weeks'
                              }`}
                        </span>
                      </div>
                    )}
                  </div>

                  <h2 className="mt-4 text-xl font-semibold text-gray-900">
                    {group.name}
                  </h2>

                  <div className="mt-4 flex items-center gap-3">
                    <Image
                      src={group.created_by.avatar_url || '/images/avatar.jpg'}
                      alt="mentor"
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {group.created_by.first_name}{' '}
                        {group.created_by.last_name}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <div className="mb-2 flex justify-between text-xs">
                      <span>Capacity</span>

                      <span className="font-medium">
                        {group.current_students_count}/
                        {group.max_no_of_students} Students
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full bg-[#D4AF37] transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                    <Image
                      src="/images/calender.png"
                      alt="calendar"
                      width={14}
                      height={14}
                    />

                    <span>
                      Starts{' '}
                      {group.start_date
                        ? new Date(group.start_date).toLocaleDateString()
                        : 'Soon'}
                    </span>
                  </div>

                  <div
                    className={`mt-3 flex items-center gap-2 text-sm ${
                      group.status === 'member'
                        ? 'text-primary'
                        : group.status === 'pending'
                          ? 'text-[#6E591A]'
                          : 'text-text'
                    }`}
                  >
                    <Image
                      src={
                        group.status === 'member'
                          ? '/images/member.png'
                          : group.status === 'pending'
                            ? '/images/pending.png'
                            : '/images/not-member.png'
                      }
                      alt="status"
                      width={14}
                      height={14}
                    />

                    <span>
                      {group.status === 'member'
                        ? 'Member'
                        : group.status === 'pending'
                          ? 'Pending Approval'
                          : 'Enrollment Open'}
                    </span>
                  </div>

                  {group.current_students_count < group.max_no_of_students ? (
                    <button
                      disabled={
                        joinMutation.isPending || group.status === 'pending'
                      }
                      onClick={() => {
                        if (group.status === 'member') {
                          router.push(`/group/${group.id}`);
                          return;
                        }

                        if (group.status !== 'pending') {
                          joinMutation.requestToJoin({
                            group_id: group.id,
                          });
                        }
                      }}
                      className={`mt-5 w-full cursor-pointer rounded-lg py-3 text-sm font-medium transition ${
                        group.status === 'member'
                          ? 'border border-primary bg-white text-primary hover:bg-primary hover:text-white'
                          : group.status === 'pending'
                            ? 'cursor-not-allowed bg-gray-300 text-white'
                            : 'bg-primary text-white hover:opacity-90'
                      }`}
                    >
                      {group.status === 'member'
                        ? 'Open Group'
                        : group.status === 'pending'
                          ? 'Pending Approval'
                          : 'Request to Join'}
                    </button>
                  ) : (
                    <div className="mt-5 rounded-lg bg-[#F2F4F7] py-3 text-center text-sm font-medium text-[#667085]">
                      🎓 This group is currently full. Stay tuned for new spots!
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Mobile Infinite Scroll Sentinel */}
          {hasMore && (
            <div ref={loadMoreRef} className="h-1 w-full" aria-hidden="true" />
          )}

          {/* Pagination Info + Load More */}
          <div className="mt-8 flex flex-col items-center gap-3">
            <p className="text-xs font-semibold text-[#6F797A]">
              Showing {groups.length} of {totalCount} learning groups
            </p>

            {/* Desktop Load More */}
            {hasMore && (
              <button
                type="button"
                disabled={groupsQuery.isFetchingNextPage}
                onClick={handleLoadMore}
                className="hidden min-w-[180px] cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#E6E3D0] px-5 py-2.5 text-sm font-medium text-[#666556] transition hover:bg-[#DFDCC8] disabled:cursor-not-allowed disabled:opacity-60 lg:flex"
              >
                {groupsQuery.isFetchingNextPage
                  ? 'Loading...'
                  : 'Load More Groups'}

                {!groupsQuery.isFetchingNextPage && (
                  <span className="text-xs">
                    <LoadArrow />
                  </span>
                )}
              </button>
            )}

            {/* Mobile Loading */}
            {groupsQuery.isFetchingNextPage && (
              <div className="flex items-center justify-center py-3 lg:hidden">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-primary" />
              </div>
            )}

            {/* Mobile Next Page Error */}
            {groupsQuery.isFetchNextPageError && (
              <button
                type="button"
                onClick={handleLoadMore}
                className="text-sm font-medium text-red-500 underline lg:hidden"
              >
                Failed to load groups. Try again
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
