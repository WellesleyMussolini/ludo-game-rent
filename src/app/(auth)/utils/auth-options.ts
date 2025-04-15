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

interface Session {
  session: IAuth;
  token: Token;
}

interface JWT {
  token: Token;
  user?: IUser;
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
    async jwt({ token, user }: JWT): Promise<Token> {
      const session =
        user ?? (token?.id ? await usersService.getById(token.id) : null);

      if (session) {
        token.id = session.id;
        token.role = session.role;
        token.cpf = session.cpf ?? null;
      }

      return token;
    },

    async session({ session, token }: Session): Promise<IAuth> {
      const user = await usersService.getById(token.id);

      const role = user?.role ?? UserRoles.USER;
      const cpf = user?.cpf ?? null;

      session.user.id = token.id;
      session.user.role = role;
      session.user.cpf = cpf;

      return session;
    },
  },
  secret: process.env.NEXT_PUBLIC_SECRET,
};
