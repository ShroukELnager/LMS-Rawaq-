"use client"
import CreateAssignment from '@/Features/Dashboard/Components/Teacher/Assignments/AssignmentsPage';
import { useParams } from 'next/dist/client/components/navigation';

export default function page() {
  const params = useParams();
  const groupId = params?.groupId as string;
  
  
  return (
    <div>
      <CreateAssignment groupId={groupId} />
    </div>
  );
}
