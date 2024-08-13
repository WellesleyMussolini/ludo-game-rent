"use client"

import React from "react";
import { Dropdown } from "@/app/components/dropdown/dropdown.component";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IBoardGameDropdown } from "./dropdown.interface";
import { useBoardgameDropdownStatus } from "./hooks/use-dropdown-status.hook";

export const BoardGameDropdown = ({ statusList, boardgameStatus, handleOnChangeFields }: IBoardGameDropdown) => {
    const {dropdownContent, isDropdownOpen, setIsDropdownOpen} = useBoardgameDropdownStatus(statusList, handleOnChangeFields);
    return (
        <div className="relative flex items-center flex-col gap-2 z-50 text-gray-500 max-[330px]:w-full">
            <div className={`shadow-md border border-opacity-5 border-black ease-linear flex justify-around h-16 items-center bg-white rounded cursor-pointer
                w-48
                max-[330px]:w-full
            `}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onDragStart={(event) => event.preventDefault()}>
                <p className="font-medium">{boardgameStatus}</p>
                <div className="flex justify-center items-center">{isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
            </div>

            {/* DROPDOWN */}
            <div className="absolute top-[70px] w-48
                max-[330px]:w-full
                ">
                <Dropdown isOpen={isDropdownOpen} content={dropdownContent} />
            </div>
        </div>
    );
};