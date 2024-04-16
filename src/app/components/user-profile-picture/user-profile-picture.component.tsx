"use client"

import { FaCircleUser } from "react-icons/fa6";
import { ImageComponent } from "@/app/components/image/image.component";
import { useUserProfilePicture } from "./hooks/use-user-profile-picture.hooks";

export const UserProfilePicture = () => {
    const { authenticated, isLoading, session } = useUserProfilePicture();
    return (
        <>
            {isLoading || !authenticated ? (
                <FaCircleUser className="text-gray-400 animate-pulse h-[45px] w-[45px]" />
            ) : (
                <div className="flex flex-col justify-center items-center cursor-pointer">
                    <ImageComponent image={session?.user?.image ?? ""} alt={session?.user?.name ?? ""} className="rounded-full" width="45px" />
                </div>
            )}
        </>
    );
};