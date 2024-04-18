"use client"

import { MoreVertical } from "lucide-react";
import { useSidebar } from "../../../../hooks/use-sidebar.hook";
import { sizeIcons } from "@/constants/size-icons";
import { signOut } from "next-auth/react";
import { UserProfilePicture } from "@/app/components/user-profile-picture/user-profile-picture.component";
import { LoadingSpinner } from "@/app/components/loading-spinner/loading-spinner.component";

export const SidebarAccountMenu = () => {
    const { expandedSidebar, session, authenticated, isLoading } = useSidebar();
    return (
        <div className="border-t w-full flex justify-center items-center h-20">
            <div className="flex justify-center items-center">
            <UserProfilePicture />
            {isLoading && <div className={`transition-all overflow-hidden ${expandedSidebar ? "w-52 ml-5" : "w-0"}`}><LoadingSpinner size={25} /></div>}
            </div>
            <div className={`flex justify-between items-center overflow-hidden transition-all ${expandedSidebar ? "w-52 ml-3" : "w-0"}`}>
                <div className="leading-4">
                    <h4 className="font-semibold text-gray-500 ">{session?.user?.name}</h4>
                    <span className="text-xs text-gray-500">{session?.user?.email}</span>
                </div>
                {authenticated && !isLoading && <MoreVertical size={sizeIcons.small} onClick={() => signOut()} />}
            </div>
        </div>
    );
};