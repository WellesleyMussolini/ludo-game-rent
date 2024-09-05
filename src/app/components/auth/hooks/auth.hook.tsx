import React from "react";
import { Pathnames } from "../../../common/types/pathnames";
import { EnumAuth, IAuth } from "../types/auth.types";
import { signIn } from "next-auth/react";

export const useAuth = ({ type }: IAuth) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const getSignInCallbackUrl = (): string => {
        switch (type) {
            case EnumAuth.AUTH:
                setIsLoading(true);
                return Pathnames.HOME;
            case EnumAuth.ADMIN:
                setIsLoading(true);
                return Pathnames.ADMIN;
            default:
                console.warn(`Unexpected auth type "${type}" provided. Ensure that the 'type' value is one of the defined EnumAuth values.`);
                return Pathnames.HOME;
        };
    };

    const handleSignIn = () => signIn("google", { callbackUrl: getSignInCallbackUrl() });

    return { isLoading, handleSignIn };
};