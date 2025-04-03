"use client";

import React from "react";
import { SidebarItem, useSidebar } from "./hooks/sidebar.hook";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import Image from "next/image";
import { LuChevronFirst, LuChevronLast } from "react-icons/lu";
import Logo from "../../../../../public/images/logo.png";
import { OverlayBackground } from "@/app/common/components/overlay-background/overlay-background.component";
import { sizeIcons } from "@/app/common/constants/size-icons";

export default function Sidebar() {
  const {
    pathname,
    sidebarContent,
    isExpanded,
    setIsExpanded,
    handleSwitchRoute,
    toggleSidebarVisibility,
  } = useSidebar();

  const renderSidebarItem = (
    sidebarItem: SidebarItem,
    index: number
  ): JSX.Element => {
    return (
      <li
        key={index}
        onClick={() => handleSwitchRoute(sidebarItem.route)}
        className={`
            relative
            flex 
            items-center
            transition-colors 
            cursor-pointer 
            py-2 
            px-3 
            my-1 
            font-medium 
            rounded-md
            group
            md:justify-start
            max-md:justify-center
            max-md:flex-col
            gap-1
            ${
              sidebarItem.active
                ? "bg-gradient-to-tr from-green-200 to-green-100 text-green-800"
                : "hover:bg-green-50 text-gray-600"
            }
            ${
              !isExpanded && "group-hover:bg-green-50 group-hover:text-gray-600"
            }
          `}
      >
        {sidebarItem.icon}

        <span
          className={`
                md:flex
                hidden 
                ${isExpanded ? "max-sm:w-36 w-52 ml-3" : "w-0"}
                overflow-hidden 
                transition-all
                md:text-base
                md:text-center
            `}
        >
          {sidebarItem.label}
        </span>

        {/* Mobile: always show label below icon */}
        <span
          className={`
              flex 
              text-xs
              transition-all
              sm:text-sm
              md:hidden 
            `}
        >
          {sidebarItem.label}
        </span>

        {sidebarItem.alert && (
          <div
            className={`
              absolute 
              md:right-2 
              w-2 
              h-2 
              rounded 
              bg-green-400 
              max-md:top-3
              ${!isExpanded && "top-2"}
              `}
          />
        )}

        {/* desktop tooltip */}
        {!isExpanded && (
          <div
            className={`
                hidden 
                md:flex 
                absolute left-full rounded-md 
                px-2 py-1 ml-6
                bg-green-100 text-green-800 text-sm
                invisible opacity-0 -translate-x-3 transition-all
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
              `}
          >
            {sidebarItem.label}
          </div>
        )}
      </li>
    );
  };

  return (
    <div className={`${pathname === Pathnames.ADMIN_AUTH && "hidden"}`}>
      {isExpanded && <OverlayBackground onClose={() => setIsExpanded(false)} />}
      <nav
        className={`
            bg-white
            shadow-md
            z-40 
            fixed 
            
            md:top-0 
            md:left-0
            md:h-screen
            
            max-md:bottom-0
            max-md:w-full
            max-md:h-24
`}
      >
        <div
          className={`max-md:hidden bg-white flex items-center py-4 ${
            isExpanded ? "px-2 justify-between" : "justify-center"
          }`}
        >
          <Image
            src={Logo}
            width={0}
            height={0}
            className={`overflow-hidden transition-all ${
              isExpanded ? "ml-[18px] w-24" : "w-0"
            }`}
            alt="LudoCafé"
            draggable={false}
          />
          <div
            draggable={false}
            onClick={toggleSidebarVisibility}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer"
          >
            {isExpanded ? (
              <LuChevronFirst size={sizeIcons.small} />
            ) : (
              <LuChevronLast size={sizeIcons.small} />
            )}
          </div>
        </div>
        {/* SIDEBAR CONTENT */}
        <ul
          className="
flex md:flex-col h-full px-3 py-2
 max-xs:justify-between max-md:justify-evenly items-center max-md:flex-row 
      "
        >
          {sidebarContent.map((sidebarItem, index) =>
            renderSidebarItem(sidebarItem, index)
          )}
        </ul>
      </nav>
    </div>
  );
}
