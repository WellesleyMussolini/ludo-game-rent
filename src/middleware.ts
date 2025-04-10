"use server";

import { NextRequest, NextResponse } from "next/server";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { getToken } from "next-auth/jwt";
import {
  adminProtectedRoutes,
  isNotAuthenticatedProtectedRoutes,
} from "./app/common/constants/protected-routes";
import { UserRoles } from "./app/common/types/user-roles.enum";
import { usersService } from "./app/common/services/users.service";

export async function middleware(request: NextRequest) {
  const authenticated = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });
  const { pathname } = request.nextUrl;

  // Unauthenticated user redirections

  // If not authenticated and trying to access an admin-protected route, redirect to admin auth page.
  if (!authenticated && adminProtectedRoutes.includes(pathname as Pathnames)) {
    return NextResponse.redirect(new URL(Pathnames.ADMIN_AUTH, request.url));
  }

  // If not authenticated and trying to access a protected page (like CART, USER, or GET_STARTED), redirect to auth page.
  if (
    !authenticated &&
    isNotAuthenticatedProtectedRoutes.includes(pathname as Pathnames)
  ) {
    return NextResponse.redirect(new URL(Pathnames.AUTH, request.url));
  }

  // Authenticated user redirections
  const user = await usersService.getById(authenticated?.id as string);
  const isAdmin = authenticated?.role === UserRoles.ADMIN;

  // If user is not admin and is trying to access an admin-protected route, redirect to HOME.
  if (
    authenticated &&
    !isAdmin &&
    adminProtectedRoutes.includes(pathname as Pathnames)
  ) {
    return NextResponse.redirect(new URL(Pathnames.HOME, request.url));
  }

  // Redirect admin users away from the admin auth page to the admin dashboard.
  if (authenticated && isAdmin && pathname === Pathnames.ADMIN_AUTH) {
    return NextResponse.redirect(new URL(Pathnames.ADMIN, request.url));
  }

  // Redirect any authenticated user trying to access the general authentication page.
  if (authenticated && pathname === Pathnames.AUTH) {
    return NextResponse.redirect(new URL(Pathnames.HOME, request.url));
  }

  // For regular (non-admin) users:
  // If CPF is registered and the user accesses GET_STARTED, send them to HOME.
  if (
    authenticated &&
    !isAdmin &&
    user?.cpf &&
    pathname === Pathnames.GET_STARTED
  ) {
    return NextResponse.redirect(new URL(Pathnames.HOME, request.url));
  }

  // If CPF is missing and the user is not on GET_STARTED, force them to complete GET_STARTED.
  if (
    authenticated &&
    !isAdmin &&
    !user?.cpf &&
    pathname !== Pathnames.GET_STARTED
  ) {
    return NextResponse.redirect(new URL(Pathnames.GET_STARTED, request.url));
  }

  // Otherwise, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/admin/:path*",
  ],
};
