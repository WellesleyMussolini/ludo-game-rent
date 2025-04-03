"use client";

import React from "react";
import { IPrimaryInput, PrimaryInputTypes } from "./primary-input.types";
import { IoSearchSharp } from "react-icons/io5";
import { sizeIcons } from "../../constants/size-icons";

export const PrimaryInput = ({
  type,
  label,
  text,
  placeholder,
  handleOnChange,
  handleOnSearch,
}: IPrimaryInput): JSX.Element => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (type === PrimaryInputTypes.NUMBER) {
      // Permite números, ponto decimal e backspace
      const newValue = event.target.value.replace(/[^\d.]/g, "");

      // Garante que só tenha um ponto decimal
      const parts = newValue.split(".");
      if (parts.length > 2) {
        // Se houver mais de um ponto, mantém apenas o primeiro
        event.target.value = parts[0] + "." + parts.slice(1).join("");
      } else {
        event.target.value = newValue;
      }
    }

    handleOnChange?.(event.target.value);
  };
  return (
    <div className="flex flex-col w-full gap-1">
      {label && (
        <label className="block text-base font-medium text-gray-500">
          {label}
        </label>
      )}
      <div className="relative flex items-center bg-white w-full border-2 border-gray-300 rounded-lg focus-within:border-primary px-3">
        <input
          className="p-4 pr-16 text-gray-500 text-base w-full border-none focus:outline-none rounded-lg"
          type={type}
          placeholder={placeholder}
          value={text}
          onChange={handleChange}
        />
        {type === PrimaryInputTypes.SEARCH && (
          <div
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
            onClick={handleOnSearch}
          >
            <IoSearchSharp
              className="text-gray-500 mr-2"
              size={sizeIcons.medium}
            />
          </div>
        )}
      </div>
    </div>
  );
};
