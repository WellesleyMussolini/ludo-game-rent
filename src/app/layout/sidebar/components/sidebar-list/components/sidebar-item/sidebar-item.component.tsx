"use client"

import { useSidebar } from "@/app/layout/sidebar/hooks/use-sidebar.hook";
import { ISidebarItem } from "./interfaces/sidebar-item.interface";

export const SidebarItem = ({ item, expanded }: ISidebarItem) => {
 const {router} = useSidebar();
    return <li onClick={()=> router.push(item.route)} 
    className={`
        relative
        flex
        items-center
        py-2
        px-3
        my-1
        font-medium
        rounded-md
        cursor-pointer
        transition-colors
        group
        ${item.active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800" : "hover:bg-indigo-50 text-gray-600"}
        ${!expanded && "group-hover:bg-indigo-50 group-hover:text-gray-600"}
      `}>
    {item.icon}
    <span className={`overflow-hidden transition-all ${expanded ? "max-sm:w-36 w-52 ml-3" : "w-0"}`}>{item.label}</span>
    {item.alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"}`} />}
    {!expanded &&
        <div className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}>{item.label}</div>
    }
</li>;
};