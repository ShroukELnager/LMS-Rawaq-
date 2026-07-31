import { AuthService } from '@/Features/Auth/AuthService';
import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from './Features/Auth/Utils/SetAuthCookies';
import { removeAuthCookies } from './Features/Auth/Utils/RemoveAuthCookies';

const authRoutes = ['/login', '/signup'];

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const expiresAt = Number(request.cookies.get('expires_at')?.value);

  const isExpired = !Number.isNaN(expiresAt) && Date.now() >= expiresAt * 1000;

  const rememberMe = request.cookies.get('remember_me')?.value === 'true';

  const isProtectedRoute =
    pathname.startsWith('/dashboard') || pathname.startsWith('/api');

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  console.log('========== AUTH DEBUG ==========');
  console.log('PATH:', pathname);
  console.log('ACCESS TOKEN EXISTS:', Boolean(accessToken));
  console.log('ACCESS TOKEN:', accessToken);
  console.log('REFRESH TOKEN EXISTS:', Boolean(refreshToken));
  console.log('EXPIRES AT:', expiresAt);
  console.log('NOW:', Math.floor(Date.now() / 1000));
  console.log('IS EXPIRED:', isExpired);
  console.log('IS PROTECTED:', isProtectedRoute);
  console.log('================================');

  if (isProtectedRoute) {
    const tokenInvalid = !accessToken || isExpired;

    console.log('TOKEN INVALID:', tokenInvalid);

    if (tokenInvalid) {
      console.log('ENTER TOKEN INVALID');

      if (refreshToken) {
        console.log('ENTER REFRESH');

        try {
          const newTokens = await AuthService.refreshToken(refreshToken);

          console.log('REFRESH SUCCESS');

          const response = NextResponse.next();

          setAuthCookies(response, newTokens, rememberMe);

          console.log('NEW COOKIES SET');

          return response;
        } catch (error) {
          console.error('REFRESH FAILED', error);

          const response = NextResponse.redirect(
            new URL('/login', request.url)
          );

          await removeAuthCookies(response);

          return response;
        }
      }

      console.log('NO REFRESH TOKEN');

      const response = NextResponse.redirect(new URL('/login', request.url));

      await removeAuthCookies(response);

      return response;
    }
  }

  if (isAuthRoute && accessToken && !isExpired) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
