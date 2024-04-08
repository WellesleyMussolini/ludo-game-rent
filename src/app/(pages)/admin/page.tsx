"use server"

import React from "react";
import BoardGameCatalogue from "@/app/components/boardgame-catalogue/boardgame-catalogue.component";
import { CreateBoardgameStepsForm } from "./components/create-boardgame-steps-form/create-boardgame-steps-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";


export default async function Admin() {
    // const session = await getServerSession(authOptions);
    // console.log(session)
    // if(!session || !session.user) return redirect("/");
    return (
        <div className="flex flex-col items-center justify-center gap-10 h-calc(100vh-80px)">
            <CreateBoardgameStepsForm />
            <BoardGameCatalogue />
        </div>
    );
};