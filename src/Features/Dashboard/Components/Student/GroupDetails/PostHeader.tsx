'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import useGetSingleGroup from '@/Features/Dashboard/Hooks/useGetSingleGroup';

type AssignmentHeaderProps = {
  groupId: string;
};

export default function AssignmentHeader({
  groupId,
}: AssignmentHeaderProps) {
  const router = useRouter();

  const { data, isPending } = useGetSingleGroup(groupId);

  const group = data?.[0];

  if (isPending) {
    return (
      <div className="flex items-center gap-4 animate-pulse">
        <div className="h-10 w-10 rounded-full bg-gray-200" />

        <div className="space-y-2">
          <div className="h-7 w-64 rounded bg-gray-200" />
          <div className="h-5 w-40 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  if (!group) return null;

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => router.back()}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition hover:bg-gray-100"
      >
        <ArrowLeft className="size-6 text-[#101828]" />
      </button>

      <div>
        <h1 className="text-4xl font-bold text-[#045D6C]">
          {group.name}
        </h1>

        <p className="mt-1 text-lg text-[#667085]">
          {group.created_by.first_name} {group.created_by.last_name}
          <span className="mx-2">•</span>
          {group.current_students_count} members
        </p>
      </div>
    </div>
  );
}