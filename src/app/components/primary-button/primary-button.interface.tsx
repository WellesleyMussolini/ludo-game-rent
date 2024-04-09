import { ReactNode } from "react";

export enum EnumPrimaryButton {
    PRIMARY="primary",
    SECONDARY="secondary",
    OUTLINED="outlined",
    DISABLED="disabled",
    GOOGLE="google",
    DELETE="delete",
};

export interface IPrimaryButton {
    text: string | ReactNode,
    type: EnumPrimaryButton,
    disabled?: boolean | undefined,
    loadingSize?: number,
    isLoading?: boolean,
    onClick: (() => void) | undefined,
};