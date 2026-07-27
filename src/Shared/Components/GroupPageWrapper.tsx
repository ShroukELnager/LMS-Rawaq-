'use client';

import GroupPage from '@/Features/Dashboard/Components/Student/GroupDetails/GroupPage';
import SingleGroupPage from '@/Features/Dashboard/Components/Teacher/SingleGroup/SingleGroupPageComponent';
import { useAppSelector } from '@/redux/hooks';


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
