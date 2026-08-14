import { useQuery } from '@tanstack/react-query';

import { TeacherSingleGroupResponse } from '../Types';
import { GetTeacherSingleGroupService } from '../lib/Services/teacher/teacherSingleGroup.service';

export default function useGetTeacherSingleGroup(groupId: string) {
  return useQuery<TeacherSingleGroupResponse>({
    queryKey: ['singleGroup', groupId],

    queryFn: () => GetTeacherSingleGroupService(groupId),

    enabled: !!groupId,
  });
}
