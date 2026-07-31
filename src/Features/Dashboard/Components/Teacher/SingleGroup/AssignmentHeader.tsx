'use client';

import { CirclePlus, ClipboardList } from 'lucide-react';

import useGetSingleGroup from '@/Features/Dashboard/Hooks/useGetSingleGroup';
import { useRouter } from 'next/navigation';

type AssignmentHeaderProps = {
  groupId: string;
};

export default function AssignmentHeader({ groupId }: AssignmentHeaderProps) {
  const { data, isPending } = useGetSingleGroup(groupId);
  const group=data?.[0]
console.log('data',group)
const router = useRouter();
  if (isPending) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-24 rounded bg-gray-200" />
        <div className="h-12 w-96 rounded bg-gray-200" />
        <div className="h-6 w-[500px] rounded bg-gray-200" />
        <div className="mt-6 flex gap-4">
          <div className="h-12 w-44 rounded-xl bg-gray-200" />
          <div className="h-12 w-44 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-[#006D77] px-3 py-1 text-xs font-semibold text-white">
          Active
        </span>

        <span className="text-sm text-gray-500">
          Created{' '}
          {group?.created_at
            ? new Date(group.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })
            : '-'}
        </span>
      </div>

      <h1 className="mt-5 text-5xl font-bold text-[#045D6C]">{group?.name}</h1>

      {/* <p className="mt-4 max-w-3xl text-lg leading-8 text-gray-600">
        {group.}
      </p> */}

      <div className="mt-8 flex flex-wrap gap-4">
        <button
          onClick={() => {
            router.push(`/group/${groupId}/posts/`);
          }}
          className="flex items-center cursor-pointer gap-2 rounded-md bg-[#006D77] px-6 py-3 font-medium text-white transition hover:bg-[#00545c]"
        >
          <CirclePlus size={18} />
          Create New Post
        </button>

        <button
          onClick={() => {
            router.push(`/group/${groupId}/assignments/create`);
          }}
          className="flex items-center cursor-pointer gap-2 rounded-md border border-[#006D77] px-6 py-3 font-medium text-[#006D77] transition hover:bg-[#006D77] hover:text-white"
        >
          <ClipboardList size={18} />
          Create Assignment
        </button>
      </div>
    </div>
  );
}
