"use client";

import { sizeIcons } from "@/app/common/constants/size-icons";
import { usePathname } from "next/navigation";
import * as Fa from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { Pathnames } from "@/app/common/types/pathnames.enum";

export const useSidebarNavigation = () => {
  const pathName = usePathname();

  const sidebarContent = [
    {
      icon: <Fa.FaDice size={sizeIcons.small} />,
      label: "Catálogo",
      alert: false,
      active: pathName === Pathnames.ADMIN,
      route: Pathnames.ADMIN,
    },
    {
      icon: <IoMdCart size={sizeIcons.small} />,
      label: "Aluguéis",
      alert: false,
      active: pathName === Pathnames.ADMIN_RENTALS,
      route: Pathnames.ADMIN_RENTALS,
    },
    {
      icon: <FaUser size={sizeIcons.small} />,
      label: "Usuários",
      alert: false,
      active: pathName === Pathnames.ADMIN_USERS,
      route: Pathnames.ADMIN_USERS,
    },
  ];

  return { sidebarContent };
};
