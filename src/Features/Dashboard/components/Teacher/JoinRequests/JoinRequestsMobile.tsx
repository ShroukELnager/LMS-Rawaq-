'use client';

import Image from 'next/image';
import UserAvatar from '@/Shared/Utils/UserAvatar';
import { formatRequestTime } from '@/Features/Dashboard/lib/FormatRequestTime';
import { JoinRequestsMobileProps } from '@/Features/Dashboard/Types';

import useAcceptRequest from '@/Features/Dashboard/Hooks/useAcceptRequest';
import useRejectRequest from '@/Features/Dashboard/Hooks/useRejectRequest';

import ScrollableTabs from '@/Features/Dashboard/lib/ScrollableTabs';
import JoinRequestsHeader from './JoinRequestsDesktopHeader';

export default function JoinRequestsMobile({
  requests,
}: JoinRequestsMobileProps) {
  const acceptRequest = useAcceptRequest();

  const rejectRequest = useRejectRequest();

  const tabs = [
    {
      value: 'all',
      label: 'All Posts',
    },
    {
      value: 'frontend',
      label: 'Frontend Development',
    },
    {
      value: 'backend',
      label: 'Backend Development',
    },
    {
      value: 'react',
      label: 'React Basics',
    },
    {
      value: 'javascript',
      label: 'JavaScript Fundamentals',
    },
    {
      value: 'typescript',
      label: 'TypeScript Advanced',
    },
    {
      value: 'nextjs',
      label: 'Next.js Course',
    },
    {
      value: 'ui-ux',
      label: 'UI / UX Design',
    },
    {
      value: 'database',
      label: 'Database Concepts',
    },
  ];

  return (
    <>
      <JoinRequestsHeader count={requests?.length ?? 0} />

      <div className="mb-4 px-4 pt-4 md:hidden">
        <ScrollableTabs items={tabs} activeValue="all" onChange={() => {}} />
      </div>

      <div className="space-y-4 px-4 pb-6">
        {requests?.map((request) => (
          <div
            key={request.id}
            className="
              rounded-2xl
              border
              border-gray-100
              bg-white
              p-4
              shadow-sm
            "
          >
            <div className="flex items-start gap-3">
              <UserAvatar size={48} />

              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {request.user.first_name} {request.user.last_name}
                    </h3>

                    <p className="text-xs text-gray-500">
                      {request.user.email}
                    </p>
                  </div>

                  <span className="text-[11px] text-gray-400">
                    {formatRequestTime(request.created_at)}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-2">
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
                onClick={() =>
                  acceptRequest.acceptRequest({
                    p_request_id: request.id,
                  })
                }
                className="
                  h-11
                  w-full
                  rounded-xl
                  bg-[#005F67]
                  text-sm
                  font-medium
                  text-white
                "
              >
                Accept
              </button>

              <button
                onClick={() =>
                  rejectRequest.rejectRequest({
                    p_request_id: request.id,
                  })
                }
                className="
                  h-11
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  text-sm
                  text-gray-600
                "
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
