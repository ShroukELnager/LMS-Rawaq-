"use client"
import GetAssignmentSubmissions from '@/Features/Dashboard/Components/Teacher/Submissions/AssignmentSubmissionsPage'
import { useParams } from 'next/navigation';

export default function page() {
      const params = useParams();
  const assignmentId = params?.assignmentId as string;
  const groupId = params?.groupId as string;
  return <GetAssignmentSubmissions assignmentId={assignmentId} groupId={groupId}/>;
}
