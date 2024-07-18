import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./auth-options";
import { EnumCheckSessionRole } from "@/types/check-session-role.enum";
import { EnumPathnames } from "@/types/pathnames.enum";

export async function checkAdminSession() {
    const session = await getServerSession(authOptions);
    if (session === null) {
        return redirect(EnumPathnames.ADMIN_LOGIN);
    } else if (session?.user?.role !== EnumCheckSessionRole.ADMIN) {
        return redirect(EnumPathnames.HOME);
    }
};