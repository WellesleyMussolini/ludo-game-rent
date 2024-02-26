"use client"

import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";
import { BoardGameForm } from "@/app/components/boardgame-form/boardgame-form.component";
import { Header } from "@/app/layout/header/header.layout";
import { EnumHeader } from "@/app/layout/header/header.interface";
import { Sidebar } from "@/app/layout/sidebar/sidebar.layout";

export default function Admin() {
    const { status } = useSession();
    const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
    const [formVisibility, setFormVisibility] = React.useState<boolean>(false);
    console.log(status);

    // if (status !== "authenticated") return redirect("/admin/login"); SWITCH PAGE INSTANTLY BUT NEVER ACESS THE "/ADMIN" ROUTE
    // if (status === "unauthenticated") return redirect("/admin/login");
    // adicionar um token de logado para verificar no navegador do usuario se ele está conectado.
    return <>
        {/* <Header type={EnumHeader.ADMIN} handleOpenSidebar={setOpenSidebar} openSidebar={openSidebar} /> */}
        <Sidebar openSidebar={openSidebar} handleOpenSidebar={setOpenSidebar} />
        <main className={`flex items-center justify-center duration-300`} style={{ minHeight: "calc(100vh - 80px)" }}>
            <BoardGameForm visibility={formVisibility} handleVisibility={setFormVisibility} />
            <div>
                <PrimaryButton text="abrir formulário" handleClick={() => setFormVisibility(!formVisibility)} type={EnumPrimaryButton.PRIMARY} />
            </div>
        </main>
    </>
};