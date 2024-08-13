import { EnumPathnames } from "@/types/pathnames.enum";
import { EnumAuth, IAuth } from "../types/auth.types";

export const useAuth = ({ type }: IAuth) => {
    const getSignInCallbackUrl = (): string => {
        switch (type) {
            case EnumAuth.AUTH:
                return EnumPathnames.HOME;
            case EnumAuth.ADMIN:
                return EnumPathnames.ADMIN;
            default:
                console.warn(`Unexpected auth type "${type}" provided. Ensure that the 'type' value is one of the defined EnumAuth values.`);
                return EnumPathnames.HOME;
        };
    };
    return { getSignInCallbackUrl };
};