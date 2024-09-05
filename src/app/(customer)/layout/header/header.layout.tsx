"use client";

import React from "react";
import Image from "next/image";
import Logo from "../../../../../public/images/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserSession } from "@/app/hooks/session.hook";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { Pathnames } from "@/app/common/types/pathnames";
import { EnumPrimaryButton } from "@/app/components/primary-button/types/primary-button.types";
import { UserMenu } from "./components/user-menu.component";
import { LoadingSpinner } from "@/app/components/loading/loading-spinner/loading-spinner.component";

export const Header = () => {
    const redirect = useRouter();
    const { isAuthenticated, isLoading } = useUserSession();
    return (
        <div className="fixed top-0 flex items-center justify-between w-full px-8 h-20 bg-white z-20">
            <Link href={"/"} className="flex items-center h-full cursor-pointer w-24 xs:w-28">
                <Image
                    src={Logo}
                    alt="logo"
                    className="outline-none border-none cursor-pointer object-cover select-none"
                    priority={true}
                    objectFit="cover"
                />
            </Link>
            {isLoading ? (
                <LoadingSpinner size={48} />
            ) : (
                isAuthenticated ? (
                    <UserMenu />
                ) : (
                    <PrimaryButton
                        styles={"max-xs:text-sm max-xs:w-24 xs:text-base xs:w-32"}
                        onClick={() => redirect.push(Pathnames.AUTH)}
                        text="entrar"
                        type={EnumPrimaryButton.PRIMARY}
                    />
                )
            )}
        </div>
    );
};