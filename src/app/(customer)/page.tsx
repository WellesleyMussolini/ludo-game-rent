"use server";

import { BoardGameCatalogue } from "../common/components/boardgame-catalogue/boardgame-catalogue.component";
import { boardGamesService } from "../common/services/boardgames.service";
import { BoardGameAbout } from "../common/components/boardgame-about/boardgame-about.component";
import { BoardGame } from "../common/types/boardgame.types";

export default async function Home({
  searchParams,
}: {
  searchParams: { boardgame?: string | undefined };
}) {
  const boardgameId: string | undefined = searchParams.boardgame ?? undefined;

  const foundBoardGame: BoardGame | null = boardgameId
    ? await boardGamesService.getById(boardgameId)
    : null;

  if (boardgameId)
    // Passar para client e useQuery
    return <BoardGameAbout boardgame={foundBoardGame as BoardGame} />;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <BoardGameCatalogue />
    </div>
  );
}
