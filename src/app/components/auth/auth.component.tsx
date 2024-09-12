"use client";

import React from "react";
import { useAuth } from "./hooks/auth.hook";
import { IAuth } from "./types/auth.types";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { PrimaryButtonStyles } from "../primary-button/types/primary-button.types";

export const Auth = ({ type }: IAuth) => {
  const { isLoading, handleSignIn } = useAuth({ type });
  return (
    <div className="flex items-center justify-center h-[calc(100vh-80px)]">
      <div
        className={`flex items-center flex-col bg-[#FFFFFF] shadow-lg rounded p-10 text-gray-500 text-[.875rem] font-medium duration-300 h-auto             
        max-[425px]:w-full max-[425px]:h-[100vh_-_80px] max-[640px]:w-[80%] min-[640px]:w-[32rem] max-[425px]:shadow-none`}
      >
        <PrimaryButton
          isLoading={isLoading}
          text="Entrar com Google"
          type={PrimaryButtonStyles.GOOGLE}
          onClick={handleSignIn}
        />
      </div>
    </div>
  );
};
