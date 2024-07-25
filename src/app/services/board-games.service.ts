import { IBoardGame } from "@/types/boardgame.interface";
import { prisma } from "@/utils/lib/database/prisma";
import boardGameMapper from "./mapper/board-game.mapper";

class BoardGames {
  async get(): Promise<IBoardGame[]> {
    try {
      const findAllBoardGames = await prisma.boardgames.findMany({
        orderBy: { id: "desc" },
      });
      const response = findAllBoardGames.map((boardGame) =>
        boardGameMapper.toDomain(boardGame)
      );
      return response;
    } catch (error) {
      throw new Error(`Error getting board games`);
    }
  }
}

export default new BoardGames();
