"use client";

import { IPrimaryInput, PrimaryInputTypes } from "./primary-input.types";
import { preventStringOnInputNumber } from "./utils/prevent-string-on-input-number";

export const PrimaryInput = ({
  text,
  type,
  placeholder,
  handleOnChange,
}: IPrimaryInput) => (
  <input
    className="
    block 
    w-full 
    p-4 
    text-gray-500
    border-2 
    border-gray-300 
    rounded-lg 
    text-base 
    focus:outline-primary"
    type={type}
    placeholder={placeholder}
    value={text}
    onChange={(event) => handleOnChange(event.target.value)}
    onKeyDown={(event) => {
      if (type === PrimaryInputTypes.NUMBER) {
        preventStringOnInputNumber(event);
      }
    }}
  />
);
