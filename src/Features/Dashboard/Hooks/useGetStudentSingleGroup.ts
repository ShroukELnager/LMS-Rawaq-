import { useQuery } from "@tanstack/react-query";

import { SingleGroup } from '../Types';
import { GetSingleGroupService } from "../lib/Services/student/studentSingleGroup.service";


export default function useGetSingleGroup(groupId: string) {

  return useQuery<SingleGroup[]>({
    queryKey: ['singleGroup', groupId],

    queryFn: () => GetSingleGroupService(groupId),

    enabled: !!groupId,
  });

}