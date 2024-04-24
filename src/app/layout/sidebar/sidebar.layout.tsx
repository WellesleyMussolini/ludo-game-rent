"use client"

import React from "react"
import { ToggleSidebar } from "./components/toggle-sidebar/toggle-sidebar.component";
import { SidebarList } from "./components/sidebar-list/sidebar-list.component";
import { EnumSidebarType } from "./interfaces/sidebar.enum";
import { useSidebar } from "./hooks/use-sidebar.hook";

export default function Sidebar() {
    const { expandedSidebar, isMobile, animation, toggleSidebarVisibility } = useSidebar();
    return <nav className={`
            z-30 
            fixed 
            top-0 
            left-0
            h-screen
            bg-white
            border-r
            shadow-md
            overflow-y-auto
            ${isMobile && animation}
            ${isMobile ? EnumSidebarType.MOBILE : EnumSidebarType.DESKTOP}`}>
        <ToggleSidebar sidebarVisibility={expandedSidebar} handleSidebarVisibility={toggleSidebarVisibility} />
        <SidebarList />
    </nav>
};