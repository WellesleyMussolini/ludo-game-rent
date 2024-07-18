"use server"

import React from "react";
import BoardGameCatalogue from "@/app/components/boardgame-catalogue/boardgame-catalogue.component";
import { CreateBoardgameStepsForm } from "./components/create-boardgame-steps-form/create-boardgame-steps-form";
import { checkAdminSession } from "@/utils/check-admin-session";

export default async function Admin() {
    await checkAdminSession();
    return <div className="flex flex-col items-center justify-center min-h-screen py-10">
        <CreateBoardgameStepsForm />
        <BoardGameCatalogue />
    </div>
};