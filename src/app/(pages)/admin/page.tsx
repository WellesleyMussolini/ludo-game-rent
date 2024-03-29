"use server"

import React from "react";
import BoardGameCatalogue from "@/app/components/boardgame-catalogue/boardgame-catalogue.component";
import { CreateBoardgameStepsForm } from "./components/create-boardgame-steps-form/create-boardgame-steps-form";


export default async function Admin() {
    return (
        <div className="flex flex-col items-center justify-center gap-10 h-calc(100vh-80px)">
            <CreateBoardgameStepsForm />
            <BoardGameCatalogue />
        </div>
    );
};