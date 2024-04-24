"use client"
import Image from "next/image";
import Logo from "../../../images/logo.png";
import { Twirl as Hamburger } from 'hamburger-react'
import React from "react";
import Link from "next/link";
import { useHeader } from "./hooks/use-header.hook";
import { ToggleSidebarMobileButton } from "./components/toggle-sidebar-mobile-button/toggle-sidebar-mobile-button.component";
import { useSidebar } from "../sidebar/hooks/use-sidebar.hook";
import { useContext } from "@/context/context";

export const Header = () => {
    const { toggleSidebarVisibility } = useSidebar();
    const { expandedSidebar } = useContext();
    return <div className={`
        fixed 
        top-0 
        flex 
        flex-row 
        items-center 
        justify-between
        sm:justify-center 
        w-full
        transition-all
        ${expandedSidebar ? "max-[400px]:hidden ml-[310px] sm:ml-[19em]" : "sm:ml-20"}
        z-20
        h-20
        bg-white 
        shadow-md 
        px-8
    `}>
        <ToggleSidebarMobileButton handleSidebarVisibility={toggleSidebarVisibility} />

        <Link className="flex items-center h-full w-28 max-[320px]:w-24" href={"/"}>
            <Image src={Logo} alt="logo"
                className="cursor-pointer object-cover select-none"
                onDragStart={(event: React.DragEvent<HTMLImageElement>) => event.preventDefault()}
                priority={true}
                objectFit="cover"
            />
        </Link>
    </div >;
};