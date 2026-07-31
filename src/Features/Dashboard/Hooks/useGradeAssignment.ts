import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GradeSubmissionRequest } from '../Types';
import { GradeAssignmentService } from '../lib/Services/teacher/gradeAssignment.service';

type UseGradeAssignmentProps = {
  onSuccess?: () => void;
};

export default function useGradeAssignment({
  onSuccess,
}: UseGradeAssignmentProps = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GradeSubmissionRequest) => GradeAssignmentService(data),

    onSuccess: async () => {
      toast.success('Assignment reviewed successfully');

      await queryClient.invalidateQueries({
        queryKey: ['gradeAssignments'],
      });

      onSuccess?.();
    },

    onError: () => {
      toast.error('Failed to review assignment');
    },
  });
}
