"use client"

import React from "react";
import { sizeIcons } from "@/constants/size-icons";
import { MoreVertical } from "lucide-react";
import { useLogout } from "./hooks/logout.hooks";
import { Dropdown } from "@/app/components/dropdown/dropdown.component";

export const Logout = () => {
    const { userOptions, dropdownRef, handleShowLogoutModal,toggleDropdown } = useLogout();
    return (
        <div className="relative flex items-center h-20 z-40" ref={dropdownRef}>
                <Dropdown width="160px" isOpen={userOptions.isUserOptionsOpen} content={
                    <li className="cursor-pointer rounded-md block px-4 py-2 text-gray-600 hover:bg-indigo-50" onClick={handleShowLogoutModal}>
                        Desconectar
                    </li>
                } />

            <div onClick={toggleDropdown} className="cursor-pointer hover:text-gray-500">
                <MoreVertical size={sizeIcons.small} />
            </div>
        </div>
    );
};