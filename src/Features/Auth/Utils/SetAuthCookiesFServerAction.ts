import { cookies } from 'next/headers';
import { AuthResponse } from '../Types';

export async function SetAuthCookiesFServerAction(
  auth: AuthResponse,
  rememberMe = false
) {
  const cookieStore = await cookies();

  const accessTokenExpiresAt = new Date(auth.expires_at * 1000);

  cookieStore.set('access_token', auth.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    expires: accessTokenExpiresAt,
  });

  cookieStore.set('refresh_token', auth.refresh_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
  });

  cookieStore.set('expires_at', String(auth.expires_at), {
    httpOnly: true,
    path: '/',
    expires: accessTokenExpiresAt,
  });

  cookieStore.set('remember_me', String(rememberMe), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
  });
}
