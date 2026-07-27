import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { RemoveMemberRequest } from '../Types';
import { DeleteMemberService } from '../lib/Services/teacher/deleteMember.service';

export default function useDeleteMember() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data: RemoveMemberRequest) => DeleteMemberService(data),

    onMutate: async (newMember) => {
      await queryClient.cancelQueries({
        queryKey: ['groupMembers', newMember.p_group_id],
      });

      const previousMembers = queryClient.getQueryData([
        'groupMembers',
        newMember.p_group_id,
      ]);

      return { previousMembers };
    },

    onError: (_error, newMember, context) => {
      if (context?.previousMembers) {
        queryClient.setQueryData(
          ['groupMembers', newMember.p_group_id],
          context.previousMembers
        );
      }

      toast.error('Failed to remove student');
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['groupMembers', variables.p_group_id],
      });
    },

    onSuccess: () => {
      toast.success('Student removed successfully');
    },
  });

  return {
    removeMember: mutation.mutateAsync,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
