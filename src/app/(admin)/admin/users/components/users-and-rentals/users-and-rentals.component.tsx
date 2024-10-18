"use client";

import { UsersTable } from "../users-table/users-table.component";
import { IUser } from "@/app/common/types/user.interface";
import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { useSearchParams } from "next/navigation";
import { UserRentals } from "../user-rentals/user-rentals.component";
import { useQuery } from "@tanstack/react-query";
import { usersService } from "@/app/common/services/users.service";

export const UsersAndRentals = () => {
  const searchParams = useSearchParams();
  const userIdParam = searchParams.get("id");
  const { data: findAllUsers } = useQuery({
    queryKey: ["users", userIdParam],
    queryFn: async () => {
      if (userIdParam) {
        const searchQuery = userIdParam.replace(/-/g, " ");
        return await usersService.getById(searchQuery);
      }
      return await usersService.get();
    },
    refetchInterval: 1000,
  });
  return (
    <div className="flex justify-center items-center py-10">
      {userIdParam ? (
        <UserRentals />
      ) : !findAllUsers ? (
        <ErrorMessage
          title="404"
          message="Não foi possível listar os usuários"
        />
      ) : (
        <UsersTable allUsers={findAllUsers as Array<IUser>} />
      )}
    </div>
  );
};
