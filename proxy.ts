import { AuthService } from "@/Features/Auth/AuthService";
import { removeAuthCookies } from "@/Features/Auth/Utils/removeAuthCookies";
import { setAuthCookies } from "@/Features/Auth/Utils/setAuthCookies";
import { NextRequest, NextResponse } from "next/server";


const protectedRoutes = ["/dashboard"];
const authRoutes = ["/login", "/signup"];

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const rememberMe =
    request.cookies.get("remember_me")?.value === "true";

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isAuthRoute = authRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // ─────────────────────────────
  // Protected routes
  // ─────────────────────────────
  if (isProtectedRoute) {
    if (!accessToken ) {
      if (refreshToken) {
        try {
          const newTokens =
            await AuthService.refreshToken(refreshToken);

          const response = NextResponse.next();

          await setAuthCookies(newTokens, rememberMe);

          return response;
        } catch {
          const response = NextResponse.redirect(
            new URL("/login", request.url)
          );

          await removeAuthCookies(response);

          return response;
        }
      }

      const response = NextResponse.redirect(
        new URL("/login", request.url)
      );

      await removeAuthCookies(response);

      return response;
    }
  }

  // ─────────────────────────────
  // Auth routes
  // ─────────────────────────────
  if (isAuthRoute && accessToken ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};