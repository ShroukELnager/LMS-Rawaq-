"use client"
import StudentAssignmentsGroup from '@/Features/Dashboard/Components/Student/AssignmentsGroup/AssignmentsGroup';
import TeacherAssignmentsGroup from '@/Features/Dashboard/Components/Teacher/AssignmentsGroups';
import { useAppSelector } from '@/redux/hooks';
import { useParams } from 'next/dist/client/components/navigation';

export default function page() {
  const params = useParams();
  const groupId = params?.groupId as string;
  const user = useAppSelector((state) => state.user.user);

  const role = user?.user_metadata?.account_type;

  return role === 'teacher' ? (
    <TeacherAssignmentsGroup groupId={groupId} />
  ) : (
    <StudentAssignmentsGroup groupId={groupId} />
  );

}
