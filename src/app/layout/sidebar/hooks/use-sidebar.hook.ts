import { useContext } from "@/context/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const useSidebar = () => {
    const { expandedSidebar } = useContext();
    const {data: session, status} = useSession();
    const router = useRouter();
    const authenticated = status === "authenticated";
    const isLoading = status === "loading";
    return{
        expandedSidebar,
        session,
        authenticated,
        router,
        isLoading,
    };
};