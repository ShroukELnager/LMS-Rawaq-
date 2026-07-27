'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';
import { EllipsisVertical } from 'lucide-react';

import UserAvatar from '@/Shared/Utils/UserAvatar';

import { formatRequestTime } from '@/Features/Dashboard/lib/FormatRequestTime';
import {
  JoinGroupResponse,
  JoinRequestsDesktopProps,
} from '@/Features/Dashboard/Types';

import JoinRequestsHeader from './JoinRequestsDesktopHeader';

import useAcceptRequest from '@/Features/Dashboard/Hooks/useAcceptRequest';
import useRejectRequest from '@/Features/Dashboard/Hooks/useRejectRequest';

export default function JoinRequestsDesktop({
  requests,
}: JoinRequestsDesktopProps) {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const acceptRequest = useAcceptRequest();

  const rejectRequest = useRejectRequest();

  return (
    <>
      <JoinRequestsHeader count={requests?.length ?? 0} />

      {requests?.length > 0 ? (
        <div className="w-[95%] mx-auto overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F0F3FF] text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Student</th>

                <th className="px-6 py-3">Group Name</th>

                <th className="px-6 py-3">Requested</th>

                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {requests.map((row: JoinGroupResponse) => (
                <tr key={row.id} className="transition hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <UserAvatar size={44} />

                      <div>
                        <p className="font-medium text-gray-900">
                          {row.user.first_name} {row.user.last_name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {row.user.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/group.png"
                        alt="group"
                        width={14}
                        height={14}
                      />

                      <span className="font-medium text-gray-800">
                        {row.group_name}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {formatRequestTime(row.created_at)}
                  </td>

                  <td className="relative px-6 py-4">
                    <div
                      ref={openMenu === row.id ? menuRef : null}
                      className="relative flex justify-center"
                    >
                      <button
                        onClick={() => {
                          setOpenMenu(openMenu === row.id ? null : row.id);
                        }}
                      >
                        <EllipsisVertical />
                      </button>

                      {openMenu === row.id && (
                        <div className="absolute right-0 top-8 z-50 min-w-[200px] rounded-xl border border-gray-200 bg-white shadow-lg">
                          <button
                            onClick={() => {
                              acceptRequest.acceptRequest({
                                p_request_id: row.id,
                              });

                              setOpenMenu(null);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 hover:bg-green-50"
                          >
                            <Image
                              src="/images/approved.png"
                              alt="approve"
                              width={18}
                              height={18}
                            />

                            <span className="text-green-700">
                              Approve Request
                            </span>
                          </button>

                          <button
                            onClick={() => {
                              rejectRequest.rejectRequest({
                                p_request_id: row.id,
                              });

                              setOpenMenu(null);
                            }}
                            className="flex w-full items-center gap-3 px-4 py-3 hover:bg-red-50"
                          >
                            <Image
                              src="/images/rejected.png"
                              alt="reject"
                              width={18}
                              height={18}
                            />

                            <span className="text-red-600">Reject Request</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex items-center justify-center rounded-xl border border-dashed border-gray-300 bg-white py-16">
          <p className="text-sm text-gray-500">
            No join requests at the moment.
          </p>
        </div>
      )}
    </>
  );
}
