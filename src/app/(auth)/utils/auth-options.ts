import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../common/utils/lib/database/prisma";
import { UserRoles } from "@/app/common/types/user-roles.enum";
import { IUser } from "@/app/common/types/user.interface";

type JWT = {
  token: Token;
  user: IUser;
};

type Token = {
  name: string;
  email: string;
  picture: string;
  sub: string;
  role: UserRoles;
  id: string;
  iat: number;
  exp: number;
  jti: string;
};

type Session = {
  session: {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
      role: UserRoles;
    };
    expires: string;
  };
  token: Token;
};

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
    async jwt({ token, user }: JWT) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: Session) {
      // if token has a role then adds it to the session.
      session.user.role = token.role;
      session.user.id = token.id;
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
