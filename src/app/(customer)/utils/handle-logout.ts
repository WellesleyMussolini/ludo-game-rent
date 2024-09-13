"use server";

import { AUTHENTICATION_COOKIE } from "@/app/common/constants/auth-cookie.type";
import { cookies } from "next/headers";

export const handleLogout = async () => {
  cookies().delete(AUTHENTICATION_COOKIE.ADMIN);
  cookies().delete(AUTHENTICATION_COOKIE.USER);
};
