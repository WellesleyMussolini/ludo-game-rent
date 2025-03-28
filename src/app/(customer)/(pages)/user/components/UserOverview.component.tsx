"use client";

import { useUserSession } from "@/app/common/hooks/session.hook";
import { UserRentals } from "@/app/common/components/user-rentals/user-rentals.component";

export const UserOverview = () => {
  const { session } = useUserSession();
  return <UserRentals userId={session?.user?.id || ""} />;
};
