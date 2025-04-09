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

  console.log(authenticated);

  const isNotAdmin = authenticated?.role === UserRoles.USER;
  const isAdmin = authenticated?.role === UserRoles.ADMIN;

  const isNotAuthenticated = !authenticated || authenticated === null;

  // Redirect to login if not authenticated and trying to access admin routes
  if (
    isNotAuthenticated &&
    adminProtectedRoutes.includes(pathname as Pathnames)
  ) {
    return NextResponse.redirect(new URL(Pathnames.ADMIN_AUTH, request.url));
  }

  /*
  // Redirect user away from GET_STARTED if CPF is already registered
  if (authenticated?.cpf && pathname === Pathnames.GET_STARTED) {
    return NextResponse.redirect(new URL(Pathnames.HOME, request.url));
  }

  // Allow user to access GET_STARTED only if they are authenticated and CPF is missing
  if (
    pathname === Pathnames.GET_STARTED &&
    authenticated &&
    !authenticated?.cpf
  ) {
    return NextResponse.next();
  }

  // If authenticated and CPF is missing, force user to complete "get started"
  if (
    authenticated &&
    !authenticated?.cpf &&
    pathname !== Pathnames.GET_STARTED
  ) {
    return NextResponse.redirect(new URL(Pathnames.GET_STARTED, request.url));
  }

  // If authenticated and CPF is already registered, block access to "get started"
  if (authenticated?.cpf && pathname === Pathnames.GET_STARTED) {
    return NextResponse.redirect(new URL(Pathnames.HOME, request.url));
  }
  */

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
    (pathname === Pathnames.CART ||
      pathname === Pathnames.USER ||
      pathname === Pathnames.GET_STARTED)
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
