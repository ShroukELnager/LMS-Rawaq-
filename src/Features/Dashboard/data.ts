
export interface Instructor {
  id: string;
  fullName: string;
  avatar: string;
}

export interface Group {
  id: string;
  title: string;
  description: string;
  instructor: Instructor;
}

export interface Post {
  id: string;
  authorName: string;
  authorAvatar: string;
  createdAt: string;
  content: string;
  commentsCount: number;
  likesCount: number;
}

export type AssignmentStatus =
  | 'submitted'
  | 'pending'
  | 'late'
  | 'graded';

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  status: AssignmentStatus;
}
export type AssignmentCardProps = {
  assignment: Assignment;
};

export const groupMock: Group = {
  id: 'group-1',
  title: 'Advanced Frontend Development',
  description:
    'Mastering modern web development with React and Tailwind CSS.',
  instructor: {
    id: 'inst-1',
    fullName: 'Dr. Sarah Ahmed',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
};

export const latestPostsMock: Post[] = [
  {
    id: 'post-1',
    authorName: 'Dr. Sarah Ahmed',
    authorAvatar: 'https://i.pravatar.cc/150?img=32',
    createdAt: '2026-06-18T09:30:00Z',
    content:
      'Reminder: The React Performance assignment deadline is approaching. Please make sure to submit your work before Friday at 11:59 PM.',
    commentsCount: 14,
    likesCount: 42,
  },
  {
    id: 'post-2',
    authorName: 'Mohamed Ali',
    authorAvatar: 'https://i.pravatar.cc/150?img=15',
    createdAt: '2026-06-17T15:45:00Z',
    content:
      'I shared a useful article about React Server Components in the resources section. Check it out and let me know your thoughts.',
    commentsCount: 8,
    likesCount: 23,
  },
  {
    id: 'post-3',
    authorName: 'Nour Hassan',
    authorAvatar: 'https://i.pravatar.cc/150?img=47',
    createdAt: '2026-06-16T11:20:00Z',
    content:
      'Can someone explain the difference between useMemo and useCallback with practical examples?',
    commentsCount: 21,
    likesCount: 18,
  },
];

export const assignmentsMock: Assignment[] = [
  {
    id: 'assignment-1',
    title: 'React Performance Optimization',
    dueDate: '2026-06-21T23:59:00Z',
    status: 'pending',
  },
  {
    id: 'assignment-2',
    title: 'TypeScript Generics Exercise',
    dueDate: '2026-06-15T23:59:00Z',
    status: 'submitted',
  },
  {
    id: 'assignment-3',
    title: 'State Management Comparison Report',
    dueDate: '2026-06-10T23:59:00Z',
    status: 'graded',
  },
  {
    id: 'assignment-4',
    title: 'Unit Testing with Jest',
    dueDate: '2026-06-12T23:59:00Z',
    status: 'late',
  },
];

