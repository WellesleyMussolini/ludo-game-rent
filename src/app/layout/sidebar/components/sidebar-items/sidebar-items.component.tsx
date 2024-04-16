"use client"

import { SidebarToolTip } from "./components/sidebar-tooltip/sidebar-tooltip.component";
import { SidebarText } from "./components/sidebar-text/sidebar-text.component";
import { ISidebarItem } from "./sidebar-items.interface";
import { SidebarAlert } from "./components/sidebar-alert/sidebar-alert.component";
import { SidebarItemActive } from "./components/sidebar-item-active/sidebar-item-active.component";

export const SidebarItem = ({ icon, text, active, alert, onClick }: ISidebarItem) => (
    <SidebarItemActive active={active} onClick={onClick}>
        {icon}
        <SidebarText text={text} />
        <SidebarAlert alert={alert} />
        <SidebarToolTip text={text} />
    </SidebarItemActive>
);