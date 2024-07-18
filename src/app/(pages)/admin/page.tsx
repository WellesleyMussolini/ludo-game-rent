"use server"

import React from "react";
import BoardGameCatalogue from "@/app/components/boardgame-catalogue/boardgame-catalogue.component";
import { CreateBoardgameStepsForm } from "./components/create-boardgame-steps-form/create-boardgame-steps-form";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/auth-options";
import { getServerSession } from "next-auth";

enum EnumCheckSessionRole {
    ADMIN = "ADMIN",
    USER = "USER",
};

export default async function Admin() {
    const session = await getServerSession(authOptions);
    if (session === null) {
        return redirect("/admin/login")
    }
    else if (session?.user?.role !== EnumCheckSessionRole.ADMIN) {
        return redirect("/");
    }

    return <div className="flex flex-col items-center justify-center min-h-screen py-10">
        <CreateBoardgameStepsForm />
        <BoardGameCatalogue />
    </div>
};