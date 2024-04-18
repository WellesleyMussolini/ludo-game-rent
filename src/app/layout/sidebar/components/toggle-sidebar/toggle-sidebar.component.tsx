"use client"

import { ChevronFirst, ChevronLast } from "lucide-react";
import Image from "next/image"
import Logo from "../../../../../images/logo.png";
import { IToggleSidebar } from "./interfaces/toggle-sidebar.interface";

export const ToggleSidebar = ({ sidebarVisibility, handleSidebarVisibility }: IToggleSidebar) => (
    <div className={`bg-white flex items-center py-4 ${sidebarVisibility ? "px-2 justify-between" : "justify-center"}`}>
        <Image
            src={Logo}
            width={0}
            height={0}
            className={`overflow-hidden transition-all ${sidebarVisibility ? "ml-[18px] w-24" : "w-0"}`}
            alt="LudoCafé"
            draggable={false}
        />
        <div draggable={false} onClick={handleSidebarVisibility}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer" >
            {sidebarVisibility ? <ChevronFirst /> : <ChevronLast />}
        </div>
    </div>
);