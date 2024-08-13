"use client";

import React from "react";
import { IPrimaryButton } from "./types/primary-button.types";
import { usePrimaryButton } from "./hooks/primary-button.hook";

export const PrimaryButton = ({
    styles = "",
    isLoading = false,
    text,
    type,
    disabled = false,
    loadingSize,
    onClick,
}: IPrimaryButton) => {
    const {typeClasses, buttonContent} = usePrimaryButton(isLoading, loadingSize, text, type);
    return (
        <button
            type="button"
            className={`
              tracking-widest 
              uppercase
              flex
              items-center
              justify-center
              duration-300 
              ease-in-out 
              font-black 
              w-full 
              rounded  
              px-3 
              py-2
              ${typeClasses[type]}
              ${styles}
          `}
            disabled={disabled}
            onClick={onClick}
        >
            {buttonContent}
        </button>
    );
};