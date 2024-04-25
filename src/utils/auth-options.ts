const { default: NextAuth } = require("next-auth/next");
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/utils/lib/database/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }: any) => {
      if (user) {
        token.user = user;
        token.isValid = true;
      } else if (account && !token.isValid) {
        token.isValid = false; // Ensure token validity is correctly set
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
        session.isValid = token.isValid;
      }
      return session;
    },
  },
};
