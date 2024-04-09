"use client"

import { CheckBox } from "../checkbox/checkbox.component";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../primary-button/primary-button.interface";
import { EnumAuth, IAuth } from "./auth.interface";
import { useRouter } from "next/navigation";
import React from "react";
import { signIn } from "next-auth/react";
import { PrimaryInput } from "../primary-input/primary-input.component";
import { EnumPrimaryInputStyle, EnumPrimaryInputType } from "../primary-input/primary-input.interface";

export const Auth = ({ type, email, password, handleEmail, handlePassword }: IAuth) => {
    const router = useRouter();
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
            <div className={`flex items-center flex-col bg-[#FFFFFF] shadow-lg rounded p-10 text-gray-500 text-[.875rem] font-medium duration-300
            max-[425px]:w-full max-[425px]:h-[100vh_-_80px] max-[640px]:w-[80%] min-[640px]:w-[32rem] h-auto
            max-[425px]:shadow-none`}>

                <div className={`w-full max-[425px]:py-0py-4`}>
                    {
                        <>
                            <PrimaryButton text="Entrar com Google" type={EnumPrimaryButton.GOOGLE} handleClick={() => signIn("google", { callbackUrl: "/" })} />

                            <div className="flex items-center flex-row gap-3 h-20 w-full">
                                <div className="opacity-100 bg-gray-200 w-full h-[0.125rem]"></div>
                                <p>ou</p>
                                <div className="opacity-100 bg-gray-200 w-full h-[0.125rem]"></div>
                            </div>
                        </>
                    }

                    <div className="flex flex-col gap-5">
                        <PrimaryInput handleOnChange={handleEmail} style={EnumPrimaryInputStyle.PRIMARY} type={EnumPrimaryInputType.EMAIL} text="Email" placeholder="Digite seu email" />
                        <PrimaryInput handleOnChange={handlePassword} style={EnumPrimaryInputStyle.PRIMARY} type={EnumPrimaryInputType.PASSWORD} text="Senha" placeholder="••••••••" />

                        <div className="w-full"><CheckBox text="Continuar conectado" /></div>

                        <PrimaryButton handleClick={() => router.push("/admin")} text={"entrar"} disabled={!email || !password} type={!email || !password ? EnumPrimaryButton.DISABLED : EnumPrimaryButton.OUTLINED} />
                    </div>
                </div>
            </div>
        }
    </>
};



/*
            <div className={`flex items-center flex-col bg-[#FFFFFF] shadow-lg rounded p-10 text-gray-500 text-[.875rem] font-medium duration-300
            max-[425px]:w-full max-[425px]:h-[100vh_-_80px] max-[640px]:w-[80%] min-[640px]:w-[32rem] h-auto
            max-[425px]:shadow-none`}>

                <div className={`w-full max-[425px]:py-0py-4`}>
                    {
                        <>
                            <PrimaryButton text="Entrar com Google" type={EnumPrimaryButton.GOOGLE} handleClick={() => signIn("google", { callbackUrl: "/" })} />

                            <div className="flex items-center flex-row gap-3 h-20 w-full">
                                <div className="opacity-100 bg-gray-200 w-full h-[0.125rem]"></div>
                                <p>ou</p>
                                <div className="opacity-100 bg-gray-200 w-full h-[0.125rem]"></div>
                            </div>
                        </>
                    }

                    <div className="flex flex-col gap-5">
                        <PrimaryInput style={EnumPrimaryInputStyle.PRIMARY} type={EnumPrimaryInputType.EMAIL} text="Email" placeholder="Digite seu email" />
                        <PrimaryInput style={EnumPrimaryInputStyle.PRIMARY} type={EnumPrimaryInputType.PASSWORD} text="Senha" placeholder="••••••••" />

                        {(type === EnumAuth.LOGIN || type === EnumAuth.ADMIN) && <div className="w-full"><CheckBox text="Continuar conectado" /></div>}

                        <div className={type === EnumAuth.REGISTER ? "mt-4" : ""}>
                            <PrimaryButton handleClick={() => { }} text={(type === EnumAuth.LOGIN || type === EnumAuth.ADMIN) && "entrar" || (type === EnumAuth.REGISTER && "registrar")} disabled={false} type={EnumPrimaryButton.OUTLINED} />
                        </div>

                        <div className="flex gap-1 mt-2 max-[440px]:flex-col">
                            <p>
                                {type === EnumAuth.LOGIN && "Não tem uma conta ainda ?"}
                                {type === EnumAuth.REGISTER && "Já possui uma conta ?"}
                            </p>
                            {type === EnumAuth.LOGIN && <p onClick={() => router.push("/register")} className="text-blue-500 cursor-pointer hover:underline hover:text-blue-700">Crie uma aqui</p>}
                            {type === EnumAuth.REGISTER && <p onClick={() => router.push("/login")} className="text-blue-500 cursor-pointer hover:underline hover:text-blue-700">Entrar</p>}
                        </div>
                    </div>
                </div>
            </div>
*/