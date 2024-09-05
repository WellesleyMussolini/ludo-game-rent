"use client"

import React from "react"
import { EnumSidebarResponsive } from "./types/sidebar.enum";
import { useSidebar } from "./hooks/sidebar.hook";
import { OverlayBackground } from "@/app/components/overlay-background/overlay-background.component";
import { useContext } from "@/context/context";
import { usePathname } from "next/navigation";
import { Pathnames } from "@/app/common/types/pathnames";
import Image from "next/image";
import { ChevronFirst, ChevronLast } from "lucide-react";
import Logo from "../../../../../public/images/logo.png";
import { SidebarContent } from "./components/sidebar-content.component";

export default function Sidebar() {
    const { isMobile, animation, toggleSidebarVisibility } = useSidebar();
    const { expandedSidebar, setExpandedSidebar } = useContext();
    const pathname = usePathname();
    return <div className={`${pathname === Pathnames.ADMIN_AUTH && "hidden"}`}>
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
            ${isMobile ? EnumSidebarResponsive.MOBILE : EnumSidebarResponsive.DESKTOP}`}>
            <div className={`bg-white flex items-center py-4 ${expandedSidebar ? "px-2 justify-between" : "justify-center"}`}>
                <Image
                    src={Logo}
                    width={0}
                    height={0}
                    className={`overflow-hidden transition-all ${expandedSidebar ? "ml-[18px] w-24" : "w-0"}`}
                    alt="LudoCafé"
                    draggable={false}
                />
                <div draggable={false} onClick={toggleSidebarVisibility}
                    className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer" >
                    {expandedSidebar ? <ChevronFirst /> : <ChevronLast />}
                </div>
            </div>
            <SidebarContent />
        </nav>
    </div>
};