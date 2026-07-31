'use client';

import useGroupMembers from '@/Features/Dashboard/Hooks/useGroupMembers';
import { GroupMember } from '@/Features/Dashboard/Types';
import { MembersSkeleton } from './GroupMemberSkelton';
import { useRouter } from 'next/navigation';
import StudentAvatar from '@/Shared/Components/StudentAvatar';

export default function GroupMembers({ groupId }: { groupId: string }) {
  const { data, isPending } = useGroupMembers({
    p_group_id: groupId,
    p_page: 1,
    p_page_size: 3,
    p_search: null,
  });

  const members = data?.data ?? [];

  const router = useRouter();

  return (
    <div
      className="  flex   h-[342px]  w-[293px]  flex-col  gap-6  rounded-xl  bg-[#F0F3FF]  p-8
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-bold text-[#045D6C]">Group Members</h2>

        <button
          onClick={() => router.push(`/group/${groupId}/members`)}
          className=" cursor-pointer text-xs font-medium text-[#045D6C]
          "
        >
          View All
        </button>
      </div>

      {/* Members */}
      {isPending ? (
        <MembersSkeleton />
      ) : (
        <div className="flex flex-1 flex-col gap-3 overflow-hidden">
          {members.map((member: GroupMember) => (
            <div
              key={member.id}
              className="flex h-[66px] w-[229.33px] items-center justify-between rounded-lg border border-[#BEC8CA4D] bg-white p-3"
            >
              <StudentAvatar
                firstName={member.first_name}
                lastName={member.last_name}
                avatarUrl={member.avatar_url}
                size={40}
              />

              <div className="min-w-0 flex-1  pl-[12px]">
                <h3 className="truncate text-sm font-semibold text-[#101828]">
                  {member.first_name} {member.last_name}
                </h3>

                <p className="truncate text-[10px] text-gray-500">
                  {member.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
