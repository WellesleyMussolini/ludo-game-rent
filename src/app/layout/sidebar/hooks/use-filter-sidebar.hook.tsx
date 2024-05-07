"use client"

import { sizeIcons } from "@/constants/size-icons";
import { usePathname } from "next/navigation";
import * as Fa from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdLogin } from "react-icons/md";
import { useContext } from "@/context/context";
import { IoMdCart } from "react-icons/io";
import { EnumSidebarPathname } from "../interfaces/sidebar.enum";

export const useFilterSidebar = () => {
    const { cart } = useContext();
    const pathName = usePathname();
    
    const sidebarDefaultData = [
        {
            icon: <Fa.FaHome size={sizeIcons.small} />,
            label: "Home",
            alert: false,
            active: pathName === EnumSidebarPathname.HOME,
            route: EnumSidebarPathname.HOME,
        },
        {
            icon: <FaUser size={sizeIcons.small} />,
            label: "Perfil",
            alert: false,
            active: pathName === EnumSidebarPathname.USER,
            route: EnumSidebarPathname.USER,
        },
        {
            icon: <Fa.FaInfoCircle size={sizeIcons.small} />,
            label: "Sobre",
            alert: false,
            active: pathName === EnumSidebarPathname.ABOUT,
            route: EnumSidebarPathname.ABOUT,
        },
        {
            icon: <IoMdCart size={sizeIcons.small} />,
            label: "Carrinho",
            alert: cart.length !== 0,
            active: pathName === EnumSidebarPathname.CART,
            route: EnumSidebarPathname.CART,
        },
        {
            icon: <MdLogin size={sizeIcons.small} />,
            label: "Entrar",
            alert: false,
            active: pathName === EnumSidebarPathname.AUTH,
            route: EnumSidebarPathname.AUTH
        },
    ];

    const sidebarAdminData = [
        {
            icon: <Fa.FaDice size={sizeIcons.small} />,
            label: "Catálogo",
            alert: false,
            active: pathName === EnumSidebarPathname.ADMIN,
            route: EnumSidebarPathname.ADMIN,
        },
        {
            icon: <IoMdCart size={sizeIcons.small} />,
            label: "Pedidos",
            alert: false,
            active: pathName === EnumSidebarPathname.ADMIN_ORDERS,
            route: EnumSidebarPathname.ADMIN_ORDERS,
        },
        {
            icon: <FaUser size={sizeIcons.small} />,
            label: "Usuários",
            alert: false,
            active: pathName === EnumSidebarPathname.ADMIN_USERS,
            route: EnumSidebarPathname.ADMIN_USERS,
        },
    ];

    return { sidebarDefaultData, sidebarAdminData };
};