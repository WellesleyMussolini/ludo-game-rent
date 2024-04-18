"use client"

import React from "react"
import { ToggleSidebar } from "./components/toggle-sidebar/toggle-sidebar.component";
import { SidebarList } from "./components/sidebar-list/sidebar-list.component";
import { EnumSidebarType } from "./interfaces/sidebar.enum";
import { ToggleSidebarMobileButton } from "./components/toggle-sidebar-mobile-button/toggle-sidebar-mobile-button.component";
import { useSidebar } from "./hooks/use-sidebar.hook";

export default function Sidebar() {
    const { expandedSidebar, isMobile, animation, toggleSidebarVisibility, setAccountOptions } = useSidebar();
    return <div onClick={() => setAccountOptions(false)}>
        <ToggleSidebarMobileButton handleSidebarVisibility={toggleSidebarVisibility} />
        <nav className={`
            z-30 absolute top-0 left-0 
            h-screen 
            bg-white 
            border-r 
            shadow-md
            ${isMobile && animation}
            ${isMobile ? EnumSidebarType.MOBILE : EnumSidebarType.DESKTOP}`}>
            <ToggleSidebar sidebarVisibility={expandedSidebar} handleSidebarVisibility={toggleSidebarVisibility} />
            <SidebarList />
        </nav>
    </div>
};