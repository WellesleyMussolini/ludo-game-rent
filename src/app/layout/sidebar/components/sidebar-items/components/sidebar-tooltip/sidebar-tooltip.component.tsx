"use client"

import { useContext } from "@/context/context";

export const SidebarToolTip = ({ text }: { text: string }) => {
    const { expandedSidebar } = useContext();
    return (
        !expandedSidebar && (
            <div className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-indigo-800 text-sm
                invisible opacity-20 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>{text}</div>
        )
    );
};