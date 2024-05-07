"use client"

import { useUserSession } from "@/app/hooks/use-user-session.hook";
import { SidebarItem } from "../sidebar-item/sidebar-item.component";
import { useContext } from "@/context/context";
import { useFilterSidebar } from "@/app/layout/sidebar/hooks/use-filter-sidebar.hook";
import { SidebarAccountMenu } from "../sidebar-account-menu/sidebar-account-menu.component";

export const SidebarUserSection = () => {
    const { isAuthenticated, isLoading } = useUserSession();
    const { expandedSidebar } = useContext();
    const { sidebarDefaultData } = useFilterSidebar();
    const sidebarFooterItem = sidebarDefaultData[sidebarDefaultData.length - 1]; // Get the last item as the footer
    return <div className="w-full">
        {!isAuthenticated && !isLoading ? (
            <div className={`flex items-center ${expandedSidebar ? "justify-start pl-3" : "justify-center"} border-t`}>
                <SidebarItem item={sidebarFooterItem} expanded={expandedSidebar} />
            </div>
        ) : (<div className="border-t flex-1"><SidebarAccountMenu /></div>
        )}
    </div>
};