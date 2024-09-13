import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../utils/lib/database/prisma";
import { UserRoles } from "@/app/common/types/user-roles.enum";
import { AUTHENTICATION_COOKIE } from "../../common/constants/auth-cookie.type";
import { handleAuthCookie } from "../services/handle-auth-cookie.service";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt", // This enables JWT-based session
  },
  callbacks: {
    async jwt({ token, user }: any) {
      // Attach user roles and other info to the token
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: any) {
      // // Attach user role to session object
      // session.user.role = token.role;

      // // Determine the role for the authentication cookie
      // let cookieAuthRole = token.role === UserRoles.ADMIN
      //   ? AUTHENTICATION_COOKIE.ADMIN
      //   : AUTHENTICATION_COOKIE.USER;

      // if (session) {
      //   handleAuthCookie(cookieAuthRole, new Date(session.expires));
      // }
      return {
        user: {
          ...session.user,
          expires: session.expires,
        },
      };
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};