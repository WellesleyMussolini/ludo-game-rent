import { UserRoles } from "@/app/common/types/user-roles.enum";
import { handleUserRole } from "@/services/handle-user-role.service";
import React from "react";

export const useUserTable = (id: string, role: UserRoles) => {
    const [selectedRole, setSelectedRole] = React.useState<UserRoles>(role);

    const handleRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = event.target.value as UserRoles;
        setSelectedRole(newRole);

        try {
            await handleUserRole(id, newRole);
        } catch {
            console.error("Error while trying to update role");
        }
    };
    return { selectedRole, handleRoleChange }
};