"use client"
import MySubmissionReview from '@/Features/Dashboard/Components/Student/MySubmissionReview'
import { useParams } from 'next/navigation';

export default function page() {
      const params = useParams();
    
      const assignmentId = params?.assignmentId as string;
  return <MySubmissionReview assignmentId ={assignmentId}/>;
}
