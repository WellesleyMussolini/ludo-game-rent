"use server"

import { Auth } from "@/app/components/auth/auth.componet";
import { EnumAuth } from "@/app/components/auth/auth.interface";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Login() {
    const session = await getServerSession(authOptions);
    if (session !== null) return redirect("/admin");
    return <div className="flex items-center justify-center w-full min-h-screen pt-24"><Auth type={EnumAuth.ADMIN} />    </div>
};