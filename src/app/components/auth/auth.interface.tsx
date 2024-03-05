export enum EnumAuth {
    LOGIN="login",
    REGISTER="register",
    ADMIN="admin",
};

export interface IAuth {
    type: EnumAuth,
    email?: string,
    password?: string,
    handleEmail?: (email: string) => void,
    handlePassword?: (password: string) => void,
}