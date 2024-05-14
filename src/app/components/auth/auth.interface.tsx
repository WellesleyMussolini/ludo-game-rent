export enum EnumAuth {
    LOGIN="login",
    REGISTER="register",
    ADMIN="admin",
};

export interface IAuth {
    type: EnumAuth
}