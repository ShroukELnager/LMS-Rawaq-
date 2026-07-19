"use client"
import GetAssignmentSubmissions from '@/Features/Dashboard/Components/Teacher/Submissions/AssignmentSubmissionsPage'
import { useParams } from 'next/navigation';

export default function page() {
      const params = useParams();
  const assignmentId = params?.assignmentId as string;
  return <GetAssignmentSubmissions assignmentId ={assignmentId}/>;
}
