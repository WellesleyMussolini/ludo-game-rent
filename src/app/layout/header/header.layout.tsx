"use client"
import Image from "next/image";
import Logo from "./assets/logo/logo.png";
import { Twirl as Hamburger } from 'hamburger-react'
import React from "react";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Dropdown } from "@/app/components/dropdown/dropdown.component";
import { UserProfile } from "./component/loading/user-profile.component";
import { EnumHeader, IHeader } from "./header.interface";

export const Header = ({ openSidebar, type, handleOpenSidebar }: IHeader) => {
    const { status } = useSession();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const router = useRouter();
    return (
        <div className={`flex flex-col items-center justify-center px-6 bg-white w-full shadow-lg`}>
            <div className="flex items-center justify-between w-full h-20">
                {
                    type === EnumHeader.DEFAULT ?
                        <Link className="flex items-center h-full" href={"/"}>
                            <Image src={Logo} alt="logo"
                                className="w-32 cursor-pointer object-cover select-none"
                                onDragStart={(event) => event.preventDefault()}
                                priority={true}
                                objectFit="cover"
                            />
                        </Link>
                        :
                        <div onClick={() => handleOpenSidebar && handleOpenSidebar(!openSidebar)} className={`flex text-gray-500`}><Hamburger size={26} toggled={openSidebar} /></div>
                }

                <div className={`${status === "authenticated" && "hidden"} sm:hidden flex text-gray-500`} onClick={() => setIsOpen(!isOpen)}><Hamburger size={26} /></div>

                {
                    status === "unauthenticated" && (
                        <ul className="hidden sm:flex sm:items-center sm:justify-center sm:gap-3">
                            <li><p className="text-gray-500 duration-300 hover:text-gray-600 text-base font-bold cursor-pointer">Como funciona</p></li>
                            <li><PrimaryButton type={EnumPrimaryButton.SECONDARY} text="entrar" handleClick={() => router.push("/login")} /></li>
                            <li><PrimaryButton type={EnumPrimaryButton.PRIMARY} text="criar conta" handleClick={() => router.push("/register")} /></li>
                        </ul>
                    )
                }
                {<UserProfile isOpen={isOpen} handleIsOpen={setIsOpen} />}
            </div>
            <ul className={`${status === "authenticated" && "hidden"} sm:hidden flex gap-4 flex-col items-start overflow-hidden duration-500 ease-in-out ${isOpen ? "h-44" : "h-0"} w-full`}>
                <li><p className="text-gray-500 hover:text-gray-600 text-base font-bold cursor-pointer">Como funciona</p></li>
                <li><PrimaryButton type={EnumPrimaryButton.SECONDARY} text="entrar" handleClick={() => router.push("/login")} /></li>
                <li><PrimaryButton type={EnumPrimaryButton.PRIMARY} text="criar conta" handleClick={() => router.push("/register")} /></li>
            </ul>
        </div>



        // <div className={`flex flex-col items-center justify-center px-6 bg-white w-full shadow-lg`}>
        //     <div className="flex items-center justify-between w-full h-20">
        //         <Link className="flex items-center h-full" href={"/"}>
        //             <Image src={Logo} alt="logo"
        //                 className="w-32 cursor-pointer object-cover select-none"
        //                 onDragStart={(event) => event.preventDefault()}
        //                 priority={true}
        //                 objectFit="cover"
        //             />
        //         </Link>
        //         <div className={`${status === "authenticated" && "hidden"} sm:hidden flex text-gray-500`} onClick={() => setIsOpen(!isOpen)}><Hamburger size={26} /></div>

        //         {
        //             status === "unauthenticated" && (
        //                 <ul className="hidden sm:flex sm:items-center sm:justify-center sm:gap-3">
        //                     <li><p className="text-gray-500 duration-300 hover:text-gray-600 text-base font-bold cursor-pointer">Como funciona</p></li>
        //                     <li><PrimaryButton type={EnumPrimaryButton.SECONDARY} text="entrar" handleClick={() => router.push("/login")} /></li>
        //                     <li><PrimaryButton type={EnumPrimaryButton.PRIMARY} text="criar conta" handleClick={() => router.push("/register")} /></li>
        //                 </ul>
        //             )
        //         }
        //         {<UserProfile isOpen={isOpen} handleIsOpen={setIsOpen} />}
        //     </div>
        //     <ul className={`${status === "authenticated" && "hidden"} sm:hidden flex gap-4 flex-col items-start overflow-hidden duration-500 ease-in-out ${isOpen ? "h-44" : "h-0"} w-full`}>
        //         <li><p className="text-gray-500 hover:text-gray-600 text-base font-bold cursor-pointer">Como funciona</p></li>
        //         <li><PrimaryButton type={EnumPrimaryButton.SECONDARY} text="entrar" handleClick={() => router.push("/login")} /></li>
        //         <li><PrimaryButton type={EnumPrimaryButton.PRIMARY} text="criar conta" handleClick={() => router.push("/register")} /></li>
        //     </ul>
        // </div>
    );
};