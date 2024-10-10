"use client";

import React from "react";
import { useSidebar } from "../hooks/sidebar.hook";
import { useContext } from "@/app/common/context/context";
import { useSidebarNavigation } from "../hooks/sidebar-navigation.hook";

export const SidebarContent = () => {
  const { handleSwitchRoute } = useSidebar();
  const { sidebarContent } = useSidebarNavigation();
  const { isVisible } = useContext();
  return (
    <ul className="flex flex-col h-full px-3 py-2">
      {sidebarContent.map((sidebarItem, index) => (
        <li
          key={index}
          onClick={() => handleSwitchRoute(sidebarItem.route)}
          className={`
                            relative
                            flex
                            items-center
                            justify-start
                            py-2
                            px-3
                            my-1
                            font-medium
                            rounded-md
                            cursor-pointer
                            transition-colors
                            group
                            ${
                              sidebarItem.active
                                ? "bg-gradient-to-tr from-green-200 to-green-100 text-green-800"
                                : "hover:bg-green-50 text-gray-600"
                            }
                            ${
                              !isVisible.sidebar &&
                              "group-hover:bg-green-50 group-hover:text-gray-600"
                            }
                        `}
        >
          {sidebarItem.icon}

          <span
            className={`
                                ${
                                  isVisible.sidebar
                                    ? "max-sm:w-36 w-52 ml-3"
                                    : "w-0"
                                }
                                sm:text-base 
                                text-sm 
                                overflow-hidden 
                                transition-all 
                                `}
          >
            {sidebarItem.label}
          </span>

          {sidebarItem.alert && (
            <div
              className={`
                            absolute 
                            right-2 
                            w-2 
                            h-2 
                            rounded 
                            bg-green-400 
                            ${!isVisible.sidebar && "top-2"}
                            `}
            />
          )}
          {!isVisible.sidebar && (
            <div
              className={`
                            absolute left-full rounded-md px-2 py-1 ml-6
                            bg-green-100 text-green-800 text-sm
                            invisible opacity-20 -translate-x-3 transition-all
                            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                        `}
            >
              {sidebarItem.label}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
