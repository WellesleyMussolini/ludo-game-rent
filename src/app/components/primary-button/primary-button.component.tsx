"use client"

import React from "react";
import { LoadingSpinner } from "../loading-spinner/loading-spinner.component";
import { EnumPrimaryButton, IPrimaryButton } from "./primary-button.interface";
import { GoogleIcon } from "./google-icon.component";

export const PrimaryButton = ({ isLoading, text, type, disabled, loadingSize, handleClick }: IPrimaryButton) => <button
    className={`
    ${type === EnumPrimaryButton.PRIMARY && "text-white bg-primary hover:brightness-90 cursor-pointer uppercase"}
    ${type === EnumPrimaryButton.SECONDARY && "text-white bg-secondary hover:brightness-90 cursor-pointer uppercase"}
    ${type === EnumPrimaryButton.DELETE && "text-white bg-red-500 hover:brightness-90 cursor-pointer uppercase"}
    ${type === EnumPrimaryButton.OUTLINED && "text-primary bg-white border-2 border-primary hover:bg-primary hover:text-white cursor-pointer uppercase"}
    ${type === EnumPrimaryButton.DISABLED && "text-white border-2 bg-disabled cursor-not-allowed uppercase"}
    ${type === EnumPrimaryButton.GOOGLE && "bg-transparent hover:bg-gray-100 border rounded-[0.5rem] text-gray-500 font-medium py-3 px-6"}
    tracking-widest 
    flex
    items-center
    justify-center
    duration-300 ease-in-out 
    font-black 
    text-sm
    w-full 
    rounded  
    px-3 
    py-2
    min-h-10
`} disabled={disabled} onClick={handleClick}>
    {type === EnumPrimaryButton.GOOGLE
        ?
        (isLoading ? <LoadingSpinner size={loadingSize || 30} /> : <div className="flex items-center justify-center gap-3"><GoogleIcon /> {text}</div>)
        :
        (isLoading ? <LoadingSpinner size={loadingSize || 30} /> : text)}
</button>;