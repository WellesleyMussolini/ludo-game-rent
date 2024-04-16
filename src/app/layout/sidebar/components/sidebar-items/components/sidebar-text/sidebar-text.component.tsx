import { useContext } from "@/context/context";

export const SidebarText = ({ text }: { text: string }) => {
    const { expandedSidebar } = useContext();
    return <span className={`overflow-hidden transition-all ${expandedSidebar ? "w-52 ml-3" : "w-0"}`}>{text}</span>;
};