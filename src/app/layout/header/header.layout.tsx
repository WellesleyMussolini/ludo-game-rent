"use client";
import Image from "next/image";
import Logo from "../../../../public/images/logo.png";
import React from "react";
import Link from "next/link";
import { ToggleSidebarMobileButton } from "./components/toggle-sidebar-mobile-button/toggle-sidebar-mobile-button.component";
import { useSidebar } from "../sidebar/hooks/use-sidebar.hook";
import { useContext } from "@/context/context";

export const Header = () => {
  const { toggleSidebarVisibility } = useSidebar();
  const { expandedSidebar } = useContext();
  const headerClasses = `max-md:fixed top-0 flex items-center justify-between sm:justify-center w-full transition-all
    ${
      expandedSidebar ? "max-[400px]:ml-[310px]" : ""
    } z-20 h-20 bg-white shadow-md`;

  return (
    <div className={headerClasses}>
      <ToggleSidebarMobileButton
        handleSidebarVisibility={toggleSidebarVisibility}
      />

      <div className="flex-grow"></div>

      <Link href={"/"} className="flex items-center h-full w-28">
        <Image
          src={Logo}
          alt="logo"
          className="cursor-pointer object-cover select-none"
          priority={true}
          objectFit="cover"
        />
      </Link>
      <div className="flex-grow"></div>
    </div>
  );
};
