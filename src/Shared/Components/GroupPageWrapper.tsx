'use client';

import { useAppSelector } from '@/redux/hooks';

import GroupPage from '@/Features/Dashboard/Components/Student/GroupDetails/GroupPage';
import SingleGroupPage from '@/Features/Dashboard/Components/Teacher/SingleGroup/SingleGroupPage';

type Props = {
  groupId: string;
};

export default function GroupPageWrapper({ groupId }: Props) {
  const user = useAppSelector((state) => state.user.user);

  const role = user?.user_metadata?.account_type;

  return role === 'teacher' ? (
    <SingleGroupPage groupId={groupId} />
  ) : (
    <GroupPage groupId={groupId} />
  );
}
