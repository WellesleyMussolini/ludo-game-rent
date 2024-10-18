"use client";

import { IoSearchSharp } from "react-icons/io5";
import { IPrimaryInput, PrimaryInputTypes } from "./primary-input.types";
import { sizeIcons } from "../../constants/size-icons";
import { usePrimaryInput } from "./hooks/primary-input.hook";

export const PrimaryInput = ({
  type,
  placeholder,
  text,
  handleOnChange,
  handleOnSearch,
}: IPrimaryInput) => {
  const { handleInput, handleKeyDown } = usePrimaryInput(type, handleOnChange);
  return (
    <div className="flex items-center bg-white w-full border-2 border-gray-300 rounded-lg focus-within:border-primary focus-within:outline-none">
      <input
        className="block p-4 text-gray-500 text-base w-full border-none focus:outline-none rounded-lg"
        type={type}
        placeholder={placeholder}
        value={text}
        onInput={handleInput}
        onKeyDown={handleKeyDown}
      />
      <div
        className={`flex justify-center items-center ${
          type !== PrimaryInputTypes.SEARCH && "hidden"
        } w-16 text-gray-500 bg-white`}
        onClick={handleOnSearch}
      >
        <IoSearchSharp size={sizeIcons.medium} />
      </div>
    </div>
  );
};
