import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {

    const token = await getToken({
        req: request,
    });

    console.log("Retrieved Token in Middleware:", token);  // Debug: Log the retrieved token

    if (token && token.isValid) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
    matcher: "/admin/:path*",
};