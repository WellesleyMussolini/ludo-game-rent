"use client";

import { FaCircleUser } from "react-icons/fa6";
import { useUserProfilePicture } from "./hooks/use-user-profile-picture.hooks";
import Image from "next/image";

export const UserProfilePicture = ({ size = "80" }: { size?: string }) => {
  const { authenticated, isLoading, session } = useUserProfilePicture();
  return (
    <>
      {isLoading || !authenticated ? (
        <FaCircleUser className="text-gray-400 animate-pulse" size={size} />
      ) : (
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <Image
            src={session?.user?.image ?? ""}
            alt={session?.user?.name ?? ""}
            className="rounded-full"
            height={80}
            width={80}
          />
        </div>
      )}
    </>
  );
};
