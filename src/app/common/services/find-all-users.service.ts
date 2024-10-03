import { prisma } from "@/app/common/utils/lib/database/prisma";

export const findAllUsers = await prisma.user.findMany({
  orderBy: { role: "asc" },
});
