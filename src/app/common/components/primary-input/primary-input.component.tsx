"use client";

import { IoSearchSharp } from "react-icons/io5";
import { IPrimaryInput, PrimaryInputTypes } from "./primary-input.types";
import { preventStringOnInputNumber } from "./utils/prevent-string-on-input-number";
import { sizeIcons } from "../../constants/size-icons";
import { MdOutlineEmail } from "react-icons/md";
import { BiLockAlt } from "react-icons/bi";
import { IconType } from "react-icons";

const InputIconMap: Record<PrimaryInputTypes, IconType | null> = {
  [PrimaryInputTypes.SEARCH]: IoSearchSharp,
  [PrimaryInputTypes.EMAIL]: MdOutlineEmail,
  [PrimaryInputTypes.PASSWORD]: BiLockAlt,
  [PrimaryInputTypes.TEXT]: null,
  [PrimaryInputTypes.NUMBER]: null,
};

const InputIcon = ({ type }: { type: PrimaryInputTypes }) => {
  const IconComponent = InputIconMap[type];
  return (
    IconComponent && (
      <div className="flex justify-center items-center w-16 text-gray-500 bg-white">
        <IconComponent size={sizeIcons.medium} />
      </div>
    )
  );
};

export const PrimaryInput = ({
  text,
  type,
  placeholder,
  handleOnChange,
}: IPrimaryInput) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === PrimaryInputTypes.NUMBER) {
      preventStringOnInputNumber(event);
    }
  };
  return (
    <div className="flex items-center bg-white w-full border-2 border-gray-300 rounded-lg focus-within:border-primary focus-within:outline-none">
      <input
        className="block p-4 text-gray-500 text-base w-full border-none focus:outline-none rounded-lg"
        type={type}
        placeholder={placeholder}
        value={text}
        onChange={(event) => handleOnChange(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <InputIcon type={type} />
    </div>
  );
};
