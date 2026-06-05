import { apiRequest } from './lib/api';
import { LoginFormData, SignUpRequest } from './Types';

export const AuthService = {
  Login: async (data: LoginFormData) => {
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
    return apiRequest('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: token,
      }),
    });
  },
  
};
