import React from "react";
import { LoadingSpinner } from "../../loading/loading-spinner/loading-spinner.component";
import { GoogleIcon } from "../icons/google-icon.component";
import { EnumPrimaryButton } from "../types/primary-button.types";

export const usePrimaryButton = (isLoading = false, loadingSize: number | undefined, text: React.ReactNode, type: EnumPrimaryButton) => {
    const typeClasses: Record<EnumPrimaryButton, string> = {
        [EnumPrimaryButton.PRIMARY]:
            "text-white bg-green-500 hover:bg-green-600 cursor-pointer",
        [EnumPrimaryButton.SECONDARY]:
            "border border-slate-50 bg-slate-50 text-zinc-950 hover:bg-slate-50",
        [EnumPrimaryButton.ALERT]:
            "border bg-[#ebb44f] text-white",
        [EnumPrimaryButton.DELETE]:
            "text-white bg-red-500 hover:bg-red-600 cursor-pointer",
        [EnumPrimaryButton.OUTLINED]:
            "text-primary bg-white border-2 border-primary hover:bg-primary hover:text-white cursor-pointer",
        [EnumPrimaryButton.DISABLED]:
            "text-white border-2 bg-disabled cursor-not-allowed",
        [EnumPrimaryButton.GOOGLE]:
            "bg-transparent hover:bg-gray-100 border rounded-[0.5rem] text-gray-500 font-medium py-3 px-6",
    };

    const buttonContent = isLoading ? (<LoadingSpinner size={loadingSize} />) : type === EnumPrimaryButton.GOOGLE ? (
        <div className="flex items-center justify-center gap-3"> <GoogleIcon /> {text} </div>) : (text);
    
    return { typeClasses, buttonContent };
};