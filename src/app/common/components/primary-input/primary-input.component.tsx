"use client";

import React from "react";
import { IPrimaryInput, PrimaryInputTypes } from "./primary-input.types";
import { usePrimaryInput } from "./hooks/primary-input.hook";

const InputBase = ({
  type,
  label,
  text,
  placeholder,
  handleOnChange,
  icon,
  ...rest
}: IPrimaryInput &
  React.InputHTMLAttributes<HTMLInputElement>): JSX.Element => (
  <div className="flex flex-col w-full gap-1">
    {label && (
      <label className="block text-base font-medium text-gray-500">
        {label}
      </label>
    )}
    <div className="relative flex items-center bg-white w-full border-2 border-gray-300 rounded-lg focus-within:border-primary px-3">
      {icon}
      <input
        className="p-4 pr-16 text-gray-500 text-base w-full border-none focus:outline-none rounded-lg"
        type={type}
        placeholder={placeholder}
        value={text}
        onChange={(e) => handleOnChange(e.target.value)}
        {...rest}
      />
    </div>
  </div>
);

const InputNumber = ({
  type,
  text,
  placeholder,
  handleOnChange,
  ...rest
}: IPrimaryInput): JSX.Element => {
  const { handleKeyDown } = usePrimaryInput();
  return (
    <InputBase
      {...rest}
      type={type}
      text={text}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      handleOnChange={handleOnChange}
    />
  );
};

const InputDate = ({
  handleOnChange,
  text,
  type,
  ...rest
}: IPrimaryInput): JSX.Element => {
  const { inputIcons } = usePrimaryInput();
  return (
    <InputBase
      {...rest}
      text={text}
      type={type}
      icon={inputIcons.calendar()}
      onMouseDown={(e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        e.currentTarget.showPicker();
      }}
      handleOnChange={handleOnChange}
    />
  );
};

const InputSearch = ({
  type,
  text,
  handleOnSearch,
  handleOnChange,
  ...rest
}: IPrimaryInput) => {
  const { inputIcons } = usePrimaryInput();
  return (
    <InputBase
      {...rest}
      type={type}
      text={text}
      handleOnChange={handleOnChange}
      icon={inputIcons.searchGlass(handleOnSearch!)}
    />
  );
};

export const PrimaryInput = ({
  type,
  text,
  handleOnChange,
  handleOnSearch,
  ...rest
}: IPrimaryInput) => {
  switch (type) {
    case PrimaryInputTypes.SEARCH:
      return (
        <InputSearch
          text={text}
          type={type}
          handleOnChange={handleOnChange}
          handleOnSearch={handleOnSearch}
          {...rest}
        />
      );
    case PrimaryInputTypes.NUMBER:
      return (
        <InputNumber
          text={text}
          type={type}
          handleOnChange={handleOnChange}
          {...rest}
        />
      );
    case PrimaryInputTypes.DATE:
      return (
        <InputDate
          text={text}
          type={type}
          handleOnChange={handleOnChange}
          {...rest}
        />
      );
    default:
      return (
        <InputBase
          text={text}
          type={type}
          handleOnChange={handleOnChange}
          {...rest}
        />
      );
  }
};
