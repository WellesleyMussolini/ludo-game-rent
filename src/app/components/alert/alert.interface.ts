export enum EnumAlert {
    DEFAULT="default",
    SUCCESSFUL="successful",
    WARNING="warning",
    ERROR="error",
};

export interface IAlert {
    visibility: boolean;
    text: string
    type: EnumAlert,
    handleAlertVisibility: (visibility: boolean) => void,
};