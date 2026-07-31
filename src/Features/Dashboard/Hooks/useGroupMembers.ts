import { useQuery } from "@tanstack/react-query";
import { GetGroupMemberResponse } from "../Types";
import { GetGroupMembersService } from "../lib/Services/teacher/GetGroupMembers.service";


interface Props {
  p_group_id: string,
  p_page: number,
  p_page_size: number,
  p_search: string |null
}

export default function useGroupMembers({

  p_group_id,
  p_page,
  p_page_size,
  p_search

}: Props) {
  return useQuery<GetGroupMemberResponse>({
    queryKey: ['groupMembers', p_group_id, p_page, p_page_size, p_search],
    queryFn: () =>
      GetGroupMembersService({
        p_group_id,
        p_page,
        p_page_size,
        p_search,
      }),
    placeholderData: (previousData) => previousData,
  });
}
