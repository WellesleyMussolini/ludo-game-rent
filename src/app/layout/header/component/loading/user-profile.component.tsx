"use client"

import { Dropdown } from "@/app/components/dropdown/dropdown.component"
import { signOut, useSession } from "next-auth/react";
import Image from "next/image"

export const UserProfile = ({ isOpen, handleIsOpen }: { isOpen: boolean, handleIsOpen: (isOpen: boolean) => void }) => {
    const { data: session, status } = useSession();
    return (
        (status === "loading" || status === "authenticated") &&
        <div className={`${!status && "hidden"}`}>
            {
                status === "loading" ?
                    <svg className="w-[45px] h-[45px] me-3 text-gray-200 dark:text-gray-700 animate-pulse" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                    </svg>
                    :
                    <div className="flex flex-col justify-center items-center cursor-pointer">
                        <Image onClick={() => handleIsOpen(!isOpen)} className="rounded-full" src={session?.user?.image || ""} width={45} height={45} alt={session?.user?.name || ""} />
                        <div className="absolute top-[65px] flex items-center w-[80px]">
                            <Dropdown isOpen={isOpen}
                                content={<p className="text-gray-500 w-full text-center font-medium rounded hover:bg-primary px-2 py-1 hover:text-white" onClick={() => { signOut() }}>SAIR</p>} /></div>
                    </div>
            }
        </div>
    );
};