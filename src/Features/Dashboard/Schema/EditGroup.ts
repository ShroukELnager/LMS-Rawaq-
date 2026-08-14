import { z } from 'zod';

export const editGroupSchema = z.object({
  name: z.string().min(1, 'Group name is required'),

  description: z.string().optional(),

  no_of_students: z.number().min(1, 'Number of students must be at least 1'),

  category: z.string().optional(),

  start_date: z.string().optional(),

  duration_in_days: z
    .number()
    .min(1, 'Duration must be a positive number')
    .optional(),
});
