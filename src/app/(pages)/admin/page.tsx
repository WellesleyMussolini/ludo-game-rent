"use server"

import React from "react";
import BoardGameCatalogue from "@/app/components/boardgame-catalogue/boardgame-catalogue.component";
import { BoardgameFormVisibilityController } from "./components/boardgame-form-visibility-controller/boardgame-form-visibility-controller.component";


export default async function Admin() {
    return (
        <div className="flex flex-col items-center justify-center gap-10 h-calc(100vh-80px)">
            <BoardgameFormVisibilityController />
            <BoardGameCatalogue />
        </div>
    );
};