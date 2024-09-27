"use server";

import { NextRequest, NextResponse } from "next/server";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { getToken } from "next-auth/jwt";
import { adminProtectedRoutes } from "./app/common/constants/protected-routes";
import { UserRoles } from "./app/common/types/user-roles.enum";

export async function middleware(request: NextRequest) {
  const authenticated = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });
  const { pathname } = request.nextUrl;

  const isNotAdmin = authenticated?.role === UserRoles.USER;
  const isAdmin = authenticated?.role === UserRoles.ADMIN;

  const isNotAuthenticated = !authenticated || authenticated === null;

  if (
    isNotAuthenticated &&
    adminProtectedRoutes.includes(pathname as Pathnames)
  ) {
    return NextResponse.redirect(new URL(Pathnames.ADMIN_AUTH, request.url));
  }

  if (
    authenticated &&
    isNotAdmin &&
    (adminProtectedRoutes.includes(pathname as Pathnames) ||
      pathname === Pathnames.ADMIN_AUTH)
  ) {
    return NextResponse.redirect(new URL(Pathnames.HOME, request.url));
  }

  if (authenticated && isAdmin && pathname === Pathnames.ADMIN_AUTH) {
    return NextResponse.redirect(new URL(Pathnames.ADMIN, request.url));
  }

  if (authenticated && pathname === Pathnames.AUTH) {
    return NextResponse.redirect(new URL(Pathnames.HOME, request.url));
  }

  if (
    isNotAuthenticated &&
    (pathname === Pathnames.CART || pathname === Pathnames.USER)
  ) {
    return NextResponse.redirect(new URL(Pathnames.AUTH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/admin/:path*",
  ],
};
