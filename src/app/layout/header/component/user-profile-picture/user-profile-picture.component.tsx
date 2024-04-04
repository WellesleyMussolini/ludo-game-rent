"use client";
import Image from "next/image";
import { useUserProfilePicture } from "./hooks/use-user-profile-picture.hooks";
import { Logout } from "./components/logout/logout.component";
import { useSession } from "next-auth/react";
import { FaCircleUser } from "react-icons/fa6";

export const UserProfilePicture = ({ isOpen, handleIsOpen }: { isOpen: boolean, handleIsOpen: (isOpen: boolean) => void }) => {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";
    const authenticated = status === "authenticated";
    return <>
        {
            (isLoading || !authenticated) ?
                <FaCircleUser className="text-gray-400 animate-pulse" size={45} />
                :
                <div className="flex flex-col justify-center items-center cursor-pointer">
                    <Image
                        onClick={() => handleIsOpen(!isOpen)}
                        className="rounded-full"
                        src={session?.user?.image || ""}
                        width={45}
                        height={45}
                        alt={session?.user?.name || ""}
                    />
                    <Logout isOpen={isOpen} />
                </div>
        }
    </>
};