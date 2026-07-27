import { useQuery } from "@tanstack/react-query";
import { getAllTeacherGroupsService } from "../lib/Services/teacher/getAllGroups.service";

export default function useGetTeacherGroups() {
  return useQuery({
    queryKey: ['teacherGroups'],
    queryFn: () => getAllTeacherGroupsService(),
  });
}