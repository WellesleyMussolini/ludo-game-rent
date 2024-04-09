"use client";
import Image from "next/image";
import { Logout } from "./components/logout/logout.component";
import { useSession } from "next-auth/react";
import { FaCircleUser } from "react-icons/fa6";
import { ImageComponent } from "@/app/components/image/image.component";

export const UserProfilePicture = ({ isOpen, handleIsOpen }: { isOpen: boolean, handleIsOpen: (isOpen: boolean) => void }) => {
    const { data: session, status } = useSession();
    const isLoading = status === "loading";
    const authenticated = status === "authenticated";
    return <>
        {
            (isLoading || !authenticated) ?
                <FaCircleUser className="text-gray-400 animate-pulse h-[45px] w-[45px] max-[320px]:w-10 max-[320px]:h-10" />
                :
                <div className="flex flex-col justify-center items-center cursor-pointer" onClick={() => handleIsOpen(!isOpen)}>
                    <ImageComponent image={session?.user?.image} alt={session?.user?.name} className="rounded-full w-[45px] max-[320px]:w-10" />
                    <Logout isOpen={isOpen} />
                </div>
        }
    </>
};