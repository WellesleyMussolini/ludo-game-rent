"use client"

import { FaCircleUser } from "react-icons/fa6";
import { ImageComponent } from "@/app/components/image/image.component";
import { useUserProfilePicture } from "./hooks/use-user-profile-picture.hooks";

export const UserProfilePicture = ({size}: {size?: string}) => {
    const { authenticated, isLoading, session } = useUserProfilePicture();
    return (
        <>
            {isLoading || !authenticated ? (
                <FaCircleUser className="text-gray-400 animate-pulse" size={size || 40} />
            ) : (
                <div className="flex flex-col justify-center items-center cursor-pointer">
                    <ImageComponent image={session?.user?.image ?? ""} alt={session?.user?.name ?? ""} className="rounded-full" width={`${size || 40}px`} />
                </div>
            )}
        </>
    );
};