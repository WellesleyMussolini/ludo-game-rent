"use server"

import { UserRoles } from "@/app/common/types/user-roles.enum";
import { prisma } from "@/utils/lib/database/prisma";

export const handleUserRole = async (
  userId: string,
  newRole: UserRoles
) => {
  try {
    return await prisma.user.update({
      where: { id: userId }, // Specify the user by their ID
      data: { role: newRole }, // Update the role
      select: { role: true }, // Return the updated role
    });
  } catch {
    throw new Error(
      "Error while trying to set user's new role on the database."
    );
  }
};