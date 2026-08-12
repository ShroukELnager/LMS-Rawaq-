import { useQuery } from "@tanstack/react-query";

import {  GetSingleGroupService } from "../lib/Services/singleGroup.service";
import { SingleGroup } from '../Types';


export default function useGetSingleGroup(groupId: string) {

  return useQuery<SingleGroup[]>({
    queryKey: ['singleGroup', groupId],

    queryFn: () => GetSingleGroupService(groupId),

    enabled: !!groupId,
  });

}