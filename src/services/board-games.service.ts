import { IBoardGame } from "@/types/boardgame.interface";
import { prisma } from "@/utils/lib/database/prisma";
import boardGameMapper from "./mapper/board-game.mapper";

class BoardGames {
  async get(): Promise<IBoardGame[]> {
    try {
      const findAllBoardGames = await prisma.boardgames.findMany({
        orderBy: { id: "desc" },
      });
      return findAllBoardGames.map((boardGame) => boardGameMapper.toDomain(boardGame));
    } catch {
      throw new Error(`Error retrieving board games`);
    }
  }
};

export default new BoardGames();