import { ReactNode } from "react";

export enum EnumPrimaryButton {
    PRIMARY="primary",
    SECONDARY="secondary",
    OUTLINED="outlined",
    DISABLED="disabled"
};

export interface IPrimaryButton {
    text: string | ReactNode,
    type: EnumPrimaryButton,
    disabled?: boolean | undefined,
    isLoading?: boolean,
    handleClick: () => void,
};