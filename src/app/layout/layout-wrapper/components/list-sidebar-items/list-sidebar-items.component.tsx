"use client"

import { SidebarItem } from "@/app/layout/sidebar/components/sidebar-items/sidebar-items.component";
import { useFilterSidebar } from "./hooks/use-filter-sidebar.hook";

export const ListSidebarItems = () => {
    const { sidebarData } = useFilterSidebar();
    return (
        <div>
            {
                sidebarData.map((sidebarItem, index) => (
                    <div key={index}>
                        <SidebarItem onClick={() => { }} icon={sidebarItem.icon}
                            text={sidebarItem.label}
                            alert={sidebarItem.alert} active={sidebarItem.active} />
                        {
                            index === 2 && <hr className="my-3" />
                        }
                    </div>
                ))
            }
            
        </div>
    )
};