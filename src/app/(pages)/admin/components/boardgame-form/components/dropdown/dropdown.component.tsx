import { Dropdown } from "@/app/components/dropdown/dropdown.component";
import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IBoardGameDropdown } from "./dropdown.interface";

export const BoardGameDropdown = ({ status, boardgameStatus, handleOnChangeFields }: IBoardGameDropdown) => {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);

    const dropdownContent = React.useMemo(() => {
        return status.map((chosenStatus, index) => (
            <li key={index}
                className="select-none w-full flex items-center gap-2 px-4 cursor-pointer duration-200 hover:bg-primary hover:rounded hover:text-white py-2"
                onDragStart={(event) => event.preventDefault()}
                onClick={() => {
                    handleOnChangeFields("status", chosenStatus);
                    setIsDropdownOpen(false);
                }}>
                <p className="text-base font-medium">{chosenStatus}</p>
            </li>
        ));
    }, [status, handleOnChangeFields]);

    return (
        <div className="relative flex items-center flex-col gap-2 z-50 text-gray-500">
            <div className={`shadow-md w-48 border border-opacity-5 border-black duration-200 ease-linear flex justify-around h-16 items-center bg-white rounded cursor-pointer`}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onDragStart={(event) => event.preventDefault()}>
                <p className="text-base font-medium">{boardgameStatus}</p>
                <div className="flex justify-center items-center">{isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}</div>
            </div>

            {/* DROPDOWN */}
            <div className="absolute top-[70px] w-48">
                <Dropdown isOpen={isDropdownOpen} content={dropdownContent} />
            </div>
        </div>
    );
};