import { NextRequest, NextResponse } from "next/server";
import { Pathnames } from "@/app/common/types/pathnames";
import { AUTHENTICATION_COOKIE } from "./app/(auth)/constants/auth-cookie.type";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get(AUTHENTICATION_COOKIE.USER);
  const adminCookie = cookieStore.get(AUTHENTICATION_COOKIE.ADMIN);

  const { pathname } = request.nextUrl;

  // home redirection
  if ((userCookie || adminCookie) && pathname === Pathnames.AUTH || userCookie && pathname === Pathnames.ADMIN) return NextResponse.redirect(new URL(Pathnames.HOME, request.url));
  
  // auth redirection
  if ((!userCookie || !adminCookie) && pathname === Pathnames.USER) return NextResponse.redirect(new URL(Pathnames.AUTH, request.url));

  // admin auth redirection
  if ((!userCookie || !adminCookie) && pathname === Pathnames.ADMIN) return NextResponse.redirect(new URL(Pathnames.ADMIN_AUTH, request.url));


  // Proceed to the next middleware or route
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/admin/:path*",
  ],
};
