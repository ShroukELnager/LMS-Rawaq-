'use client';

import Image from 'next/image';
import Select from 'react-select';

interface TeacherGroup {
  id: string;
  name: string;
}

interface JoinRequestsHeaderProps {
  count: number;
  groups?: TeacherGroup[];
  search: string;
  selectedGroupId: string | null;
  isGroupsLoading?: boolean;
  isRequestsLoading?: boolean;
  onSearchChange: (value: string) => void;
  onGroupChange: (groupId: string | null) => void;
}

export default function JoinRequestsHeader({
  count,
  groups = [],
  search,
  selectedGroupId,
  isGroupsLoading = false,
  isRequestsLoading = false,
  onSearchChange,
  onGroupChange,
}: JoinRequestsHeaderProps) {
  const options = [
    {
      value: 'all',
      label: 'All Groups',
    },

    ...groups.map((group) => ({
      value: group.id,
      label: group.name,
    })),
  ];

  const selectedOption =
    options.find((option) => option.value === (selectedGroupId ?? 'all')) ??
    options[0];

  return (
    <div className="px-4 py-6">
      {/* Header */}
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

      {/* Filters */}
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
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by student name or email"
            className="
              w-full
              rounded-xl
              border
              border-gray-300
              bg-white
              py-3
              pl-11
              pr-10
              text-sm
              outline-none
              focus:border-primary
            "
          />

          {isRequestsLoading && (
            <div
              className="
                absolute
                right-4
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                animate-spin
                rounded-full
                border-2
                border-gray-200
                border-t-primary
              "
            />
          )}
        </div>

        {/* Group Filter */}
        <div className="w-full md:w-64">
          <Select
            options={options}
            value={selectedOption}
            isDisabled={isGroupsLoading}
            isSearchable
            onChange={(option) => {
              if (!option || option.value === 'all') {
                onGroupChange(null);
                return;
              }

              onGroupChange(option.value);
            }}
            placeholder="Select group"
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

              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? '#006d77'
                  : state.isFocused
                    ? '#E5EEEF'
                    : 'white',
                color: state.isSelected ? 'white' : '#111827',
              }),
            }}
          />
        </div>
      </div>
    </div>
  );
}
