"use client"

import React from "react"
import { ToggleSidebar } from "./components/toggle-sidebar/toggle-sidebar.component";
import { SidebarList } from "./components/sidebar-list/sidebar-list.component";

export default function Sidebar() {
    return (
        <nav className="z-30 absolute h-screen flex flex-col bg-white border-r shadow-md">
            <ToggleSidebar />
            <SidebarList />
        </nav>
    )
};