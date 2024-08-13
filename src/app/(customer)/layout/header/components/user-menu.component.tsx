import React from "react";
import Image from "next/image";
import { useUserSession } from "@/app/hooks/user-session.hook";
import { useUserMenu } from "../hooks/user-menu.hook";

export const UserMenu = () => {
    const { session } = useUserSession();
    const { isDropdownOpen, menuOptions, handleDropdownVisibility, menuRef } = useUserMenu();

    return (
        <div className="relative" ref={menuRef}>
            <Image
                src={session?.user?.image ?? ""}
                alt={session?.user?.name ?? ""}
                className="cursor-pointer object-cover select-none w-12 xs:w-14 rounded-full"
                priority={true}
                objectFit="cover"
                height={0}
                width={0}
                onClick={handleDropdownVisibility}
            />

            {/* Dropdown */}
            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-md py-2 px-2">
                    {menuOptions.map((option, index) => (
                        <p
                            key={index}
                            className="block w-full text-left px-4 py-2 text-sm rounded-md text-gray-700 hover:text-white hover:bg-primary cursor-pointer"
                        >
                            {option.label}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};