"use client"
import { Auth } from "@/app/components/auth/auth.componet";
import { EnumAuth } from "@/app/components/auth/auth.interface";
import { EnumHeader } from "@/app/layout/header/header.interface";
import { Header } from "@/app/layout/header/header.layout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Login() {
    const { status } = useSession();
    // if (status === "authenticated") return redirect("/admin");
    // adicionar um token de verificar se o usuario esta conectado no navegador dele
    return <>
        <div className="max-[425px]:relative max-[425px]:bottom-[4.8em] flex items-center justify-center w-full">
            <Auth type={EnumAuth.ADMIN} />
        </div>
    </>
};