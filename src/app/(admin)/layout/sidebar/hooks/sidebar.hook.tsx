"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { sizeIcons } from "@/app/common/constants/size-icons";
import * as Fa from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { Pathnames } from "@/app/common/types/pathnames.enum";

export type SidebarItem = {
  icon: React.JSX.Element;
  label: string;
  alert: boolean;
  active: boolean;
  route:
    | Pathnames.HOME
    | Pathnames.AUTH
    | Pathnames.USER
    | Pathnames.CART
    | Pathnames.ADMIN
    | Pathnames.ADMIN_AUTH
    | Pathnames.ADMIN_USERS
    | Pathnames.ADMIN_RENTALS
    | Pathnames.GET_STARTED;
};

export const useSidebar = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebarVisibility = () => setIsExpanded((prev) => !prev);

  const handleSwitchRoute = async (route: string) => {
    router.push(route);
    setIsExpanded(false);
  };

  const sidebarContent: SidebarItem[] = [
    {
      icon: <Fa.FaDice size={sizeIcons.smaller} />,
      label: "Catálogo",
      alert: false,
      active: pathname === Pathnames.ADMIN,
      route: Pathnames.ADMIN,
    },
    {
      icon: <IoMdCart size={sizeIcons.smaller} />,
      label: "Aluguéis",
      alert: false,
      active: pathname === Pathnames.ADMIN_RENTALS,
      route: Pathnames.ADMIN_RENTALS,
    },
    {
      icon: <FaUser size={sizeIcons.smaller} />,
      label: "Usuários",
      alert: false,
      active: pathname === Pathnames.ADMIN_USERS,
      route: Pathnames.ADMIN_USERS,
    },
  ];

  return {
    pathname,
    isExpanded,
    setIsExpanded,
    handleSwitchRoute,
    toggleSidebarVisibility,
    sidebarContent,
  };
};
