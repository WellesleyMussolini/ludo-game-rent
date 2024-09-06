"use server"

import { AUTHENTICATION_COOKIE } from "@/app/(auth)/constants/auth-cookie.type";
import { signOut } from "next-auth/react";
import { cookies } from "next/headers";

export const handleLogout = async () => {
    cookies().delete(AUTHENTICATION_COOKIE.ADMIN);
    cookies().delete(AUTHENTICATION_COOKIE.USER);

    await signOut();
};