import React from "react";

export enum EnumPrimaryButton {
    PRIMARY="primary",
    SECONDARY="secondary",
    OUTLINED="outlined",
    DISABLED="disabled",
    GOOGLE="google",
    DELETE="delete",
    ALERT="alert",
};

export interface IPrimaryButton {
    styles?: string,
    text: string | React.ReactNode,
    type: EnumPrimaryButton,
    disabled?: boolean | undefined,
    loadingSize?: number,
    isLoading?: boolean,
    onClick: (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void), 
};