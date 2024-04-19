"use client"

import { sizeIcons } from "@/constants/size-icons";
import { MoreVertical } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

export const Logout = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    return <div className="relative flex items-center h-36 z-40">
        {isOpen  && (
            <div className={`absolute top-0 right-0 w-40 bg-white rounded-lg shadow-md border z-10`}>
                <ul className="py-2 px-2">
                    <li className="cursor-pointer rounded-md block px-4 py-2 text-gray-600 hover:bg-indigo-50" onClick={() => signOut()}>Desconectar</li>
                </ul>
            </div>
        )}
        <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
            <MoreVertical size={sizeIcons.small} />
        </div>
    </div>
};