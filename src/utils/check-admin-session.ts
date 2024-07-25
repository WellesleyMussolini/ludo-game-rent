import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth-options";
import { EnumPathnames } from "@/types/pathnames.enum";
import { EnumCheckUserRoles } from "@/types/check-user-role.enum";

export async function checkAdminSession() {
    const session = await getServerSession(authOptions);
    if (session === null) {
        return redirect(EnumPathnames.ADMIN_LOGIN);
    } else if (session?.user?.role !== EnumCheckUserRoles.ADMIN) {
        return redirect(EnumPathnames.HOME);
    }
};