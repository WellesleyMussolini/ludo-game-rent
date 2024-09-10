import React from "react";
import { LoadingSpinner } from "../../loading/loading-spinner/loading-spinner.component";
import { GoogleIcon } from "../icons/google-icon.component";
import { PrimaryButtonStyles } from "../types/primary-button.types";

export const usePrimaryButton = (isLoading = false, loadingSize: number | undefined, text: React.ReactNode, type: PrimaryButtonStyles) => {
    const typeClasses: Record<PrimaryButtonStyles, string> = {
        [PrimaryButtonStyles.PRIMARY]:
            "text-white bg-green-500 hover:bg-green-600 cursor-pointer",
        [PrimaryButtonStyles.SECONDARY]:
            "border border-slate-50 bg-slate-50 text-zinc-950 hover:bg-slate-50",
        [PrimaryButtonStyles.ALERT]:
            "border bg-[#ebb44f] text-white",
        [PrimaryButtonStyles.DELETE]:
            "text-white bg-red-500 hover:bg-red-600 cursor-pointer",
        [PrimaryButtonStyles.OUTLINED]:
            "text-primary bg-white border-2 border-primary hover:bg-primary hover:text-white cursor-pointer",
        [PrimaryButtonStyles.DISABLED]:
            "text-white border-2 bg-disabled cursor-not-allowed",
        [PrimaryButtonStyles.GOOGLE]:
            "bg-transparent hover:bg-gray-100 border rounded-[0.5rem] text-gray-500 font-medium py-3 px-6",
    };

    const buttonContent = isLoading ? (<LoadingSpinner size={loadingSize} />) : type === PrimaryButtonStyles.GOOGLE ? (
        <div className="flex items-center justify-center gap-3"> <GoogleIcon /> {text} </div>) : (text);

    return { typeClasses, buttonContent };
};