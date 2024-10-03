// next-auth.d.ts
import { DefaultSession } from "next-auth";
import { UserRoles } from "@/app/common/types/user-roles.enum";

// Extend the built-in session types from NextAuth
declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
      role: UserRoles;
    } & DefaultSession["user"];
  }
}
