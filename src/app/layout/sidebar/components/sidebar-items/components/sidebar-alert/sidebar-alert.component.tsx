import { useContext } from "@/context/context";

export const SidebarAlert = ({alert}: {alert: boolean}) => {
    const {expandedSidebar} = useContext();
    return alert && <div className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expandedSidebar ? "" : "top-2"}`} />
};