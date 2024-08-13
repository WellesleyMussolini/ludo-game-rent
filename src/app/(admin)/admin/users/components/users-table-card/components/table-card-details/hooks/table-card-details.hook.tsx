import React from "react";
import { setUserRole } from "@/services/set-user-role.service";
import { EnumCheckUserRoles } from "@/types/check-user-role.enum";

export const useTableCardDetails = (id: string, role: EnumCheckUserRoles) => {
    const [selectedRole, setSelectedRole] = React.useState<EnumCheckUserRoles>(role);

    const handleRoleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = event.target.value as EnumCheckUserRoles;
        setSelectedRole(newRole); // Optimistically update UI

        try {
            await setUserRole(id, newRole);
        } catch {
            console.error("Error while trying to update role");
        }
    };
    return{ selectedRole, handleRoleChange}
};