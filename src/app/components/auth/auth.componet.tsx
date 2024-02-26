"use client"

import Image from "next/image";
import { CheckBox } from "../checkbox/checkbox.component";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../primary-button/primary-button.interface";
import { EnumAuth, IAuth } from "./auth.interface";
import { AuthGoogle } from "./components/auth-google.component";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const Auth = ({ type }: IAuth) => {
    const [pageSwitcher, setPageSwitcher] = React.useState<string>("");
    const currentPage = usePathname()
    const router = useRouter();

    React.useEffect(() => {
        if (currentPage === "admin/login") return setPageSwitcher("/admin");
        else return setPageSwitcher("/")
    }, [setPageSwitcher]);

    return (
        <>
            <div className={`flex items-center flex-col bg-[#FFFFFF] shadow-lg rounded p-10 text-gray-500 text-[.875rem] font-medium duration-300
            max-[425px]:w-full max-[425px]:h-[100vh_-_80px] max-[640px]:w-[80%] min-[640px]:w-[32rem] h-auto
            max-[425px]:shadow-none`}>

                <div className={`w-full max-[425px]:py-0py-4`}>
                    {
                        // (type === EnumAuth.LOGIN || type === EnumAuth.REGISTER)
                        // &&
                        <>
                        {/* JOGAR ESSE BOTÃO PARA O PRIMARY BUTTON */}
                            <AuthGoogle text="Entrar com Google" route={pageSwitcher} />
                        {/* JOGAR ESSE BOTÃO PARA O PRIMARY BUTTON */}

                            <div className="flex items-center flex-row gap-3 h-20 w-full">
                                <div className="opacity-100 bg-gray-200 w-full h-[0.125rem]"></div>
                                <p>ou</p>
                                <div className="opacity-100 bg-gray-200 w-full h-[0.125rem]"></div>
                            </div>
                        </>
                    }

                    <div className="flex flex-col gap-5">
                        {
                            type === EnumAuth.REGISTER &&
                            <div className="flex justify-between max-[545px]:flex-col flex-row max-[640px]:gap-5 max-[545px]:gap-5">
                                <div className="flex flex-col gap-2">
                                    <p>Nome</p>
                                    <input type="text" placeholder="Digite seu nome" className="border-2 outline-none rounded-[0.5rem] w-full inline-flex items-center justify-center gap-3 py-2 px-3 bg-[#F9FAFB] focus:border-primary" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <p>Sobrenome</p>
                                    <input type="text" placeholder="Digite seu sobrenome" className="border-2 outline-none rounded-[0.5rem] w-full inline-flex items-center justify-center gap-3 py-2 px-3 bg-[#F9FAFB] focus:border-primary" />
                                </div>
                            </div>
                        }
{/* COMPONENTIZAR OS INPUTS */}
                        <div className="flex flex-col gap-2">
                            <p>Email</p>
                            <input type="email" placeholder="Digite seu email" className="text-base border-2 outline-none rounded-[0.5rem] w-full inline-flex items-center justify-center gap-3 py-2 px-3 bg-[#F9FAFB] focus:border-primary" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <p>Senha</p>
                            <input type="password" placeholder="••••••••" className="tracking-[.2em] border-2 rounded-[0.5rem] w-full inline-flex items-center justify-center gap-3 py-2 px-3 bg-[#F9FAFB] outline-none focus:border-primary" />
                        </div>

                        {
                            (type === EnumAuth.LOGIN || type === EnumAuth.ADMIN) &&
                            <div className="w-full"><CheckBox text="Continuar conectado" /></div>
                        }

                        <div className={type === EnumAuth.REGISTER ? "mt-4" : ""}>
                            <PrimaryButton handleClick={() => { }} text={(type === EnumAuth.LOGIN || type === EnumAuth.ADMIN) && "entrar" || (type === EnumAuth.REGISTER && "registrar")} disabled={false} type={EnumPrimaryButton.OUTLINED} />
                        </div>

                        {
                            type === EnumAuth.LOGIN &&
                            <div className="flex gap-1 mt-2 max-[440px]:flex-col">
                                <p>Não tem uma conta ainda ?</p>
                                <p onClick={() => router.push("/register")} className="text-blue-500 cursor-pointer hover:underline hover:text-blue-700">Crie uma aqui</p>
                            </div>
                        }
                        {
                            type === EnumAuth.REGISTER &&
                            <div className="flex gap-1 mt-2">
                                <p>Já possui uma conta ?</p>
                                <p onClick={() => router.push("/login")} className="text-blue-500 cursor-pointer hover:underline hover:text-blue-700">Entrar</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};