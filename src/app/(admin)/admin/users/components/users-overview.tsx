"use client";

import React from "react";
import { UsersTable } from "./users-table/users-table.component";
import { IUser } from "@/app/common/types/user.interface";
import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/app/common/services/users.service";
import { UserRentals } from "@/app/common/components/user-rentals/user-rentals.component";
import { LoadingSpinner } from "@/app/common/components/loading/loading-spinner/loading-spinner.component";

export const UsersOverview = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  // Otherwise, fetch and display the list of users.
  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => usersService.get(),
    refetchInterval: 1000,
  });

  // If a userId is present in the URL, render the profile view.
  if (userId) return <UserRentals userId={userId} />;

  if (isLoading) return <LoadingSpinner size={150} />;

  if (isError || !users) {
    return (
      <ErrorMessage title="404" message="Não foi possível listar os usuários" />
    );
  }
  return (
    <div className="flex justify-center items-center py-10">
      <UsersTable allUsers={users as Array<IUser>} />
    </div>
  );
};
