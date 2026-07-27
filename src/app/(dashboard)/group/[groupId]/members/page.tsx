"use client"
import GroupMembersPage from '@/Features/Dashboard/Components/Teacher/Members';
import { useParams } from 'next/navigation';

export default function page() {
      const params = useParams();
        const studentId = params?.studentId as string;

      const groupId = params?.groupId as string;
  return (
    <GroupMembersPage
      groupId={groupId}
      studentId={studentId}
    />
  );
}
