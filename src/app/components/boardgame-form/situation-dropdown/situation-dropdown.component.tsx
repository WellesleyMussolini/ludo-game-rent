import React from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { Dropdown } from "../../dropdown/dropdown.component";

export const SituationDropDown = ({
    situations, boardGameSituation, handleBoardGameSituation
}: { situations: string[], boardGameSituation: string, handleBoardGameSituation: (boardGameSituation: string) => void }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const handleSituationChange = (state: string) => {
        handleBoardGameSituation(state);
        setIsOpen(false);
    };
    return (
        <div className="relative flex items-center flex-col gap-2 z-50 text-gray-500">
            <div
                className={`shadow-md w-48 border border-opacity-5 border-black duration-200 ease-linear flex justify-around h-16 items-center bg-white rounded cursor-pointer`}
                onClick={() => setIsOpen(!isOpen)}
                onDragStart={(event) => event.preventDefault()}
            >
                <p className="text-base font-medium">{boardGameSituation}</p>
                <div className="flex justify-center items-center">
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>

            {/* DROPDOWN */}
            <div className="absolute top-[70px] w-48">
                <Dropdown isOpen={isOpen} content={situations.map((situation, index) => (
                    <li
                        key={index}
                        className="select-none w-full flex items-center gap-2 px-4 cursor-pointer duration-200 hover:bg-primary hover:rounded hover:text-white py-2"
                        onDragStart={(event) => event.preventDefault()}
                        onClick={() => handleSituationChange(situation)}>
                        <p className="text-base font-medium">{situation}</p>
                    </li>
                ))} />
            </div>
        </div>
    );
};