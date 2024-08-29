"use client";

import { getServerSession } from "next-auth";
import { redirect, usePathname } from "next/navigation";
import { authOptions } from "./auth-options";
import { EnumPathnames } from "@/types/pathnames.enum";
import { EnumCheckUserRoles } from "@/types/check-user-role.enum";

export const handleRouteRedirect = async () => {
  const session = await getServerSession(authOptions);

  const pathname = usePathname();

  switch (pathname) {
    case EnumPathnames.ADMIN:
    case EnumPathnames.ADMIN_AUTH:
      if (!session) {
        pathname === EnumPathnames.ADMIN && redirect(EnumPathnames.ADMIN_AUTH);
      } else {
        if (session.user.role !== EnumCheckUserRoles.ADMIN) {
          redirect(EnumPathnames.HOME);
        } else if (pathname === EnumPathnames.ADMIN_AUTH) {
          redirect(EnumPathnames.ADMIN);
        }
      }
      break;

    case EnumPathnames.USER:
      !session && redirect(EnumPathnames.AUTH);
      break;

    case EnumPathnames.AUTH:
      session && redirect(EnumPathnames.HOME);
      break;

    default:
      break;
  }
};
