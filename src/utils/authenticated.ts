import { AUTHENTICATION_COOKIE } from "@/app/(auth)/constants/auth-cookie.type";
import { cookies } from "next/headers";

export const authenticated = () => {
  const userCookie = !!cookies().get(AUTHENTICATION_COOKIE.USER)?.value;
  const adminCookie = !!cookies().get(AUTHENTICATION_COOKIE.ADMIN)?.value;

  return { userCookie, adminCookie };
};
