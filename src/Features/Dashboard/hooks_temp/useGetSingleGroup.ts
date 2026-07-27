import { useQuery } from "@tanstack/react-query";

import {  GetSingleGroupService } from "../lib/Services/singleGroup.service";


export default function useGetSingleGroup(groupId: string) {

  return useQuery({
    queryKey: ['singleGroup', groupId],

    queryFn: () => GetSingleGroupService(groupId),

    enabled: !!groupId,
  });

}