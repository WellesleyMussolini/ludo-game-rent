"use client";

import React from "react";
import { useContext } from "@/app/common/context/context";
import { usePathname, useRouter } from "next/navigation";
import { sizeIcons } from "@/app/common/constants/size-icons";
import * as Fa from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { Pathnames } from "@/app/common/types/pathnames.enum";

export const useSidebar = () => {
  const { isVisible, setIsVisible } = useContext();
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebarVisibility = () =>
    setIsVisible({ ...isVisible, sidebar: !isVisible.sidebar });

  const handleSwitchRoute = async (route: string) => {
    router.push(route);
    setIsVisible({ ...isVisible, sidebar: false });
  };

  const sidebarContent = [
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
    router,
    pathname,
    isVisible,
    setIsVisible,
    handleSwitchRoute,
    toggleSidebarVisibility,
    sidebarContent,
  };
};
