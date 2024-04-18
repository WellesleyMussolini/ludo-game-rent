"use client"

import { sizeIcons } from "@/constants/size-icons";
import { MoreVertical } from "lucide-react";
import { signOut } from "next-auth/react";
import React from "react";

export const Logout = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="relative flex items-center h-36 z-40">
            {isOpen && (
                <div className={`absolute top-0 right-0 w-40 bg-white rounded-lg shadow-md border z-10`}>
                    <div className="py-1">
                        <a className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={() => signOut()}>Desconectar</a>
                    </div>
                </div>
            )}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                <MoreVertical size={sizeIcons.small} />
            </div>
        </div>
    );
};

/*
export const DropdownOptions = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="relative flex items-center h-[390px] z-[90]">
            {isOpen && (
                <div className={`absolute top-0 right-0 mt-12 ${isOpen ? "w-40" : "max-w-0"} duration-300  bg-white rounded-lg shadow-md border z-10`}>
                    <div className="py-1">
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Option 1</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Option 2</a>
                        <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Option 3</a>
                    </div>
                </div>
            )}
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
                <MoreVertical size={sizeIcons.small} />
            </div>
        </div>
    );
};
*/