import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GradeSubmissionRequest } from '../Types';
import { GradeAssignmentService } from '../lib/Services/teacher/gradeAssignment.service';

export default function useGradeAssignment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GradeSubmissionRequest) => GradeAssignmentService(data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['gradeAssignments'],
      });
    },

    onError: () => {
      toast.error('Failed to review assignment');
    },
  });
}
