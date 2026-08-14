'use client';

import { useMemo, useState } from 'react';

import useGroupMembers from '@/Features/Dashboard/Hooks/useGroupMembers';
import useDeleteMember from '@/Features/Dashboard/Hooks/useDeleteMember';

import { GroupMember } from '@/Features/Dashboard/Types';

import StudentAvatar from '@/Shared/Components/StudentAvatar';

import { Search } from 'lucide-react';

import Trash2 from '@/assets/icons/delete (2).svg';
import GroupMembersHeader from './GroupMembersHeader';
import GroupMembersHeaderSkeleton from './GroupMembersHeaderSkeleton';
import GroupMembersTableSkeleton from './GroupMembersTableSkeleton';
import { debounce } from '@/Features/Dashboard/lib/debonce';
import Pagination from '@/Shared/Components/Pagination';
import { GetGroupMembersService } from '@/Features/Dashboard/lib/Services/teacher/GetGroupMembers.service';
import useGetSingleGroup from '@/Features/Dashboard/Hooks/useGetStudentSingleGroup';

const formatName = (firstName: string, lastName: string) => {
  const capitalize = (value: string) =>
    value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();

  return `${capitalize(firstName)} ${capitalize(lastName)}`;
};

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));

export default function GroupMembersTable({ groupId }: { groupId: string }) {
  const [search, setSearch] = useState('');

  const [page, setPage] = useState(1);
  const { data: groupData, isPending } = useGetSingleGroup(groupId);

  const group = groupData?.[0];

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearch(value);
      }, 500),
    []
  );
  const { data, isLoading } = useGroupMembers({
    p_group_id: groupId,
    p_page: page,
    p_page_size: 3,
    p_search: search || null,
  });

  const { removeMember, isPending: isDeleting } = useDeleteMember();

  const [selectedStudent, setSelectedStudent] = useState<GroupMember | null>(
    null
  );

  const members = data?.data ?? [];

  const handleRemove = async () => {
    if (!selectedStudent) return;

    await removeMember({
      p_group_id: groupId,
      p_student_id: selectedStudent.id,
    });

    setSelectedStudent(null);
  };

  const handleExport = async () => {
    if (!data?.pagination?.total_pages) return;

    const allStudents = [];

    for (let page = 1; page <= data.pagination.total_pages; page++) {
      const res = await GetGroupMembersService({
        p_group_id: groupId,
        p_page: page,
        p_page_size: 10,
        p_search: null,
      });

      allStudents.push(...res.data);
    }

    const headers = [
      'First Name',
      'Last Name',
      'Full Name',
      'Email',
      'Joined At',
    ];

    const rows = allStudents.map((student) => [
      student.first_name,
      student.last_name,
      `${student.first_name} ${student.last_name}`,
      student.email,
      new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date(student.created_at)),
    ]);

    const csv = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `group-members-${group?.name}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-[#F7F8FC] p-6">
      {isLoading ? (
        <>
          <GroupMembersHeaderSkeleton />
          <GroupMembersTableSkeleton />
        </>
      ) : (
        <>
          <GroupMembersHeader
            data={data}
            onExport={handleExport}
            name={group?.name ?? null}
          />
          <div className="overflow-hidden rounded-xl bg-white shadow-sm">
            <div className="px-6 pt-6">
              <div className="flex h-[49px] w-[384px] items-center gap-3 rounded-lg border border-[#BEC8CA80] bg-[#F0F3FF] px-4">
                <Search size={18} className="text-[#667085]" />

                <input
                  onChange={(e) => debouncedSearch(e.target.value)}
                  placeholder="Search by student name or email..."
                  className="flex-1 bg-transparent font-[Inter] text-[14px] text-[#111C2C] outline-none placeholder:text-[#667085]"
                />
              </div>
            </div>

            <div className="mt-6">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F0F3FF] text-left text-xs text-[#344054]">
                    <th className="px-6 py-4 font-medium">Student</th>
                    <th className="px-6 py-4 font-medium">Email</th>
                    <th className="px-6 py-4 font-medium">Joined At</th>
                    <th className="px-6 py-4 text-center font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {members.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-10 text-center">
                        <h3 className="font-semibold text-[#344054]">
                          No Students Found
                        </h3>
                      </td>
                    </tr>
                  ) : (
                    members.map((member: GroupMember) => (
                      <tr key={member.id} className="border-b border-gray-100">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <StudentAvatar
                              firstName={member.first_name}
                              lastName={member.last_name}
                              avatarUrl={member.avatar_url}
                              size={48}
                            />

                            <span className="font-[Inter] text-[16px] font-bold leading-6 text-[#111C2C]">
                              {formatName(member.first_name, member.last_name)}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-5 font-[Inter] text-[16px] leading-6 text-[#3E494A]">
                          {member.email}
                        </td>

                        <td className="px-6 py-5 font-[Inter] text-[16px] leading-6 text-[#3E494A]">
                          {formatDate(member.created_at)}
                        </td>

                        <td className="px-6 py-5 text-center">
                          <button
                            onClick={() => setSelectedStudent(member)}
                            className="cursor-pointer text-gray-500 transition hover:text-red-500"
                          >
                            <Trash2 />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="rounded-xl bg-white p-6 shadow-xl">
            <p className="mb-6 font-[Inter] text-sm text-[#3E494A]">
              Are you sure you want to remove{' '}
              <span className="font-semibold text-[#045D6C]">
                {selectedStudent.first_name} {selectedStudent.last_name}
              </span>{' '}
              from the group?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedStudent(null)}
                className="cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-600"
              >
                Cancel
              </button>

              <button
                disabled={isDeleting}
                onClick={handleRemove}
                className="cursor-pointer rounded-lg bg-primary px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                {isDeleting ? 'Removing...' : 'Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="hidden pb-20 sm:block">
        <Pagination
          currentPage={page}
          totalCount={data?.pagination.total_count ?? 0}
          pageSize={3}
          onPageChange={setPage}
          label="students"
        />
      </div>
    </div>
  );
}
