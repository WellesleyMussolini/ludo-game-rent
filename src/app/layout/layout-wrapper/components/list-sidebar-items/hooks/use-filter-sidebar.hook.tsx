import { sizeIcons } from "@/constants/size-icons";
import * as Fa from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";

export const useFilterSidebar = () => {
    const sidebarData = [
        {
            icon: <Fa.FaHome size={sizeIcons.small} />,
            label: "Home",
            alert: false,
            active: true,
        },
        {
            icon: <FaUser size={sizeIcons.small} />,
            label: "Perfil",
            alert: false,
            active: false,
        },
        {
            icon: <Fa.FaInfoCircle size={sizeIcons.small} />,
            label: "Sobre",
            alert: false,
            active: false,
        },
        {
            icon: <MdDashboard size={sizeIcons.small} />,
            label: "Dashboard",
            alert: false,
            active: false,
        },
    ];

    return {
        sidebarData
    };
};