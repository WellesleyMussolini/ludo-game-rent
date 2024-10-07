import { BoardGameCatalogue } from "../common/components/boardgame-catalogue/boardgame-catalogue.component";
import { findAllBoardGames } from "../common/services/boardgames.service";

export default async function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <BoardGameCatalogue boardgames={findAllBoardGames} />
    </div>
  );
}
