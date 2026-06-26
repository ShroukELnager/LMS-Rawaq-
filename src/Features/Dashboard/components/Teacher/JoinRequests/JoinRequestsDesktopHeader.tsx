'use client';

import { JoinRequestsHeaderProps } from '@/Features/Dashboard/Types';
import Image from 'next/image';
import Select from 'react-select';

export default function JoinRequestsHeader({ count }: JoinRequestsHeaderProps) {
  const options = [
    {
      value: 'all',
      label: 'All groups',
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
    {
      value: 'algorithms',
      label: 'Algorithms & Data Structures',
    },
  ];

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="flex items-center gap-3 text-2xl font-semibold text-gray-900">
          Join Requests
          <span
            className="
              inline-flex
              h-7
              min-w-[36px]
              items-center
              justify-center
              rounded-full
              bg-[#F5E7B8]
              px-3
              text-sm
              font-semibold
              text-gray-700
            "
          >
            {count}
          </span>
        </h1>

        <p className="text-sm text-gray-500">
          Review and manage student requests to join your groups.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full md:w-1/2 lg:w-1/3">
          <Image
            src="/images/search.png"
            alt="search"
            width={16}
            height={16}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              opacity-50
            "
          />

          <input
            type="text"
            placeholder="Search by student name or email"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              py-3
              pl-11
              pr-4
              text-sm
              outline-none
              focus:border-primary
            "
          />
        </div>

        {/* Desktop Select only */}
        <div className="hidden w-full md:block md:w-64">
          <Select
            options={options}
            defaultValue={options[0]}
            className="text-sm"
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: '12px',
                borderColor: '#d1d5db',
                padding: '2px',
                boxShadow: 'none',
                minHeight: '44px',
              }),

              menu: (base) => ({
                ...base,
                borderRadius: '12px',
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
}
