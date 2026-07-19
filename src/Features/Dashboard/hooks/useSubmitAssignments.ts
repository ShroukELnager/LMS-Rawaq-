import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AssignmentSubmissionRequestBody } from '../Types';
import { SubmitAssignmentService } from "../lib/Services/student/submitAssignment.service";

export default function useSubmitAssignments() {
  const queryClient = useQueryClient();

   return useMutation({
     mutationFn: (data: AssignmentSubmissionRequestBody) =>
       SubmitAssignmentService(data),

     onSuccess: () => {

       queryClient.invalidateQueries({
         queryKey: ['assignments'],
       });
     },

     onError: () => {
       toast.error('Failed to submit assignment');
     },
   });

}