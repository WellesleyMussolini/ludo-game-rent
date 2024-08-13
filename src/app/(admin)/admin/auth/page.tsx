"use server"

import { EnumAuth } from "@/app/components/auth/types/auth.types";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Auth as AuthComponent } from "../../../components/auth/auth.component";

export default async function Auth() {
    const session = await getServerSession(authOptions);
    if (session !== null) return redirect("/admin");
    return <div className="flex items-center justify-center w-full min-h-screen pt-24"><AuthComponent type={EnumAuth.ADMIN} /></div>
};