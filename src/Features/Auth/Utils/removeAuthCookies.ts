import { NextResponse } from "next/server";

export function removeAuthCookies(response: NextResponse) {
  response.cookies.set("access_token", "", { maxAge: 0 });
  response.cookies.set("refresh_token", "", { maxAge: 0 });
  response.cookies.set("remember_me", "", { maxAge: 0 });

  return response;
}