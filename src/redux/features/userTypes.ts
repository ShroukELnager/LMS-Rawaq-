export interface User {
  id: string;
  email: string;
  role: string;

  user_metadata: {
    first_name: string;
    last_name: string;
    account_type: string;
    avatar_url: string;
  };
}

export interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}