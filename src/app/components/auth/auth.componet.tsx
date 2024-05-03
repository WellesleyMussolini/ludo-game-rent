"use client"

import { PrimaryButton } from "../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../primary-button/primary-button.interface";
import { EnumAuth, IAuth } from "./auth.interface";
import React from "react";
import { signIn } from "next-auth/react";

export const Auth = ({ type }: IAuth) => {
    return <>
        {
            type === EnumAuth.LOGIN &&
            <div className={`flex items-center flex-col bg-[#FFFFFF] shadow-lg rounded p-10 text-gray-500 text-[.875rem] font-medium duration-300 h-auto             
        max-[425px]:w-full max-[425px]:h-[100vh_-_80px] max-[640px]:w-[80%] min-[640px]:w-[32rem] max-[425px]:shadow-none`}>
                <PrimaryButton text="Entrar com Google" type={EnumPrimaryButton.GOOGLE} onClick={() => signIn("google", { callbackUrl: "/" })} />
            </div>
        }
        {
            type === EnumAuth.ADMIN &&
            <div className={`flex items-center flex-col bg-[#FFFFFF] shadow-lg rounded p-10 text-gray-500 text-[.875rem] font-medium duration-300 h-auto             
            max-[425px]:w-full max-[425px]:h-[100vh_-_80px] max-[640px]:w-[80%] min-[640px]:w-[32rem] max-[425px]:shadow-none`}>
                    <PrimaryButton text="Entrar com Google" type={EnumPrimaryButton.GOOGLE} onClick={() => signIn("google", { callbackUrl: "/admin" })} />
                </div>
        }
    </>
};