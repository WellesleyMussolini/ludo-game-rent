"use client"

import { FaCircleUser } from "react-icons/fa6";
import { useUserProfilePicture } from "./hooks/use-user-profile-picture.hooks";
import Image from "next/image";

export const UserProfilePicture = ({size}: {size?: string}) => {
    const { authenticated, isLoading, session } = useUserProfilePicture();
    return (
        <>
            {isLoading || !authenticated ? (
                <FaCircleUser className="text-gray-400 animate-pulse" size={size || 40} />
            ) : (
                <div className="flex flex-col justify-center items-center cursor-pointer">
                    <Image src={session?.user?.image ?? ""} alt={session?.user?.name ?? ""} className="w-10 rounded-full" height={0} width={0} />
                </div>
            )}
        </>
    );
};