import GroupPageWrapper from "@/Shared/Components/GroupPageWrapper";

type PageProps = {
  params: Promise<{
    groupId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { groupId } = await params;

  return <GroupPageWrapper groupId={groupId} />;
}
