'use client';
import Image from 'next/image';
import { StudentGroups } from '../../Types';
import useJoinGroups from '../../Hooks/useJoinedGroup';
import { useRouter } from 'next/navigation';
import ErrorState from '../../Errors/ErrorToLoadPage';
import JoinedGroupSkelton from '../../Skeleton/Student/joinedGroup';

export default function JoinedGroup() {
  const router = useRouter();
  const { groups, isPending, isError, error, refetch } = useJoinGroups();
  if (isPending) return <JoinedGroupSkelton />;
  if (isError)
    return <ErrorState message={error?.message} onRetry={() => refetch()} />;
  return (
    <div>
      <div className="px-4 py-6">
        <div className="flex flex-col gap-1">
          <h1 className="flex items-center gap-3 text-2xl font-semibold text-gray-900">
            My Groups
          </h1>

          <p className="text-sm text-gray-500">
            Access your learning spaces and continue your progress with your
            peers and mentors
          </p>
        </div>
      </div>
      {groups?.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {groups?.map((group: StudentGroups) => {
            return (
              <div
                key={group.id}
                className="rounded-xl border border-gray-300 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <span className="rounded-[75px] bg-primary px-3 py-1 text-sm font-medium text-white">
                    {group.category}
                  </span>
                </div>

                <h2 className="mt-4 text-xl font-semibold text-gray-900">
                  {group.name}
                </h2>

                <div className="mt-4 flex items-center gap-3">
                  <Image
                    src={group.teacher.avatar_url || '/images/avatar.jpg'}
                    alt="mentor"
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />

                  <div>
                    <p className="text-[18px] font-medium text-text">
                      Dr: {group.teacher.first_name} {group.teacher.last_name}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Image
                    src="/images/calender2.png"
                    alt="calendar"
                    width={15}
                    height={15}
                  />

                  <span>
                    Start Date:
                    <span className="text-black text-[15px]">
                      {group.start_date
                        ? new Date(group.start_date).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: '2-digit',
                              year: 'numeric',
                            }
                          )
                        : 'Soon'}
                    </span>
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">
                  <Image
                    src="/images/duration.png"
                    alt="duration"
                    width={15}
                    height={15}
                  />

                  <span>
                    Duration:
                    <span className="text-black text-[15px]">
                      {group.duration_in_days
                        ? group.duration_in_days >= 30
                          ? `${Math.floor(group.duration_in_days / 30)} months`
                          : `${group.duration_in_days} days`
                        : ''}
                    </span>
                  </span>
                </div>

                <button
                  className={`mt-5 w-full cursor-pointer rounded-lg py-3 bg-primary text-sm font-medium transition text-white`}
                  onClick={() => {
                    router.push(`/group/${group.id}`);
                  }}
                >
                  Open Group
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16">
          <p className="text-sm text-gray-500">
            You haven't joined any groups yet.
          </p>

          <button
            className="bg-primary text-white text-sm"
            onClick={() => {
              router.push('/group');
            }}
          ></button>
        </div>
      )}
    </div>
  );
}
