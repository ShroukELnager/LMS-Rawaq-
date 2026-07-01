import { AuthService } from '@/Features/Auth/AuthService';
import { removeAuthCookies } from '@/Features/Auth/Utils/RemoveAuthCookies';
import { setAuthCookies } from '@/Features/Auth/Utils/SetAuthCookies';
import { NextRequest, NextResponse } from 'next/server';
import { GetAccountType } from './Features/Auth/Utils/GetAccountType';

const protectedRoutes = [
  '/dashboard',
  '/assignments',
  '/requests',
  '/posts',
  '/group',
];
const authRoutes = ['/login', '/signup'];

const routePermissions = [
  {
    route: '/assignments',
    roles: ['teacher'],
  },
  {
    route: '/requests',
    roles: ['teacher'],
  },
  {
    route: '/posts',
    roles: ['student'],
  },
  {
    route: '/group',
    roles: ['teacher', 'student'],
  },
];

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;

  const expiresAtValue = request.cookies.get('expires_at')?.value;

  const expiresAt = Number(expiresAtValue);

  const rememberMe = request.cookies.get('remember_me')?.value === 'true';



  if (expiresAtValue) {
    console.log('EXPIRE DATE:', new Date(expiresAt * 1000));
  }




  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // =============================
  // Protected Routes
  // =============================

  if (isProtectedRoute) {
    const tokenExpired = !accessToken;

    const accountType = GetAccountType(accessToken);

    const matchedRoute = routePermissions.find((item) =>
      pathname.startsWith(item.route)
    );

    if (matchedRoute) {
      const allowed = matchedRoute.roles.includes(accountType ?? '');

      if (!allowed) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }

    if (tokenExpired) {
      if (refreshToken) {

        try {
          const newTokens = await AuthService.refreshToken(refreshToken);


          const response = NextResponse.next();

          await setAuthCookies(newTokens, rememberMe);


          return response;
        } catch (error) {

          const response = NextResponse.redirect(
            new URL('/login', request.url)
          );


          await removeAuthCookies(response);

          return response;
        }
      }


      const response = NextResponse.redirect(new URL('/login', request.url));


      await removeAuthCookies(response);

      return response;
    }
  }

  // =============================
  // Auth Routes
  // =============================

  if (isAuthRoute && accessToken) {

    return NextResponse.redirect(new URL('/dashboard', request.url));
  }


  return NextResponse.next();
}

// export const config = {
//   matcher: [    "/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
