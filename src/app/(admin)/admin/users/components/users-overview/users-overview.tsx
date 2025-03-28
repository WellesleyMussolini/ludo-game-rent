"use client";

import React from "react";
import { UsersTable } from "../users-table/users-table.component";
import { IUser } from "@/app/common/types/user.interface";
import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/app/common/services/users.service";
import { UserRentals } from "@/app/common/components/user-rentals/user-rentals.component";
import Link from "next/link";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { LoadingScreenSpinner } from "@/app/common/components/loading/loading-screen/loading-screen.component";

export const UsersOverview = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const { data: users, isPending: isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      return await usersService.get();
    },
    refetchInterval: 1000,
    retry: 1,
  });

  const isUserFound = userId && !users?.find((user) => user.id === userId);

  if (isLoading) return <LoadingScreenSpinner size={150} />;

  if (isUserFound) {
    return (
      <div className="flex justify-center items-center flex-col">
        <Link className="cursor-pointer" href={Pathnames.ADMIN_USERS}>
          RETORNAR
        </Link>
        <ErrorMessage title="404" message="Ops... Usuário não encontrado" />;
      </div>
    );
  }

  // If a userId is present in the URL, render the profile view.
  if (userId) return <UserRentals userId={userId} />;

  return (
    <div className="flex justify-center items-center py-10">
      <UsersTable allUsers={users as Array<IUser>} />
    </div>
  );
};
