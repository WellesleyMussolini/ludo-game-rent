"use client"

import React from "react";
import { useContext } from "@/context/context";
import { useFilterSidebar } from "../../hooks/use-filter-sidebar.hook";
import { SidebarItem } from "./components/sidebar-item/sidebar-item.component";
import { useSidebar } from "../../hooks/use-sidebar.hook";
import { SidebarAccountMenu } from "../sidebar-account-menu/sidebar-account-menu.component";

export const SidebarList = () => {
    const { expandedSidebar } = useContext();
    const { sidebarData } = useFilterSidebar();
    const { session, authenticated, isLoading } = useSidebar();
    const sidebarFooterItem = sidebarData[sidebarData.length - 1]; // Get the last item as the footer
    return (
        <ul className="flex-1 px-3 relative">
            {sidebarData.slice(0, -1).map((sidebarItem, index) => (
                <div key={index}>
                    <SidebarItem item={sidebarItem} expanded={expandedSidebar} />
                    {index === 2 && <hr className="my-3" />}
                </div>
            ))}
            <div className="absolute bottom-1 flex justify-center items-center">
                {
                    !authenticated && !isLoading
                        ?
                        <div className="border-t h-20 flex justify-center items-center">
                            <SidebarItem item={sidebarFooterItem} expanded={expandedSidebar} />
                        </div>
                        :
                        <SidebarAccountMenu />
                }
            </div>
        </ul >
    );
};