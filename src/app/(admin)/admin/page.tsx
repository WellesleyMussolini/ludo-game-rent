import React from "react";
import { CreateBoardgame } from "./components/create-boardgame/create-boardgame.components";
import { BoardGameCatalogue } from "@/app/common/components/boardgame-catalogue/boardgame-catalogue.component";

export default async function Admin() {
  return (
    <div className="flex flex-col items-center justify-center">
      <CreateBoardgame />
      <BoardGameCatalogue />
    </div>
  );
}
