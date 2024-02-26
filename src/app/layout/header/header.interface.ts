export enum EnumHeader {
    DEFAULT="default",
    ADMIN="admin",
};

export interface IHeader {
    type: EnumHeader,
    openSidebar?: boolean,
    handleOpenSidebar?: (openSidebar: boolean) => void,
};