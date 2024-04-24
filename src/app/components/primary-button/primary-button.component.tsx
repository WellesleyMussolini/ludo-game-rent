"use client"

import React from "react";
import { LoadingSpinner } from "../loading-spinner/loading-spinner.component";
import { EnumPrimaryButton, IPrimaryButton } from "./primary-button.interface";
import { GoogleIcon } from "./google-icon.component";

export const PrimaryButton = ({ styles, isLoading, text, type, disabled, loadingSize, onClick }: IPrimaryButton) => <button
    type="button"
    className={`
    ${type === EnumPrimaryButton.PRIMARY && "text-white bg-primary hover:brightness-90 cursor-pointer"}
    ${type === EnumPrimaryButton.SECONDARY && "border border-slate-50 bg-slate-50 text-zinc-950 hover:text-zinc-950 hover:bg-slate-50"}
    ${type === EnumPrimaryButton.ALERT && "border bg-[#ebb44f] text-white"}
    ${type === EnumPrimaryButton.DELETE && "text-white bg-red-500 hover:brightness-90 cursor-pointer "}
    ${type === EnumPrimaryButton.OUTLINED && "text-primary bg-white border-2 border-primary hover:bg-primary hover:text-white cursor-pointer "}
    ${type === EnumPrimaryButton.DISABLED && "text-white border-2 bg-disabled cursor-not-allowed "}
    ${type === EnumPrimaryButton.GOOGLE && "bg-transparent hover:bg-gray-100 border rounded-[0.5rem] text-gray-500 font-medium py-3 px-6"}
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
    ${styles}
`} disabled={disabled} onClick={onClick}>
    {type === EnumPrimaryButton.GOOGLE
        ?
        (isLoading ? <LoadingSpinner size={loadingSize || 30} /> : <div className="flex items-center justify-center gap-3"><GoogleIcon /> {text}</div>)
        :
        (isLoading ? <LoadingSpinner size={loadingSize || 30} /> : text)}
</button>;