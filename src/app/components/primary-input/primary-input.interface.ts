export enum EnumPrimaryInput {
    TEXT = "text",
    EMAIL = "email",
    PASSWORD = "password",
};

export interface IPrimaryInput {
    type: EnumPrimaryInput,
    text: string,
    placeholder: string,
};