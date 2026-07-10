import { z } from 'zod';
import { createGroupSchema } from './Schema/CreateGroup';

export type CreateGroupFormInput = z.input<typeof createGroupSchema>;
export type CreateGroupFormData = z.infer<typeof createGroupSchema>;

export interface ListGroupsResponse {
  id: string;
  name: string;
  created_at: string;
  invite_code: null;
  max_no_of_students: number;
  category: string;
  start_date: string;
  duration_in_days: number;
  current_students_count: number;

  created_by: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
  };

  status: 'member' | 'not_member' | 'pending';
}

export interface JoinGroupResponse {
  id: string;
  group_id: string;
  status: 'rejected' | 'approved' | 'pending';
  created_at: string;
  group_name: string;
  user: {
    id: string;
    email: string;
    last_name: string;
    avatar_url: string;
    first_name: string;
  };
}
export type JoinGroupRequest = {
  group_id: string;
};

export type AcceptRequest = {
  p_request_id: string;
};
export type RejectRequest = {
  p_request_id: string;
};

export type JoinRequestsProps = {
  requests: JoinGroupResponse[];
  isPending: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => void;
};

export type JoinRequestsHeaderProps = {
  count: number;
};

export type JoinRequestsDesktopProps = JoinRequestsProps;

export type JoinRequestsMobileProps = JoinRequestsProps;

export interface StudentGroups {
  id: string;
  name: string;
  created_at: string;
  category: string;
  start_date: string;
  duration_in_days: number;
  teacher: {
    id: string;
    last_name: string;
    avatar_url: string;
    first_name: string;
  };
}

export interface CreateCommentRequest {
  post_id: string;
  content: string;
}
export interface CreatePostRequest {
  group_id: string;
  author_id: string;
  content: string;
}

export interface PostCardProps {
  id: string;
  group_id: string;
  content: string;
  created_at: string;
  author_id: string;
  author: {
    id: string;
    last_name: string;
    avatar_url: string;
    first_name: string;
  };
  comments_count: number;
  likes_count: number;
  is_liked: boolean;
}

export type LikePostRequest = {
  post_id: string;
};

export interface Comment {
  id: string;

  post_id: string;

  content: string;

  created_at: string;

  author_id: string;

  author: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
  };
}

export interface AssignmentOption {
  text: string;
  is_correct: boolean;
  sort_order: number;
}

export interface AssignmentQuestion {
  question: string;
  question_type: 'text' | 'single_choice' | 'multiple_choice';
  grade: number;
  sort_order: number;

  options?: AssignmentOption[];
}

export interface AssignmentRequestBody {
  p_group_id: string;
  p_title: string;
  p_description: string;
  p_deadline: Date | null;
  p_total_grade: number;
  p_questions: AssignmentQuestion[];
}

export interface TeacherGroup {
  id:string;
  name: string;
  description: string;
  invite_code: null;
  created_at: string;
  members_count: number;
  assignments_count: number;
  posts_count: number;
}