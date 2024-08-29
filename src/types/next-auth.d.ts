import NextAuth, { DefaultSession } from "next-auth";
import { IAuth } from "./user.interface";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
};