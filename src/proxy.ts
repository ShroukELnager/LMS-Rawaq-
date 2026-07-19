import { AuthService } from '@/Features/Auth/AuthService';
import { NextRequest, NextResponse } from 'next/server';
import { setAuthCookies } from './Features/Auth/Utils/SetAuthCookies';
import { removeAuthCookies } from './Features/Auth/Utils/RemoveAuthCookies';

const protectedRoutes = ['/dashboard'];
const authRoutes = ['/login', '/signup'];

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const expiresAtValue = request.cookies.get('expires_at')?.value;

  const expiresAt = Number(expiresAtValue);

  const isExpired = expiresAtValue ? Date.now() >= expiresAt * 1000 : false;

  const rememberMe = request.cookies.get('remember_me')?.value === 'true';

  console.log('========== AUTH DEBUG ==========');

  console.log('PATH:', pathname);

  console.log('ACCESS TOKEN EXISTS:', Boolean(accessToken));

  console.log('ACCESS TOKEN:', accessToken);

  console.log('REFRESH TOKEN EXISTS:', Boolean(refreshToken));

  console.log('EXPIRES_AT:', expiresAtValue);

  if (expiresAtValue) {
    console.log('EXPIRE DATE:', new Date(expiresAt * 1000));
  }

  console.log('IS EXPIRED BY COOKIE:', isExpired);



  console.log('REMEMBER ME:', rememberMe);

  console.log('================================');

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // =============================
  // Protected Routes
  // =============================

  if (isProtectedRoute) {
    const tokenExpired =
      !accessToken ;

    console.log('PROTECTED ROUTE TOKEN INVALID:', tokenExpired);

    if (tokenExpired) {
      if (refreshToken) {
        console.log('TRYING REFRESH TOKEN...');

        try {
          const newTokens = await AuthService.refreshToken(refreshToken);

          console.log('REFRESH SUCCESS:', newTokens);

          const response = NextResponse.next();

          await setAuthCookies(newTokens, rememberMe);

          console.log('NEW COOKIES SET');

          return response;
        } catch (error) {
          console.log('REFRESH FAILED:', error);

          const response = NextResponse.redirect(
            new URL('/login', request.url)
          );

          console.log('REMOVING AUTH COOKIES');

          await removeAuthCookies(response);

          return response;
        }
      }

      console.log('NO REFRESH TOKEN - LOGOUT');

      const response = NextResponse.redirect(new URL('/login', request.url));

      console.log('REMOVING AUTH COOKIES');

      await removeAuthCookies(response);

      return response;
    }
  }

  // =============================
  // Auth Routes
  // =============================

  if (
    isAuthRoute &&
    accessToken 
  
  ) {
    console.log('USER ALREADY AUTHENTICATED -> DASHBOARD');

    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  console.log('NEXT RESPONSE');

  return NextResponse.next();
}

// export const config = {
//   matcher: [    "/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};