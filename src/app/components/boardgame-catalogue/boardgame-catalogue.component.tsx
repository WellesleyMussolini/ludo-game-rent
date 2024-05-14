"use server";

import { prisma } from "@/utils/lib/database/prisma";
import { Card } from "../card/card.component";
import { IBoardGame } from "@/interfaces/boardgame.interface";
import { ErrorMessage } from "../error-message/error-message.component";

export default async function BoardGameCatalogue() {
  try {
    const findAllBoardGames = await prisma.boardgames.findMany({
      orderBy: { id: "desc" },
    });
    return (
      <div className="flex flex-col md:grid md:grid-cols-6 gap-10 pt-28 pb-12 lg:py-12">
        {findAllBoardGames.map((boardgame: IBoardGame, index: number) => (
          <Card key={index} boardgame={boardgame} />
        ))}
      </div>
    );
  } catch {
    return (
      <div className="flex items-center justify-center h-full">
        <ErrorMessage
          title="404"
          message="Oops! Por algum motivo não foi possível encontrar o catálogo de jogos..."
        />
      </div>
    );
  }
}
