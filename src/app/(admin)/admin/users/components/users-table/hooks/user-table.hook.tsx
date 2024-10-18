import React from "react";
import { usersService } from "@/app/common/services/users.service";
import { UserRoles } from "@/app/common/types/user-roles.enum";
import { IUser } from "@/app/common/types/user.interface";
import { useRefetchQuery } from "@/app/common/hooks/refetch-query.hook";

export const useUserTable = (allUsers: Array<IUser>) => {
  const [selectedRoles, setSelectedRoles] = React.useState<UserRoles[]>(
    allUsers.map((user) => user.role)
  );

  const { handleResetQuery } = useRefetchQuery();

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
    handleResetQuery("users");
    await usersService.update(id, newRole);
  };

  return { selectedRoles, handleRoleChange };
};
