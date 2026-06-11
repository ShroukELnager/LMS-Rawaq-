import { z } from "zod";

export const createGroupSchema = z.object({
  name: z.string().min(3, "Group name must be at least 3 characters"),

  description: z.string().max(1000).optional(),

  no_of_students: z.coerce
    .number()
    .min(1, "Number of students must be at least 1"),

  category: z.string().max(100).optional(),

start_date: z
  .string()
  .transform((value) => value || undefined)
  .optional()
  .refine(
    (date) => {
      if (!date) return true;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return new Date(date) >= today;
    },
    {
      message: "Start date cannot be in the past",
    }
  ),

  duration_in_days: z.coerce
    .number()
    .int("Duration must be a whole number")
    .positive("Duration must be greater than 0")
    .optional(),
});