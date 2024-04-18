import { sizeIcons } from "@/constants/size-icons"
import { HiOutlineMenuAlt2 } from "react-icons/hi"

export const ToggleSidebarMobileButton = ({ handleSidebarVisibility }: { handleSidebarVisibility: () => void }) => (
    <div onClick={handleSidebarVisibility}
        className="
        inline-flex 
        items-center 
        p-2 
        mt-2 
        ms-3 
        text-sm 
        text-gray-500 
        rounded-lg 
        sm:hidden 
        hover:bg-gray-100
         focus:outline-none 
         focus:ring-2 
         focus:ring-gray-200 
         dark:text-gray-400 
         dark:hover:bg-gray-700 
         dark:focus:ring-gray-600">
        <HiOutlineMenuAlt2 size={sizeIcons.medium} />
    </div>
);