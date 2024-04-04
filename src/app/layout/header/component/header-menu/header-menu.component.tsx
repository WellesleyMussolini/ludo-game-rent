import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";
import { useRouter } from "next/navigation";
import { IHeaderMenu } from "./header-menu.interface";

export const HeaderMenu = ({ authentication, isMenuHamburgerOpen }: IHeaderMenu) => {
    const router = useRouter();
    return <ul className={`
    flex sm:items-center sm:justify-center gap-3 sm:flex-row
    
    flex-col
    items-start
    duration-500 ease-in-out
    ${isMenuHamburgerOpen ? "h-28" : "h-0"} 
    `}>
        <li><p className="text-gray-500 duration-300 hover:text-gray-600 text-base font-bold cursor-pointer">Como funciona</p></li>
        <li><PrimaryButton type={EnumPrimaryButton.SECONDARY} text="entrar" handleClick={() => router.push("/login")} /></li>
    </ul>
};