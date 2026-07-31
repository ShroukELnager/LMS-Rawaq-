import { useQuery } from "@tanstack/react-query";

import {  GetSingleGroupService } from "../lib/Services/singleGroup.service";
import { Category } from "../Types";


export default function useGetSingleGroup(groupId: string) {

  return (
    useQuery <
    Category[]>({
      queryKey: ['singleGroup', groupId],

      queryFn: () => GetSingleGroupService(groupId),

      enabled: !!groupId,
    })
  );

}