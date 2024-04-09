"use client"
import Image from "next/image";
import Logo from "./assets/logo/logo.png";
import { Twirl as Hamburger } from 'hamburger-react'
import React from "react";
import Link from "next/link";
import { HeaderMenu } from "./component/header-menu/header-menu.component";
import { CartIcon } from "./component/cart-icon/cart-icon.component";
import { UserProfilePicture } from "./component/user-profile-picture/user-profile-picture.component";
import { useHeader } from "./hooks/use-header.hook";

export const Header = ({ handleCartVisibility }: { handleCartVisibility: (cartVisibility: boolean) => void }) => {
    const { authenticated, isMenuOpen, setIsMenuOpen, isLoading } = useHeader();
    return <div className={`flex flex-col items-center justify-center px-6 bg-white w-full shadow-lg`}>
        <div className="flex items-center justify-between w-full h-20">
            {/* LOGO */}
            <Link className="flex items-center h-full w-32 max-[320px]:w-28" href={"/"}>
                <Image src={Logo} alt="logo"
                    className="cursor-pointer object-cover select-none"
                    onDragStart={(event) => event.preventDefault()}
                    priority={true}
                    objectFit="cover"
                />
            </Link>


            <div className="flex justify-center items-center flex-row gap-5">
                {/* MENU HAMBURGER FOR MOBILE VERSION */}
                {!authenticated && <div className={`${isLoading && "hidden"} sm:hidden flex text-gray-500`} onClick={() => setIsMenuOpen(!isMenuOpen)}><Hamburger size={26} /></div>}

                {/* LOGIN && ADDITIONAL INFORMATIONS FOR DESKTOP */}
                <div className={`${isLoading && "hidden"} ${!authenticated && !isLoading && "sm:flex"} hidden`}>
                    <HeaderMenu authentication={authenticated} isMenuHamburgerOpen={isMenuOpen} />
                </div>

                {/* cart icon */}
                {authenticated && !isLoading && <CartIcon onClick={() => handleCartVisibility(true)} />}

                {/* USER PROFILE PICTURE */}
                <div className={`${!authenticated && !isLoading && "hidden"} flex items-center justify-center`}>
                    <UserProfilePicture isOpen={isMenuOpen} handleIsOpen={setIsMenuOpen} />
                </div>
            </div>
        </div>

        {/* LOGIN && ADDITIONAL INFORMATIONS FOR MOBILE */}
        <div className={`${authenticated && "hidden"} inline sm:hidden w-full overflow-hidden`}><HeaderMenu authentication={authenticated} isMenuHamburgerOpen={isMenuOpen} /></div>
    </div >;
};