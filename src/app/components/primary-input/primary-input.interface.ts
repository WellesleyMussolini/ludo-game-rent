export enum EnumPrimaryInputType {
    TEXT = "text",
    NUMBER = "number",
    EMAIL = "email",
    PASSWORD = "password",
};

export enum EnumPrimaryInputStyle {
    PRIMARY="primary",
    SECONDARY="secondary",
};

export interface IPrimaryInput {
    type: EnumPrimaryInputType,
    style: EnumPrimaryInputStyle,
    text: string,
    placeholder?: string,
    id?: string,
    htmlFor?: string,
    handleOnChange: (value: string) => void,
};