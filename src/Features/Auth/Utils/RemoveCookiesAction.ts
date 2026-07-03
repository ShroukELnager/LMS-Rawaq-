'use server';

import { cookies } from 'next/headers';

export async function removeAuthCookiesAction() {
  const cookieStore = await cookies();

  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  cookieStore.delete('expires_at');
  cookieStore.delete('remember_me');
}
