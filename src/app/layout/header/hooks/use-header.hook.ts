import { useSession } from "next-auth/react";
import React from "react";

export const useHeader = () => {
    const { status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
    const authenticated = status === "authenticated";
    const isLoading = status === "loading";

    return {
        isMenuOpen,
        setIsMenuOpen,
        authenticated,
        isLoading,
    };
};