import {z} from "zod";
import { loginSchema } from "./Schema/Login";
import { SignupSchema } from "./Schema/SignUp";
import { ResetPasswordSchema } from "./Schema/ResetPassword";


  export  type SignUpFormData  = z.infer<typeof SignupSchema>;
  export  type ResetPasswordFormData  = z.infer<typeof ResetPasswordSchema>;

  export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  accountType: "student" | "teacher";
  jobTitle?: string;
  password: string;
  avatarUrl?: string;
};
  export type ForgetPasswordRequest = {
  email: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
};