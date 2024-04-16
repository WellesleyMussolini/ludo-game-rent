"use client"

import { useContext } from "@/context/context"
import { ChevronFirst, ChevronLast } from "lucide-react";
import Image from "next/image"
import Logo from "../../../../../images/logo.png";

export const ToggleSidebar = () => {
    const { expandedSidebar, setExpandedSidebar } = useContext();
    return (
        <div className={`bg-white flex items-center py-4 ${expandedSidebar ? "px-2 justify-between" : "justify-center"}`}>
            <Image
                src={Logo}
                width={0}
                height={0}
                className={`overflow-hidden transition-all ${expandedSidebar ? "ml-[18px] w-24" : "w-0"}`}
                alt="LudoCafé"
                draggable={false}
            />
            <div draggable={false} onClick={() => setExpandedSidebar(!expandedSidebar)}
                className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 cursor-pointer" >
                {expandedSidebar ? <ChevronFirst /> : <ChevronLast />}
            </div>
        </div>
    );
};