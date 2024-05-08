import { IBoardGame } from "@/interfaces/boardgame.interface";
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
      console.log("response", response);
      return response;
    } catch (error) {
      throw new Error(`Error getting board games`);
    }
  }
}

export default new BoardGames();
