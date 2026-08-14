import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UpdateGroupPayload } from '@/Features/Dashboard/Types';
import { EditGroupService } from '../lib/Services/teacher/editGroup.service';

export default function useEditGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      data,
    }: {
      groupId: string;
      data: UpdateGroupPayload;
    }) => EditGroupService(groupId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['groups'],
      });

      queryClient.invalidateQueries({
        queryKey: ['group', variables.groupId],
      });
    },
  });
}
