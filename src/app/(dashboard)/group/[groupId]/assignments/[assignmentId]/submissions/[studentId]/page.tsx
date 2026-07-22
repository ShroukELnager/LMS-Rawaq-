"use client"
import StudentSubmissionDetails from '@/Features/Dashboard/Components/Teacher/SubmissionReviews/StudentSubmissionDetails'
import { useParams } from 'next/navigation';

export default function page() {
     const params = useParams();
      const assignmentId = params?.assignmentId as string;
      const studentId = params?.studentId as string;
  return <StudentSubmissionDetails assignmentId={assignmentId} studentId ={studentId}/>;
}
