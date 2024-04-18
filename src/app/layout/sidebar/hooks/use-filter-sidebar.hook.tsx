import { sizeIcons } from "@/constants/size-icons";
import { usePathname } from "next/navigation";
import * as Fa from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdDashboard, MdLogin } from "react-icons/md";

export const useFilterSidebar = () => {
    const pathName = usePathname();
    const sidebarData = [
        {
            icon: <Fa.FaHome size={sizeIcons.small} />,
            label: "Home",
            alert: false,
            active: pathName === "/",
            route: "/",
        },
        {
            icon: <FaUser size={sizeIcons.small} />,
            label: "Perfil",
            alert: false,
            active: pathName === "/user",
            route: "/user",
        },
        {
            icon: <Fa.FaInfoCircle size={sizeIcons.small} />,
            label: "Sobre",
            alert: false,
            active: pathName === "/about",
            route: "/about",
        },
        {
            icon: <MdDashboard size={sizeIcons.small} />,
            label: "Dashboard",
            alert: false,
            active: pathName === "/admin",
            route: "/admin",
        },
        {
            icon: <MdLogin size={sizeIcons.small} />,
            label: "Entrar",
            alert: false,
            active: pathName === "/login",
            route: "/login"
        },
    ];

    return {
        sidebarData
    };
};