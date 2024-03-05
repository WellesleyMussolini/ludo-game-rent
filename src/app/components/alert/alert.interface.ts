export enum EnumAlert {
    DEFAULT="default",
    SUCCESS="success",
    WARN="warn",
    ERROR="error"
}

export interface IAlert {
    // type: EnumAlert,
    type: "info" | "success" | "error" | "warn",
    message: string,
    visibility: boolean,
};