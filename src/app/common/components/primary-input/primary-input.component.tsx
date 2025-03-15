"use client";

import { IoSearchSharp } from "react-icons/io5";
import { IPrimaryInput, PrimaryInputTypes } from "./primary-input.types";
import { sizeIcons } from "../../constants/size-icons";
import { usePrimaryInput } from "./hooks/primary-input.hook";

export const PrimaryInput = ({
  type,
  placeholder,
  text,
  label,
  handleOnChange,
  handleOnSearch,
}: IPrimaryInput) => {
  const { handleInput, handleKeyDown } = usePrimaryInput(type, handleOnChange);
  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label className="block text-base font-medium text-gray-500">
          {label}
        </label>
      )}
      <div className="flex items-center bg-white w-full border-2 border-gray-300 rounded-lg focus-within:border-primary">
        <input
          className="p-4 text-gray-500 text-base w-full border-none focus:outline-none rounded-lg"
          type={type}
          placeholder={placeholder}
          value={text}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
        />
        {type === PrimaryInputTypes.SEARCH && (
          <div
            className="cursor-pointer flex justify-center items-center w-16 text-gray-500"
            onClick={handleOnSearch}
          >
            <IoSearchSharp size={sizeIcons.medium} />
          </div>
        )}
      </div>
    </div>
  );
};
