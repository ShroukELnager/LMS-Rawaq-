import GroupPage from '@/Features/Dashboard/Components/Student/GroupDetails/GroupPage';

type PageProps = {
  params: Promise<{
    groupId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { groupId } = await params;

  return <GroupPage groupId={groupId} />;
}
