import { apiRequest } from './lib/api';
import { ForgetPasswordRequest, LoginFormData, ResetPasswordFormData, SignUpRequest } from './Types';

export const AuthService = {



  Login: async (data: LoginFormData) => {
    return apiRequest('/auth/v1/token?grant_type=password', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        apiKey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      },
    });
  },
  SignUp: async (data: SignUpRequest) => {
    return apiRequest('/auth/v1/signup', {
      method: 'POST',
      body: JSON.stringify({
        email: data.email,
        password: data.password,

        data: {
          first_name: data.firstName,
          last_name: data.lastName,
          job_title: data.jobTitle,
          avatar_url: data.avatarUrl,
          account_type: data.accountType,
        },
      }),
      headers: {
        apiKey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      },
    });
  },
  refreshToken: async (token: string) => {
    return apiRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: token,
      }),
    });
  },
  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const fileName = `${Date.now()}-${file.name}`;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}storage/v1/object/uploads/users/${fileName}`,
      {
        method: "POST",
        body: formData,
        headers: {
          apiKey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Upload failed");
    }

    return `${process.env.NEXT_PUBLIC_BASE_URL}storage/v1/object/public/uploads/users/${fileName}`;
  },
  ResetPassword: async (data: ForgetPasswordRequest) => {
    return apiRequest('/auth/v1/user', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        apiKey: process.env.NEXT_PUBLIC_SUPABASE_KEY!,
      },
    });
  },
  
};
