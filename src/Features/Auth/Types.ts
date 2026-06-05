import {z} from "zod";
import { loginSchema } from "./Schema/Login";
import { SignupSchema } from "./Schema/SignUp";


  export  type LoginFormData  = z.infer<typeof loginSchema>;
  export  type SignUpFormData  = z.infer<typeof SignupSchema>;

  export type SignUpRequest = {
  firstName: string;
  lastName: string;
  email: string;
  accountType: "student" | "teacher";
  jobTitle?: string;
  password: string;
  avatarUrl?: string;
};

export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
};