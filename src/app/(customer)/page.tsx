"use server";

import { BoardGame } from "../common/components/boardgame/boardgame.component";
import { BoardGameCatalogue } from "../common/components/boardgame-catalogue/boardgame-catalogue.component";

export default async function Home({
  searchParams,
}: {
  searchParams: { boardgame: string | null };
}) {
  const isBoardGameSelected = searchParams.boardgame?.trim();
  return (
    <div className="flex items-center justify-center min-h-screen">
      {isBoardGameSelected ? <BoardGame /> : <BoardGameCatalogue />}
    </div>
  );
}
