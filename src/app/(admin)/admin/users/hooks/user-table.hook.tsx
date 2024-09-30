import { ludoUsersApi } from "@/app/common/api/ludo-games-api/users.api";
import { UserRoles } from "@/app/common/types/user-roles.enum";
import { IUser } from "@/app/common/types/user.interface";
import React from "react";

export const useUserTable = (allUsers: Array<IUser>) => {
  const [selectedRoles, setSelectedRoles] = React.useState<UserRoles[]>(
    allUsers.map((user) => user.role)
  );

  const handleRoleChange = async (
    id: string,
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newRole = event.target.value as UserRoles;

    setSelectedRoles(() =>
      selectedRoles.map((role, position) =>
        position === index ? newRole : role
      )
    );

    await ludoUsersApi.findAndUpdate(id, newRole);
  };

  return { selectedRoles, handleRoleChange };
};
