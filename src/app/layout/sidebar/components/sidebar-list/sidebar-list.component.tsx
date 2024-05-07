"use client"

import { SidebarPathnameChecker } from "./components/sidebar-pathname-checker/sidebar-pathname-checker.component";
import { SidebarUserSection } from "./components/sidebar-user-section/sidebar-user-section.component";

export const SidebarList = () => <div className="flex flex-col h-full">
    <SidebarPathnameChecker />
    <SidebarUserSection />
</div>