import { Dropdown } from "@/app/components/dropdown/dropdown.component";
import { signOut } from "next-auth/react";

export const Logout = ({ isOpen }: { isOpen: boolean }) => (
    <div className="absolute top-[65px] flex items-center w-[80px]">
        <Dropdown
            isOpen={isOpen}
            content={<p className="text-gray-500 
                w-full 
                text-center 
                font-medium 
                rounded 
                hover:bg-primary 
                px-2 
                py-1 
                hover:text-white"
                onClick={() => signOut()}>SAIR</p>} />
    </div>
);