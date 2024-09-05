import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE } from "../constants/auth-cookie.type";

// Updated function to set the role-based cookie directly
export const handleAuthCookie = (cookie: AUTHENTICATION_COOKIE, expires: Date) => {
  cookies().set({
    name: cookie,
    value: cookie,
    secure: true,
    httpOnly: true,
    expires: expires,
  });
};
