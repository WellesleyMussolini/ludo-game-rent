import { useContext } from "@/context/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

export const useHeader = () => {
    const { status } = useSession();
    const {expandedSidebar} = useContext();
    const [isCartOpen, setIsCartOpen] = React.useState<boolean>(false);
    const router = useRouter();
    const authenticated = status === "authenticated";
    const isLoading = status === "loading";

    return {
        isCartOpen,
        setIsCartOpen,
        authenticated,
        isLoading,
        router,
        expandedSidebar,
    };
};