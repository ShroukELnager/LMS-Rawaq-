import { NextResponse } from 'next/server';

export function removeAuthCookies(response: NextResponse) {
  // Delete cookies
  response.cookies.delete('access_token');
  response.cookies.delete('refresh_token');
  response.cookies.delete('expires_at');
  response.cookies.delete('remember_me');

  // Expire cookies
  response.cookies.set('access_token', '', {
    path: '/',
    maxAge: 0,
  });

  response.cookies.set('refresh_token', '', {
    path: '/',
    maxAge: 0,
  });

  response.cookies.set('expires_at', '', {
    path: '/',
    maxAge: 0,
  });

  response.cookies.set('remember_me', '', {
    path: '/',
    maxAge: 0,
  });

  return response;
}
