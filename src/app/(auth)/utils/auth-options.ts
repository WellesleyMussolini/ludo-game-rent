import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../common/utils/lib/database/prisma";
import { UserRoles } from "@/app/common/types/user-roles.enum";
import { IUser, IAuth } from "@/app/common/types/user.interface";
import { usersService } from "@/app/common/services/users.service";

export interface Token extends IUser {
  iat: number;
  exp: number;
  jti: string;
}

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
    async jwt({ token, user }: { token: Token; user?: IUser }): Promise<Token> {
      // If a user object is provided during sign-in, update the token directly.
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          cpf: user.cpf,
        };
      }

      // If token has no ID, there's nothing to fetch; return the token as-is.
      if (!token.id) return token;

      // If CPF is not already set, try to fetch it from the database.
      if (!token.cpf) {
        try {
          const dbUser = await usersService.getById(token.id);
          token.cpf = dbUser?.cpf ?? null;
        } catch {
          token.cpf = null;
        }
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: IAuth;
      token: Token;
    }): Promise<IAuth> {
      const user = await usersService.getById(token.id);

      const role = user?.role ?? UserRoles.USER;

      token.role = role;
      session.user.role = role;
      session.user.id = token.id;
      session.user.cpf = token.cpf;

      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};
