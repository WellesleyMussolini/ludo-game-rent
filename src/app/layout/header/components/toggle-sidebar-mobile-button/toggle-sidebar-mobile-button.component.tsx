import { sizeIcons } from "@/constants/size-icons"
import { useContext } from "@/context/context";
import { HiOutlineMenuAlt2 } from "react-icons/hi"

export const ToggleSidebarMobileButton = ({ handleSidebarVisibility }: { handleSidebarVisibility: () => void }) => {
    const {expandedSidebar} = useContext();
    return (
        <div onClick={handleSidebarVisibility}
            className={`
            inline-flex 
            items-center 
            text-gray-500 
            rounded-lg 
            sm:hidden 
            ${expandedSidebar && "hidden"}
            hover:bg-gray-100
             focus:outline-none 
             focus:ring-2 
             focus:ring-gray-200 
             dark:text-gray-400 
             dark:hover:bg-gray-700 
             dark:focus:ring-gray-600
        `}>
            <HiOutlineMenuAlt2 size={sizeIcons["medium"]} />
        </div>
    );
};