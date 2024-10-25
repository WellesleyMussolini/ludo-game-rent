"use client";

import { FaCircleUser } from "react-icons/fa6";
import { useUserProfilePicture } from "../hooks/use-user-profile-picture.hooks";
import Image from "next/image";

export const UserPicture = ({
  userImage,
  userName,
  size = "80",
}: {
  userImage: string | undefined;
  userName: string | undefined;
  size?: string;
}) => {
  const { authenticated, isLoading } = useUserProfilePicture();

  return (
    <>
      {isLoading || !authenticated ? (
        <FaCircleUser className="text-gray-400 animate-pulse" size={size} />
      ) : (
        <div className="flex flex-col justify-center items-center cursor-pointer">
          <Image
            src={userImage ?? ""}
            alt={userName ?? ""}
            className="rounded-full"
            height={80}
            width={80}
          />
        </div>
      )}
    </>
  );
};
