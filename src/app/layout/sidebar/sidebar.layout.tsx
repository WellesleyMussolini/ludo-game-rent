"use client"

import React from "react"
import { ToggleSidebar } from "./components/toggle-sidebar/toggle-sidebar.component";
import { SidebarList } from "./components/sidebar-list/sidebar-list.component";
import { EnumSidebarType } from "./interfaces/sidebar.enum";
import { useSidebar } from "./hooks/use-sidebar.hook";
import { OverlayBackground } from "@/app/components/overlay-background/overlay-background.component";
import { useContext } from "@/context/context";
import { usePathname } from "next/navigation";
import { isAdminPath } from "@/utils/is-admin-path";

export default function Sidebar() {
    const { isMobile, animation, toggleSidebarVisibility } = useSidebar();
    const {expandedSidebar, setExpandedSidebar} = useContext();
    const pathname = usePathname()
    return <div className={`${isAdminPath(pathname) && "hidden"}`}>
        {
            expandedSidebar &&
            <OverlayBackground onClick={() => setExpandedSidebar(false)} />
        }
        <nav className={`
            z-40 
            fixed 
            top-0 
            left-0
            h-screen
            bg-white
            shadow-md
            max-sm:overflow-y-auto
            ${isMobile && animation}
            ${isMobile ? EnumSidebarType.MOBILE : EnumSidebarType.DESKTOP}`}>
            <ToggleSidebar sidebarVisibility={expandedSidebar} handleSidebarVisibility={toggleSidebarVisibility} />
            <SidebarList />
        </nav>
    </div>
};