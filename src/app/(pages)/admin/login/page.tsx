"use client"
import { Auth } from "@/app/components/auth/auth.componet";
import { EnumAuth } from "@/app/components/auth/auth.interface";
import { EnumHeader } from "@/app/layout/header/header.interface";
import { Header } from "@/app/layout/header/header.layout";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

export default function Login() {
    const { status } = useSession();
    const [email, setEmail] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    // if (status === "authenticated") return redirect("/admin");
    // adicionar um token de verificar se o usuario esta conectado no navegador dele
    return <div className="flex items-center justify-center w-full" style={{ minHeight: "calc(100vh - 80px)" }}>
        <Auth
            type={EnumAuth.ADMIN}
            email={email}
            password={password}
            handleEmail={setEmail}
            handlePassword={setPassword}
        />
    </div>
};