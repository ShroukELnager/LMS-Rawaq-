import React from 'react'
import GroupMembersTable from './GroupMembersTable'
import useGroupMembers from '@/Features/Dashboard/Hooks/useGroupMembers';

export default function GroupMembersPage({
  groupId,
  studentId,
}: {
  groupId: string;
  studentId
:string}) {
  const { data, isPending } = useGroupMembers({
    p_group_id: groupId,
    p_page: 1,
    p_page_size: 3,
    p_search: null,
  });

  const members = data?.data ?? [];
  return <GroupMembersTable groupId={groupId}  />;
}
