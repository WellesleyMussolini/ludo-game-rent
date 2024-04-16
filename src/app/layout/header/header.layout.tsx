"use client"
import Image from "next/image";
import Logo from "../../../images/logo.png";
import { Twirl as Hamburger } from 'hamburger-react'
import React from "react";
import Link from "next/link";
import { useHeader } from "./hooks/use-header.hook";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";
import { UserProfilePicture } from "@/app/components/user-profile-picture/user-profile-picture.component";
import { CartIcon } from "./components/cart-icon/cart-icon.component";

interface IHeader {
    cartVisibility: boolean,
    handleCartVisibility: (cartVisibility: boolean) => void,
}

export const Header = () => {
    const { authenticated, isCartOpen, setIsCartOpen, isLoading, router, expandedSidebar } = useHeader();

    return <div className={`
        fixed 
        top-0 
        flex 
        flex-row 
        items-center 
        justify-center 
        w-full
        duration-200
${expandedSidebar ? "ml-[310px]" : "ml-[90px]"} 

        z-20

        h-20

        bg-white 
        shadow-md 
    `}>
        <Link className="flex items-center h-full w-28 max-[320px]:w-24" href={"/"}>
            <Image src={Logo} alt="logo"
                className="cursor-pointer object-cover select-none"
                onDragStart={(event: React.DragEvent<HTMLImageElement>) => event.preventDefault()}
                priority={true}
                objectFit="cover"
            />
        </Link>

        <div>
            <CartIcon iconSize="1.4em" onClick={() => setIsCartOpen(true)} />
        </div>
    </div >;
};