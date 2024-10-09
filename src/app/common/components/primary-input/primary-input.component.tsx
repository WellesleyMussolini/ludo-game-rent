"use client";

import { IoSearchSharp } from "react-icons/io5";
import { IPrimaryInput, PrimaryInputTypes } from "./primary-input.types";
import { preventStringOnInputNumber } from "./utils/prevent-string-on-input-number";
import { sizeIcons } from "../../constants/size-icons";
import { usePathname, useRouter } from "next/navigation";
import { Pathnames } from "../../types/pathnames.enum";

export const PrimaryInput = ({
  text,
  type,
  placeholder,
  handleOnChange,
  handleOnSearch,
}: IPrimaryInput) => {
  const router = useRouter();
  const pathname = usePathname();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (type === PrimaryInputTypes.NUMBER)
      return preventStringOnInputNumber(event);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === "") {
      handleOnChange("");
      return pathname === Pathnames.HOME
        ? router.push("/")
        : router.push("/admin");
    }

    handleOnChange(value);
  };
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
