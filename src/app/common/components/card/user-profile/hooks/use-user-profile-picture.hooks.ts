import { useSession } from "next-auth/react";

export const useUserProfilePicture = () => {
  const { status } = useSession();
  const isLoading = status === "loading";
  const authenticated = status === "authenticated";
  return { isLoading, authenticated };
};
