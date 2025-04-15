"use server";

import { NextRequest, NextResponse } from "next/server";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { getToken, JWT } from "next-auth/jwt";
import {
  adminOnlyRoutes,
  authRequiredRoutes,
  publicRoutes,
} from "./app/common/constants/protected-routes";
import { UserRoles } from "./app/common/types/user-roles.enum";

async function getRedirectUrl(
  user: JWT | null,
  pathname: string
): Promise<string | null> {
  const isAuthenticated = Boolean(user);
  const isUnauthenticated = !isAuthenticated;
  const isAdmin = user?.role === UserRoles.ADMIN;
  const hasCpf = Boolean(user?.cpf);

  const redirectAwayFromGetStarted =
    isAuthenticated && !isAdmin && hasCpf && pathname === Pathnames.GET_STARTED;

  const redirectAwayFromAuthRoute =
    isAuthenticated && pathname === Pathnames.AUTH;

  const nonAdminAttemptingAdminRoutes =
    isAuthenticated &&
    !isAdmin &&
    adminOnlyRoutes.includes(pathname as Pathnames);

  // Unauthenticated users cannot access admin routes
  if (isUnauthenticated && adminOnlyRoutes.includes(pathname as Pathnames))
    return Pathnames.ADMIN_AUTH;

  // Unauthenticated users cannot access routes that require authentication
  if (isUnauthenticated && authRequiredRoutes.includes(pathname as Pathnames))
    return Pathnames.AUTH;

  // No redirection for unauthenticated public routes
  if (isUnauthenticated && publicRoutes.includes(pathname as Pathnames))
    return null;

  // For authenticated users: group conditions that redirect to HOME
  const shouldRedirectToHome =
    redirectAwayFromAuthRoute ||
    redirectAwayFromGetStarted ||
    nonAdminAttemptingAdminRoutes;
  if (shouldRedirectToHome) return Pathnames.HOME;

  // If an admin tries to access the admin auth page, redirect to admin dashboard
  if (isAuthenticated && isAdmin && pathname === Pathnames.ADMIN_AUTH)
    return Pathnames.ADMIN;

  // Force authenticated users without CPF to complete the process on GET_STARTED
  if (isAuthenticated && !hasCpf && pathname !== Pathnames.GET_STARTED)
    return Pathnames.GET_STARTED;

  // No redirection is needed
  return null;
}

export async function middleware(request: NextRequest) {
  const userToken = await getToken({
    req: request,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });
  const { pathname } = request.nextUrl;

  const shouldRedirect = await getRedirectUrl(userToken, pathname);

  if (shouldRedirect)
    return NextResponse.redirect(new URL(shouldRedirect, request.url));

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/admin/:path*",
  ],
};
