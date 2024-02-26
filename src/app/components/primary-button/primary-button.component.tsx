"use client"

import React from "react";
import { LoadingSpinner } from "../loading-spinner/loading-spinner.component";
import { EnumPrimaryButton, IPrimaryButton } from "./primary-button.interface";

export const PrimaryButton = ({ isLoading, text, type, disabled, handleClick }: IPrimaryButton) => <button
    className={`
    ${type === EnumPrimaryButton.PRIMARY && "text-white bg-primary hover:brightness-90 cursor-pointer"}
    ${type === EnumPrimaryButton.SECONDARY && "text-white bg-secondary hover:brightness-90 cursor-pointer"}
    ${type === EnumPrimaryButton.OUTLINED && "text-primary transparent border-2 border-primary hover:bg-primary hover:text-white cursor-pointer"}
    ${type === EnumPrimaryButton.DISABLED && "text-white border-2 bg-disabled cursor-not-allowed"}
    tracking-widest 
    flex
    items-center
    justify-center
    duration-300 ease-in-out
    uppercase 
    font-black 
    text-sm
    w-full 
    rounded  
    px-3 
    py-2
    min-h-10
`} disabled={disabled} onClick={handleClick}> {isLoading ? <LoadingSpinner size={30} color="primary" /> : text}</button>;