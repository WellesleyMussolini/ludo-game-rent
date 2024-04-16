"use server"

import React from "react";
import BoardGameCatalogue from "@/app/components/boardgame-catalogue/boardgame-catalogue.component";
import { CreateBoardgameStepsForm } from "./components/create-boardgame-steps-form/create-boardgame-steps-form";
import { getServerSession } from "next-auth";
import { prisma } from "@/utils/lib/database/prisma";
import { authOptions } from "@/utils/auth-options";

export default async function Admin() {
    const session = await getServerSession(authOptions);
    const findAllUsers = await prisma.user.findMany({ orderBy: { id: "desc" } });
    
    // if(!session || !session.user) return redirect("/");
    return (
        
        <div className="flex flex-col items-center justify-center gap-10 h-calc(100vh-80px)">
            <CreateBoardgameStepsForm />
            <BoardGameCatalogue />
        </div>
    );
};