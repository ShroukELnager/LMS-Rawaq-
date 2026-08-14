import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ArcheiveRequest } from '@/Features/Dashboard/Types';
import { ArcheiveGroupService } from '../lib/Services/teacher/archeiveGroup.service';

type Group = {
  id: string;
  is_archived: boolean;
};

type GroupResponse = Group[];

export default function useArcheiveGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ArcheiveRequest) => ArcheiveGroupService(data),

    onMutate: async ({ p_group_id }) => {
      const queryKey = ['singleGroup', p_group_id];

      // Cancel current request
      await queryClient.cancelQueries({
        queryKey,
      });

      // Save previous data for rollback
      const previousGroup = queryClient.getQueryData<GroupResponse>(queryKey);

      // Optimistic update
      queryClient.setQueryData<GroupResponse>(queryKey, (old) => {
        if (!old) return old;

        return old.map((group) =>
          group.id === p_group_id
            ? {
                ...group,
                is_archived: true,
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
      // Rollback
      if (context?.previousGroup) {
        queryClient.setQueryData(context.queryKey, context.previousGroup);
      }

      toast.error('Failed to archive group');
    },

    onSuccess: (data) => {
      if (data === true) {
        toast.success('Group archived successfully');
      }
    },

    onSettled: (_data, _error, variables) => {
      // Sync with backend
      queryClient.invalidateQueries({
        queryKey: ['singleGroup', variables.p_group_id],
      });
    },
  });
}
