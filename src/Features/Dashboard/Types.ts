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

export type Option = {
  id: string;
  option_text: string;
};

export type Question = {
  id: string;
  question: string;
  question_type: 'single_choice' | 'multiple_choice' | 'text';
  grade: number;
  sort_order: number;
  options: Option[];
};

export type AssignmentQuestionsProps = {
  questions: Question[];
  assignmentId: string;
};

export interface TeacherGroup {
  id: string;
  name: string;
  description: string;
  invite_code: null;
  created_at: string;
  members_count: number;
  assignments_count: number;
  posts_count: number;
}

export interface Assignment {
  id: string;
  group_id: string;
  title: string;
  description: string;
  deadline: string;
  total_grade: number;

  created_by: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
  };

  submitted: boolean;
  reviewed: boolean;

  submission_id: string;
  submitted_at: string;
  status: string;
  total_grade_awarded: number | null;
}

export interface AssignmentDetailsRequestBody {
  p_assignment_id: string;
}

export interface AssignmentDetails {
  id: string;
  title: string;
  description: string;
  group_id: string;
  deadline: string;
  created_at: string;
  total_grade: number;
  can_submit: boolean;
  is_late: boolean;
  questions: AssignmentAnswer[];
  submission: AssignmentSubmission;
}

export interface AssignmentSubmission {
  id: string;
  assignment_id: string;
  student_id: string;
  status: 'submitted' | 'not-submitted' | 'is_late' | 'graded';
  submitted_at: string | null;
  total_grade_awarded: number | null;
}

export interface AssignmentAnswer {
  question_id: string;
  selected_option_ids?: string[];
  text_answer?: string;
}

export interface AssignmentSubmissionRequestBody {
  p_assignment_id: string;
  p_answers: AssignmentAnswer[];
}
export interface GetGroupAssignmentsRequest {
  p_group_id: string;
}

export interface GroupAssignmentsResponse {
  id: string;
  title: string;
  description: string;
  deadline: string;
  total_grade: number;
  status: string;
  number_of_questions: number;
  number_of_submissions: number;
  total_students: number;
}

export interface GetAssignmentSubmissionsRequest {
  p_assignment_id: string;
  p_status: string | null;
  p_search: string | null;
}

export interface SubmittedAssaignment {
  id: string;
  title: string;
  deadline: string;
  reviewed: number;
  submitted: number;
  total_grade: number;
  not_submitted: number;
  total_students: number;
}
export interface Student {
  status: string;
  user_id: string;
  last_name: string;
  avatar_url: string;
  first_name: string;
  submitted_at: string | null;
  total_grade_awarded: number | null;
}
export interface AssignmentSubmissionsResponse {
  students: Student[];
  assignment: SubmittedAssaignment;
}

export interface SubmissionReviewRequest {
  p_assignment_id: string;
  p_student_id: string;
}

export type SubmissionReviewResponse = {
  status: 'submitted' | 'reviewed' | 'not_submitted';

  student: {
    id: string;
    first_name: string;
    last_name: string;
    avatar_url: string;
  };

  questions: QuestionDetails[];

  total_grade: number;
  submitted_at: string;
  submission_id: string;
  total_grade_awarded: number | null;
};

export type QuestionDetails = {
  id: string;
  grade: number;
  options: QuestionOption[] | null;
  question: string;
  reviewed_at: string | null;
  grade_awarded: number | null;
  question_type: 'text' | 'single_choice' | 'multiple_choice';

  student_answer: string | null;
  teacher_feedback: string | null;

  selected_option_ids: string[];
};

export type QuestionOption = {
  id: string;
  text: string;
  selected: boolean;
  is_correct: boolean;
};