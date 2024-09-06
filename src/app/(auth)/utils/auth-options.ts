import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../utils/lib/database/prisma";
import { AUTHENTICATION_COOKIE } from "../constants/auth-cookie.type";
import { handleAuthCookie } from "../services/handle-auth-cookie.service";
import { UserRoles } from "@/app/common/types/user-roles.enum";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ user, session }: any) {
      let cookie_auth_role;
      if (user.role === UserRoles.ADMIN) {
        cookie_auth_role = AUTHENTICATION_COOKIE.ADMIN;
      } else {
        cookie_auth_role = AUTHENTICATION_COOKIE.USER;
      }

      if (user) {
        handleAuthCookie(cookie_auth_role, new Date(session.expires));
      }

      const result = {
        user: {
          ...user,
          expires: session.expires,
        },
      }
      return result;
    },
  },
};