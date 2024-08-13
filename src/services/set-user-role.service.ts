"use server"

import { EnumCheckUserRoles } from "@/types/check-user-role.enum";
import { prisma } from "@/utils/lib/database/prisma";

export const setUserRole = async (
  userId: string,
  newRole: EnumCheckUserRoles
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