import { NextRequest, NextResponse } from "next/server";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { authenticated } from "./utils/authenticated";
import { adminProtectedRoutes } from "./constants/protected-routes";
import { GiConsoleController } from "react-icons/gi";

export async function middleware(request: NextRequest) {
  const { adminCookie, userCookie } = authenticated();
  const { pathname } = request.nextUrl;

  const isAuthenticated = adminCookie || userCookie;
  const isNotAuthenticated = !adminCookie || !userCookie;
  const isNotAdmin = !adminCookie && userCookie;
  const isAdmin = adminCookie && !userCookie;

  const isAuthenticatedAdminRoute = adminProtectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  );

  // if (isNotAdmin && isAuthenticatedAdminRoute) {
  //   return NextResponse.redirect(new URL(Pathnames.HOME, request.url));
  // }

  // if (!isAuthenticated && pathname !== "/auth") {
  //   return NextResponse.redirect(new URL(Pathnames.AUTH, request.url));
  // }

  // if (pathname === "/auth" && isAuthenticated) {
  //   return NextResponse.redirect(new URL(Pathnames.HOME, request.url));
  // }

  // if (pathname === "/" && (!adminCookie || !userCookie)) {
  //   return NextResponse.redirect(new URL(Pathnames.AUTH, request.url));
  // }

  // if (!adminCookie || !userCookie) {
  //   return NextResponse.redirect(new URL(Pathnames.HOME, request.url));
  // }

  // // home redirection
  // if ((userCookie || adminCookie) && pathname === Pathnames.AUTH || userCookie && pathname === Pathnames.ADMIN) return NextResponse.redirect(new URL(Pathnames.HOME, request.url));

  // // auth redirection
  // if ((!userCookie || !adminCookie) && pathname === Pathnames.USER) return NextResponse.redirect(new URL(Pathnames.AUTH, request.url));

  // // admin auth redirection
  // if ((!userCookie || !adminCookie) && pathname === Pathnames.ADMIN) return NextResponse.redirect(new URL(Pathnames.ADMIN_AUTH, request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    "/admin/:path*",
  ],
};
