'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ChevronRight,
  Pencil,
  Settings,
  Archive,
  ArchiveRestore,
  X,
} from 'lucide-react';

import useGetTeacherSingleGroup from '@/Features/Dashboard/Hooks/useGetTeacherSingleGroup';
import useArcheiveGroup from '@/Features/Dashboard/Hooks/useArcheive';
import useUnarcheiveGroup from '@/Features/Dashboard/Hooks/useUnarcheive';
import { useRouter } from 'next/navigation';


type GroupSettingsProps = {
  groupId: string;
};

type DialogAction = 'archive' | 'unarchive' | null;

export default function GroupSettings({ groupId }: GroupSettingsProps) {
  const { data, isPending: isGroupLoading } = useGetTeacherSingleGroup(groupId);
const router=useRouter()
  const group = data?.[0];
console.log('data',data)
  const archiveMutation = useArcheiveGroup();
  const unarchiveMutation = useUnarcheiveGroup();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<DialogAction>(null);

  const isPending = archiveMutation.isPending || unarchiveMutation.isPending;

  const openArchiveDialog = () => {
    setDialogAction('archive');
    setDialogOpen(true);
  };

  const openUnarchiveDialog = () => {
    setDialogAction('unarchive');
    setDialogOpen(true);
  };

  const closeDialog = () => {
    if (isPending) return;

    setDialogOpen(false);
    setDialogAction(null);
  };

  const handleConfirm = () => {
    if (!dialogAction) return;

    if (dialogAction === 'archive') {
      archiveMutation.mutate(
        {
          p_group_id: groupId,
        },
        {
          onSuccess: () => {
            setDialogOpen(false);
            setDialogAction(null);
          },
        }
      );

      return;
    }

    if (dialogAction === 'unarchive') {
      unarchiveMutation.mutate(
        {
          p_group_id: groupId,
        },
        {
          onSuccess: () => {
            setDialogOpen(false);
            setDialogAction(null);
          },
        }
      );
    }
  };

  /*
   * Close dialog after successful mutation.
   *
   * This is also handled in handleConfirm,
   * but keeping the effect makes the component
   * safe if the mutation is triggered elsewhere.
   */
  useEffect(() => {
    if (!isPending && dialogOpen) {

    }
  }, [isPending, dialogOpen]);

  if (isGroupLoading) {
    return (
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <Settings size={20} className="text-[#045D6C]" />

          <h2 className="text-lg font-bold text-[#101828]">Group Settings</h2>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          <div className="h-[61px] animate-pulse bg-gray-100" />

          <div className="h-[61px] animate-pulse border-t bg-gray-100" />
        </div>
      </div>
    );
  }

  if (!group) {
    return null;
  }

  const isArchived = group.is_archived;

  return (
    <>
      <div className="mt-8">
        {/* Header */}
        <div className="mb-4 flex items-center gap-2">
          <Settings size={20} className="text-[#045D6C]" />

          <h2 className="text-lg font-bold text-[#101828]">Group Settings</h2>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {/* Edit Group */}
          <button
            type="button"
            onClick={() => {
              router.push(`/group/${groupId}/edit`);
            }}
            disabled={isPending}
            className="flex w-full cursor-pointer items-center justify-between border-b border-[#BEC8CA1A] px-5 py-4 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <Pencil size={18} className="text-gray-600" />

              <span className="font-medium text-[#101828]">
                Edit Group Info
              </span>
            </div>

            <ChevronRight size={18} className="text-gray-400" />
          </button>

          {/* Archive / Unarchive */}
          {isArchived ? (
            <button
              type="button"
              disabled={isPending}
              onClick={openUnarchiveDialog}
              className="flex w-full cursor-pointer items-center justify-between px-5 py-4 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <ArchiveRestore size={18} className="text-green-600" />

                <span className="font-medium text-green-600">
                  {unarchiveMutation.isPending
                    ? 'Unarchiving...'
                    : 'Unarchive Group'}
                </span>
              </div>

              {!isPending && (
                <ChevronRight size={18} className="text-green-300" />
              )}
            </button>
          ) : (
            <button
              type="button"
              disabled={isPending}
              onClick={openArchiveDialog}
              className="flex w-full cursor-pointer items-center justify-between px-5 py-4 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <div className="flex items-center gap-3">
                <Archive size={18} className="text-red-600" />

                <span className="font-medium text-red-600">
                  {archiveMutation.isPending ? 'Archiving...' : 'Archive Group'}
                </span>
              </div>

              {!isPending && (
                <ChevronRight size={18} className="text-red-300" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {dialogOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && !isPending) {
                closeDialog();
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              className="relative w-full max-w-[440px] rounded-2xl bg-white p-6 shadow-2xl"
              onMouseDown={(event) => {
                event.stopPropagation();
              }}
            >
              {/* Close */}
              <button
                type="button"
                onClick={closeDialog}
                disabled={isPending}
                className="absolute right-4 top-4 rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={20} />
              </button>

              {/* Icon */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  dialogAction === 'archive' ? 'bg-red-50' : 'bg-green-50'
                }`}
              >
                {dialogAction === 'archive' ? (
                  <Archive size={22} className="text-red-600" />
                ) : (
                  <ArchiveRestore size={22} className="text-green-600" />
                )}
              </div>

              {/* Title */}
              <h2 className="mt-5 text-xl font-bold text-[#101828]">
                {dialogAction === 'archive'
                  ? 'Archive this group?'
                  : 'Unarchive this group?'}
              </h2>

              {/* Description */}
              <p className="mt-3 text-sm leading-6 text-[#475467]">
                {dialogAction === 'archive'
                  ? 'Students will no longer be able to access this group or submit new activity. The group and its existing data will be preserved.'
                  : 'This will make the group active and allow students to access it again.'}
              </p>

              {/* Actions */}
              <div className="mt-7 flex justify-end gap-3">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={closeDialog}
                  className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={isPending}
                  onClick={handleConfirm}
                  className={`min-w-[130px] rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
                    dialogAction === 'archive'
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-[#006D77] hover:bg-[#00545c]'
                  }`}
                >
                  {isPending
                    ? dialogAction === 'archive'
                      ? 'Archiving...'
                      : 'Unarchiving...'
                    : dialogAction === 'archive'
                      ? 'Archive Group'
                      : 'Unarchive Group'}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
