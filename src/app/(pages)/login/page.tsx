"use client"
import { Auth } from "@/app/components/auth/auth.componet";
import { EnumAuth } from "@/app/components/auth/auth.interface";

export default function Login() {
    return <div className="flex items-center justify-center w-full h-[calc(100vh-80px)]"><Auth type={EnumAuth.LOGIN} /></div>
};