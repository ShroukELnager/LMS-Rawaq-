import { useQuery } from '@tanstack/react-query';

import { getAllTeacherGroupsService } from '../lib/Services/teacher/getAllGroups.service';

export const useGetAllTeacherGroups = () => {
  return useQuery({
    queryKey: ['teacher-groups'],
    queryFn: getAllTeacherGroupsService,
  });
};
