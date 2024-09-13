import { cookies } from "next/headers";
import { AUTHENTICATION_COOKIE } from "../../common/constants/auth-cookie.type";

export const handleAuthCookie = (cookie: AUTHENTICATION_COOKIE, expires: Date) => {
  cookies().set({
    name: cookie,
    value: cookie,
    secure: true,
    httpOnly: true,
    expires: expires,
  });
};