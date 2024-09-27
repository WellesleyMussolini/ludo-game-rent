import React from "react";
import Image from "next/image";
import { useUserMenu } from "../hooks/user-menu.hook";
import { Dropdown } from "@/app/common/components/dropdown/dropdown.component";

export const UserMenu = () => {
    const { isDropdownOpen, menuOptions, handleDropdownVisibility, menuRef, userInfo } = useUserMenu();
    return (
        <div className="relative" ref={menuRef}>
            <Image
                src={userInfo.userImage}
                alt={userInfo.userName}
                className="cursor-pointer object-cover select-none w-12 xs:w-14 rounded-full"
                priority={true}
                objectFit="cover"
                height={0}
                width={0}
                onClick={handleDropdownVisibility}
            />
            <Dropdown
                visibility={isDropdownOpen}
                content={menuOptions.map((option, index) => (
                    <p
                        key={index}
                        className="block w-full text-left px-4 py-2 text-sm rounded-md text-gray-700 hover:text-white hover:bg-primary cursor-pointer"
                        onClick={option.onClick}
                    >
                        {option.label}
                    </p>
                ))}
                styles="mt-2 w-48 rounded-md"
            />
        </div>
    );
};