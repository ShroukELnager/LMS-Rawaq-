'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { AuthService } from '../AuthService';

export async function logoutAction() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('access_token')?.value;

  if (accessToken) {
    await AuthService.Logout(accessToken);
  }

  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  cookieStore.delete('expires_at');
  cookieStore.delete('remember_me');

  redirect('/login');
}
