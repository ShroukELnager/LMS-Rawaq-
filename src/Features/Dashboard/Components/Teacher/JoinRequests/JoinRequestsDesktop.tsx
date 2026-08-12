'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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

  const [selectedRequest, setSelectedRequest] =
    useState<JoinGroupResponse | null>(null);

  const [menuPosition, setMenuPosition] = useState({
    top: 0,
    left: 0,
  });

  const [menuPlacement, setMenuPlacement] = useState<'top' | 'bottom'>(
    'bottom'
  );

  const acceptRequest = useAcceptRequest();
  const rejectRequest = useRejectRequest();

  // =========================================================
  // Close menu when clicking outside
  // =========================================================
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (menuRef.current && !menuRef.current.contains(target)) {
        setOpenMenu(null);
        setSelectedRequest(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // =========================================================
  // Update menu position
  // =========================================================
  const updateMenuPosition = (button: HTMLButtonElement) => {
    const rect = button.getBoundingClientRect();

    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const menuHeight = menuRef.current?.getBoundingClientRect().height ?? 100;

    const gap = 8;

    const fitsBelow = spaceBelow >= menuHeight + gap;

    const fitsAbove = spaceAbove >= menuHeight + gap;

    let top: number;
    let placement: 'top' | 'bottom';

    // =======================================================
    // 1. Enough space below
    //    → Keep the normal behavior
    // =======================================================
    if (fitsBelow) {
      top = rect.bottom + gap;
      placement = 'bottom';
    }

    // =======================================================
    // 2. Not enough below but enough above
    //    → Show above
    // =======================================================
    else if (fitsAbove) {
      top = rect.top - menuHeight - gap;
      placement = 'top';
    }

    // =======================================================
    // 3. Not enough in either direction
    //    → Choose the side with more space
    // =======================================================
    else if (spaceBelow >= spaceAbove) {
      top = rect.bottom + gap;
      placement = 'bottom';
    } else {
      top = Math.max(gap, rect.top - menuHeight - gap);
      placement = 'top';
    }

    // =======================================================
    // Horizontal position
    // =======================================================
    const menuWidth = 200;

    let left = rect.right - menuWidth;

    // Don't allow popup to go outside viewport
    left = Math.max(gap, Math.min(left, window.innerWidth - menuWidth - gap));

    setMenuPosition({
      top,
      left,
    });

    setMenuPlacement(placement);
  };

  // =========================================================
  // Open / Close menu
  // =========================================================
  const handleMenuToggle = (
    event: React.MouseEvent<HTMLButtonElement>,
    row: JoinGroupResponse
  ) => {
    if (openMenu === row.id) {
      setOpenMenu(null);
      setSelectedRequest(null);
      return;
    }

    setSelectedRequest(row);
    setOpenMenu(row.id);

    // First calculate using expected popup height.
    // The real position will be recalculated after render.
    const rect = event.currentTarget.getBoundingClientRect();

    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom;

    const spaceAbove = rect.top;

    const estimatedMenuHeight = 96;
    const gap = 8;
    const menuWidth = 200;

    let top: number;
    let placement: 'top' | 'bottom';

    if (spaceBelow >= estimatedMenuHeight + gap) {
      top = rect.bottom + gap;
      placement = 'bottom';
    } else if (spaceAbove >= estimatedMenuHeight + gap) {
      top = rect.top - estimatedMenuHeight - gap;

      placement = 'top';
    } else if (spaceBelow >= spaceAbove) {
      top = rect.bottom + gap;
      placement = 'bottom';
    } else {
      top = Math.max(gap, rect.top - estimatedMenuHeight - gap);

      placement = 'top';
    }

    let left = rect.right - menuWidth;

    left = Math.max(gap, Math.min(left, window.innerWidth - menuWidth - gap));

    setMenuPosition({
      top,
      left,
    });

    setMenuPlacement(placement);
  };

  // =========================================================
  // Recalculate after popup has rendered
  // =========================================================
  useEffect(() => {
    if (!openMenu || !menuRef.current) {
      return;
    }

    const button = document.querySelector(
      `[data-action-button="${openMenu}"]`
    ) as HTMLButtonElement | null;

    if (!button) {
      return;
    }

    updateMenuPosition(button);
  }, [openMenu]);

  // =========================================================
  // Recalculate on resize / scroll
  // =========================================================
  useEffect(() => {
    if (!openMenu) {
      return;
    }

    const handleReposition = () => {
      const button = document.querySelector(
        `[data-action-button="${openMenu}"]`
      ) as HTMLButtonElement | null;

      if (button) {
        updateMenuPosition(button);
      }
    };

    window.addEventListener('resize', handleReposition);

    window.addEventListener('scroll', handleReposition, true);

    return () => {
      window.removeEventListener('resize', handleReposition);

      window.removeEventListener('scroll', handleReposition, true);
    };
  }, [openMenu]);

  return (
    <>
      <JoinRequestsHeader count={requests?.length ?? 0} />

      {requests?.length > 0 ? (
        <div className="mx-auto w-[95%] overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            {/* =========================
                Table Header
            ========================= */}
            <thead className="bg-[#F0F3FF] text-left text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3">Student</th>

                <th className="px-6 py-3">Group Name</th>

                <th className="px-6 py-3">Requested</th>

                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>

            {/* =========================
                Table Body
            ========================= */}
            <tbody className="divide-y divide-gray-100">
              {requests.map((row: JoinGroupResponse) => (
                <tr key={row.id} className="transition hover:bg-gray-50">
                  {/* Student */}
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

                  {/* Group */}
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

                  {/* Requested */}
                  <td className="px-6 py-4 text-gray-500">
                    {formatRequestTime(row.created_at)}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        type="button"
                        data-action-button={row.id}
                        onClick={(event) => handleMenuToggle(event, row)}
                        className="rounded-md p-1 hover:bg-gray-100"
                        aria-label="Actions"
                      >
                        <EllipsisVertical className="h-5 w-5" />
                      </button>
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

      {/* =====================================================
          Actions Popup
      ===================================================== */}
      {selectedRequest &&
        openMenu &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[9999] min-w-[200px] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg"
            style={{
              top: menuPosition.top,
              left: menuPosition.left,
            }}
            data-placement={menuPlacement}
          >
            {/* Approve */}
            <button
              type="button"
              onClick={() => {
                acceptRequest.acceptRequest({
                  p_request_id: selectedRequest.id,
                });

                setOpenMenu(null);
                setSelectedRequest(null);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 hover:bg-green-50"
            >
              <Image
                src="/images/approved.png"
                alt="approve"
                width={18}
                height={18}
              />

              <span className="text-green-700">Approve Request</span>
            </button>

            {/* Reject */}
            <button
              type="button"
              onClick={() => {
                rejectRequest.rejectRequest({
                  p_request_id: selectedRequest.id,
                });

                setOpenMenu(null);
                setSelectedRequest(null);
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
          </div>,
          document.body
        )}
    </>
  );
}
