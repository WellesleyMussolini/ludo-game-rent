"use server";

import { Card } from "../card/card.component";
import { IBoardGame } from "@/types/boardgame.interface";
import { ErrorMessage } from "../error-message/error-message.component";
import { findAllBoardGames } from "@/services/find-all-boardgames.service";

export default async function BoardGameCatalogue() {
  try {
    return <div className={`flex items-center justify-center flex-wrap gap-10 pt-28 min-h-screen px-10`}>
      {
        findAllBoardGames.map((boardgame: IBoardGame, index: number) => (
          <Card key={index} boardgame={boardgame} />
        ))
      }
    </div>
  } catch {
    return <div className="flex items-center justify-center pt-28 min-h-screen">
      <ErrorMessage
        title="404"
        message="Oops! Por algum motivo não foi possível encontrar o catálogo de jogos..."
      />
    </div>
  }
};