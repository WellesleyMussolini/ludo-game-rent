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
    const { authenticated, isLoading } = useSidebar();
    const sidebarFooterItem = sidebarData[sidebarData.length - 1]; // Get the last item as the footer
    return (
        <ul className="flex flex-col px-3 relative h-full py-2">
            {sidebarData.slice(0, -1).map((sidebarItem, index) => (
                <div key={index}>
                    <SidebarItem item={sidebarItem} expanded={expandedSidebar} />
                    {index === 2 && <hr className="my-3" />}
                </div>
            ))}
            <div className="h-full mt-3 flex justify-start items-end">
                {
                    !authenticated && !isLoading
                        ?
                        <div className="border-t flex-1">
                            <SidebarItem item={sidebarFooterItem} expanded={expandedSidebar} />
                        </div>
                        :
                        <div className="border-t flex-1">
                            <SidebarAccountMenu />
                        </div>
                }
            </div>
        </ul >
    );
};