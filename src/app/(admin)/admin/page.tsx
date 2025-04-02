import React from "react";
import { CreateBoardgame } from "./components/create-boardgame.components";
import { BoardGameCatalogue } from "@/app/common/components/boardgame-catalogue/boardgame-catalogue.component";
import { boardGamesService } from "@/app/common/services/boardgames.service";
import { BoardGame } from "@/app/common/types/boardgame.types";
import { BoardGameAbout } from "@/app/common/components/boardgame-about/boardgame-about.component";

export default async function Admin({
  searchParams,
}: {
  searchParams: { boardgame?: string | undefined };
}) {
  const boardgameId: string | undefined = searchParams.boardgame ?? undefined;

  const foundBoardGame: BoardGame | null = boardgameId
    ? await boardGamesService.getById(boardgameId)
    : null;

  if (boardgameId)
    return <BoardGameAbout boardgame={foundBoardGame as BoardGame} />;

  return (
    <div className="flex flex-col items-center justify-center">
      <CreateBoardgame />
      <BoardGameCatalogue />
    </div>
  );
}
