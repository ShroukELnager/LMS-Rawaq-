import { apiRequest } from './lib/api';
import { LoginForm } from './Schema/Login';
import {
  ForgetPasswordRequest,
  ResetPasswordFormData,
  SignUpRequest,
} from './Types';

export const AuthService = {
  Login: async (data: LoginForm) => {
    return apiRequest('/auth/v1/token?grant_type=password', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        apiKey: process.env.SUPABASE_KEY!,
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
        apiKey: process.env.SUPABASE_KEY!,
      },
    });
  },

  refreshToken: async (token: string) => {
    return apiRequest('auth/v1/token?grant_type=refresh_token', {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: token,
      }),
      headers: {
        apiKey: process.env.SUPABASE_KEY!,
      },
    });
  },

  ResetPassword: async (data: ForgetPasswordRequest) => {
    return apiRequest('/auth/v1/user', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        apiKey: process.env.SUPABASE_KEY!,
      },
    });
  },
  Logout: async (accessToken: string) => {
    return apiRequest('/auth/v1/logout', {
      method: 'POST',
      headers: {
        apiKey: process.env.SUPABASE_KEY!,
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  uploadAvatar: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    const fileName = `${Date.now()}-${file.name}`;

    const res = await fetch(
      `${process.env.BASE_URL}/storage/v1/object/uploads/users/${fileName}`,
      {
        method: 'POST',
        body: formData,
        headers: {
          apiKey: process.env.SUPABASE_KEY!,
        },
      }
    );

if (!res.ok) {
  const error = await res.text();
  throw new Error(error);
}

    return `${process.env.BASE_URL}/storage/v1/object/public/uploads/users/${fileName}`;
  },
};
