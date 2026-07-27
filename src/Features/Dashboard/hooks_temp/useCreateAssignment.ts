import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AssignmentRequestBody, CreatePostRequest } from '../Types';
import { createAssignmentService } from "../lib/Services/teacher/createAssignment.service";

export default function useCreateAssignment() {
  const queryClient = useQueryClient();

   return useMutation({
     mutationFn: (data: AssignmentRequestBody) => createAssignmentService(data),

     onSuccess: () => {
       toast.success('Your assignment has been created successfully');

       queryClient.invalidateQueries({
         queryKey: ['assignments'],
       });
     },

     onError: () => {
       toast.error('Failed to create assignment');
     },
   });

}