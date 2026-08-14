import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UnArcheiveGroupService } from '../lib/Services/teacher/unarcheiveGroupService';
import { ArcheiveRequest } from '../Types';



type Group = {
  id: string;
  is_archived: boolean;
};

type GroupResponse = Group[];

export default function useUnarcheiveGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ArcheiveRequest) => UnArcheiveGroupService(data),

    onMutate: async ({ p_group_id }) => {
      const queryKey = ['singleGroup', p_group_id];

      await queryClient.cancelQueries({
        queryKey,
      });

      const previousGroup = queryClient.getQueryData<GroupResponse>(queryKey);

      // Optimistic update
      queryClient.setQueryData<GroupResponse>(queryKey, (old) => {
        if (!old) return old;

        return old.map((group) =>
          group.id === p_group_id
            ? {
                ...group,
                is_archived: false,
              }
            : group
        );
      });

      return {
        previousGroup,
        queryKey,
      };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousGroup) {
        queryClient.setQueryData(context.queryKey, context.previousGroup);
      }

      toast.error('Failed to unarchive group');
    },

    onSuccess: (data) => {
      if (data === true) {
        toast.success('Group unarchived successfully');
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['singleGroup', variables.p_group_id],
      });
    },
  });
}
