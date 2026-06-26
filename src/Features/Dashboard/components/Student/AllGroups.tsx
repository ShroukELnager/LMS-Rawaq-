'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { ListGroupsService } from '../../lib/Services/student/groups.service';
import { ListGroupsResponse } from '../../Types';
import GroupSkeleton from '../../Skeleton/Student/group';
import ErrorState from '../../Errors/ErrorToLoadPage';
import useRequestToJoin from '../../Hooks/useRequestToJoin';

export default function ListGroups() {
  const groupsQuery = useQuery({
    queryKey: ['listGroups'],
    queryFn: ListGroupsService,
  });

  const joinMutation = useRequestToJoin();

  if (groupsQuery.isPending) {
    return <GroupSkeleton />;
  }
  if (groupsQuery.isError) {
    return (
      <ErrorState
        message={groupsQuery.error.message}
        onRetry={() => groupsQuery.refetch()}
      />
    );
  }

  return (
    <div className="p-4 lg:p-6">
      <div>
        <h1 className="text-3xl font-bold text-primary">
          Explore Learning Groups
        </h1>

        <p className="mt-2 text-gray-500">
          Join a group and start your learning journey
        </p>
      </div>

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
          placeholder="Search for groups or mentors..."
          className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-11 pr-4 outline-none focus:border-primary"
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {groupsQuery.data?.map((group: ListGroupsResponse) => {
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

                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Image
                    src="/images/clock.png"
                    alt="clock"
                    width={12}
                    height={12}
                  />
                  {group.duration_in_days} Weeks
                </div>
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
                    {group.created_by.first_name} {group.created_by.last_name}
                  </p>
                </div>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-xs">
                  <span>Capacity</span>

                  <span className="font-medium">
                    {group.current_students_count}/{group.max_no_of_students}{' '}
                    Students
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
                className={`mt-3 flex items-center gap-2 text-sm  ${
                  group.status === 'member'
                    ? 'text-primary'
                    : group.status === 'pending'
                      ? 'text-[#6E591A]'
                      : 'text-text'
                } `}
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
                  onClick={() =>
                    group.status !== 'pending' &&
                    joinMutation.requestToJoin({
                      group_id: group.id,
                    })
                  }
                  className={`mt-5 w-full rounded-lg py-3 text-sm font-medium transition ${
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
                <div
                  className="
      mt-5
      rounded-lg
      bg-[#F2F4F7]
      py-3
      text-center
      text-sm
      font-medium
      text-[#667085]
    "
                >
                  🎓 This group is currently full. Stay tuned for new spots!
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
