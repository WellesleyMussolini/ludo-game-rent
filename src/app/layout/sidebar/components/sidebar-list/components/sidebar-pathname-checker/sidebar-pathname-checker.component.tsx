"use client"

import React from "react";
import { useFilterSidebar } from "@/app/layout/sidebar/hooks/use-filter-sidebar.hook";
import { EnumSidebarPathname } from "@/app/layout/sidebar/interfaces/sidebar.enum";
import { usePathname } from "next/navigation";
import { SidebarItem } from "../sidebar-item/sidebar-item.component";
import { useContext } from "@/context/context";

export const SidebarPathnameChecker = () => {
    const { sidebarDefaultData, sidebarAdminData } = useFilterSidebar();
    const pathname = usePathname();
    const { expandedSidebar } = useContext();

    const privateRoutes = [
        EnumSidebarPathname.ADMIN,
        EnumSidebarPathname.ADMIN_AUTH,
        EnumSidebarPathname.ADMIN_ORDERS,
        EnumSidebarPathname.ADMIN_USERS,
    ];

    const isPrivateRoute = privateRoutes.includes(pathname as string as EnumSidebarPathname);
    return <ul className="flex-1 px-3 py-2">
        {
            isPrivateRoute
                ?
                sidebarAdminData.map((sidebarItem, index) => (
                    <React.Fragment key={index}>
                        <SidebarItem item={sidebarItem} expanded={expandedSidebar} />
                    </React.Fragment>
                ))
                :
                sidebarDefaultData.slice(0, -1).map((sidebarItem, index) => (
                    <React.Fragment key={index}>
                        <SidebarItem item={sidebarItem} expanded={expandedSidebar} />
                        {index === 2 && <hr className="my-3" />}
                    </React.Fragment>
                ))
        }
    </ul>
};