"use client"

import { sizeIcons } from "@/constants/size-icons";
import { usePathname } from "next/navigation";
import * as Fa from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { IoMdCart } from "react-icons/io";
import { EnumSidebarPathnames } from "../types/sidebar.enum";

export const useSidebarNavigation = () => {
    const pathName = usePathname();

    const sidebarContent = [
        {
            icon: <Fa.FaDice size={sizeIcons.small} />,
            label: "Catálogo",
            alert: false,
            active: pathName === EnumSidebarPathnames.ADMIN,
            route: EnumSidebarPathnames.ADMIN,
        },
        {
            icon: <IoMdCart size={sizeIcons.small} />,
            label: "Pedidos",
            alert: false,
            active: pathName === EnumSidebarPathnames.ADMIN_ORDERS,
            route: EnumSidebarPathnames.ADMIN_ORDERS,
        },
        {
            icon: <FaUser size={sizeIcons.small} />,
            label: "Usuários",
            alert: false,
            active: pathName === EnumSidebarPathnames.ADMIN_USERS,
            route: EnumSidebarPathnames.ADMIN_USERS,
        },
    ];

    return { sidebarContent };
};