"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../../../../public/images/logo.png";
import Link from "next/link";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { LoadingSpinner } from "@/app/common/components/loading/loading-spinner/loading-spinner.component";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import { useHeader } from "./hooks/header.hook";
import { Dropdown } from "@/app/common/components/dropdown/dropdown.component";

export const Header = () => {
  const {
    redirect,
    isAuthenticated,
    isLoading,
    isVisible,
    menuOptions,
    handleDropdownVisibility,
    menuRef,
    userInfo,
  } = useHeader();
  return (
    <div className="fixed top-0 flex items-center justify-between w-full px-8 h-20 bg-white z-30">
      <Link
        href={"/"}
        className="flex items-center h-full cursor-pointer w-24 xs:w-28"
      >
        <Image
          src={Logo}
          alt="logo"
          className="outline-none border-none cursor-pointer object-cover select-none"
          priority={true}
          objectFit="cover"
        />
      </Link>
      {isLoading ? (
        <LoadingSpinner size={48} />
      ) : isAuthenticated ? (
        // user menu options
        <div className="relative" ref={menuRef}>
          <Image
            src={userInfo.userImage}
            alt={userInfo.userName}
            className="cursor-pointer object-cover select-none w-10 xs:w-12 sm:w-14 rounded-full"
            priority={true}
            objectFit="cover"
            height={0}
            width={0}
            onClick={handleDropdownVisibility}
          />
          <Dropdown
            visibility={isVisible.dropdown}
            content={menuOptions.map((option, index) => (
              <p
                key={index}
                className="block w-full text-left px-4 py-2 text-sm rounded-md text-gray-700 hover:text-white hover:bg-primary cursor-pointer"
                onClick={option.onClick}
              >
                {option.label}
              </p>
            ))}
            styles="mt-2 w-48 rounded-md"
          />
        </div>
      ) : (
        <PrimaryButton
          styles={"max-xs:text-sm max-xs:w-24 xs:text-base xs:w-32"}
          onClick={() => redirect.push(Pathnames.AUTH)}
          text="entrar"
          type={PrimaryButtonTypes.PRIMARY}
        />
      )}
    </div>
  );
};
