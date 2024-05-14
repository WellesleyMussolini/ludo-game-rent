"use client"

import React from "react";
import { useSidebar } from "../../hooks/use-sidebar.hook";
import { UserProfilePicture } from "@/app/components/user-profile-picture/user-profile-picture.component";
import { Logout } from "@/app/layout/sidebar/components/sidebar-account-menu/components/logout.component";

export const SidebarAccountMenu = () => {
    const { expandedSidebar, session, authenticated, isLoading } = useSidebar();
    return (
        <div className={`
            w-full 
            flex 
            justify-center
            ${expandedSidebar && "max-[400px]:justify-start max-[400px]:p-3"}
            items-center 
            h-20
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
                {authenticated && !isLoading && <Logout />}
            </div>
        </div>
    );
};
