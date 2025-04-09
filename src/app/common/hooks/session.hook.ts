import { useSession } from "next-auth/react";

export const useUserSession = () => {
  const { data: session, status } = useSession();
  const isUserSessionLoading = status === "loading";
  const isAuthenticated = status === "authenticated";

  return { session, isUserSessionLoading, isAuthenticated };
};
