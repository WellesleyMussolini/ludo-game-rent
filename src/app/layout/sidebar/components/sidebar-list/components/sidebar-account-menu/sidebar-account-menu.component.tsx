"use client"

import React from "react";
import { UserProfilePicture } from "@/app/components/user-profile-picture/user-profile-picture.component";
import { useContext } from "@/context/context";
import { useUserSession } from "@/app/hooks/use-user-session.hook";
import { Logout } from "./components/logout/logout.component";

export const SidebarAccountMenu = () => {
    const {expandedSidebar} = useContext();
    const {session, isAuthenticated, isLoading} = useUserSession();
    return (
        <div className={`
            w-full 
            flex 
            justify-center
            ${expandedSidebar && "max-[400px]:justify-start max-[400px]:px-3"}
            items-center 
            h-20
            z-10
        `}>
            <div className={"flex justify-center items-center"}><UserProfilePicture /></div>
            <div className={`
                flex 
                flex-row
                items-center
                justify-between
                transition-all
                overflow-hidden
                ${expandedSidebar ? "max-[400px]:w-full w-48 ml-3" : "w-0"}
            `}>
                <div className="leading-4">
                    <h4 className="font-semibold text-gray-500 max-[280px]:text-xs">{session?.user?.name}</h4>
                    <span className="text-xs text-gray-500">{session?.user?.email}</span>
                </div>
                {isAuthenticated && !isLoading && <Logout />}
            </div>
        </div>
    );
};