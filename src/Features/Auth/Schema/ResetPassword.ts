import { z } from "zod";

export const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8)
      .regex(/[A-Z]/)
      .regex(/[a-z]/)
      .regex(/\d/)
      .regex(/[!@#$%^&*]/),

    confirmedPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords do not match",
    path: ["confirmedPassword"],
  });

