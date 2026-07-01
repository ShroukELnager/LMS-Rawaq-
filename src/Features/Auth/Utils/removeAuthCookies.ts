'use server';

import { cookies } from 'next/headers';

export async function removeAuthCookies() {
  const cookieStore = await cookies();

  cookieStore.delete('access_token');
  cookieStore.delete('refresh_token');
  cookieStore.delete('remember_me');
}
