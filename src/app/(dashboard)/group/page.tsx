'use client';

import ListGroups from '@/Features/Dashboard/Components/Student/AllGroups';
import TeacherGroupsPage from '@/Features/Dashboard/Components/Teacher/Groups/Get';
import { useAppSelector } from '@/redux/hooks';

export default function ListGroupsPage() {
  const user = useAppSelector((state) => state.user.user);

  const role = user?.user_metadata?.account_type;

  return role === 'teacher' ? <TeacherGroupsPage /> : <ListGroups />;
}
