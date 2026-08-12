import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AssignmentDetailsRequestBody } from '../Types';
import { GetAssignmentDetailsService } from '../lib/Services/student/getAssignmentDetails.service';

export default function useGetAssignmentDetails() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: AssignmentDetailsRequestBody) =>
      GetAssignmentDetailsService(data),

    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ['assignment-details'],
      });
    },

    onError: () => {
      toast.error('Failed to retrieve assignment details');
    },
  });

  return {
    assignmentDetails: mutation.data, 
    assignmentDetailsMutation: mutation.mutate, 
    assignmentDetailsAsync: mutation.mutateAsync, 
    isPending: mutation.isPending,
    error: mutation.error,
  };
}
