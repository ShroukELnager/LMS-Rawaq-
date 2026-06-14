import {z} from "zod";
import { createGroupSchema } from "./Schema/CreateGroup";

export type CreateGroupFormInput = z.input<typeof createGroupSchema>;
export type CreateGroupFormData = z.infer<typeof createGroupSchema>;


export interface ListGroupsResponse {
     id:string,
  name:string,
  created_at:string,
  invite_code:null,
  max_no_of_students:number,
  category:string,
  start_date:string,
  duration_in_days:number,
  current_students_count:number,

  created_by: {
    id:string,
    first_name:string,
    last_name:string,
    avatar_url:string
  },

  status: 'member' | 'not_member' | 'pending'
}


export type JoinGroupRequest = {
  group_id: string;
};