import NextAuth, { DefaultSession } from "next-auth";
import { IAuth } from "../app/common/types/user.interface";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
};