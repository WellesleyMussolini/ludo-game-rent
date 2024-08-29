import { IBoardGame } from "@/types/boardgame.interface";
import { prisma } from "@/utils/lib/database/prisma";
import boardGameMapper from "./mapper/board-game.mapper";

class BoardGames {
  async get(): Promise<IBoardGame[]> {
    try {
      const findAllBoardGames = await prisma.boardgames.findMany({
        orderBy: { id: "desc" },
      });
      return findAllBoardGames.map((boardGame) =>
        boardGameMapper.toDomain(boardGame)
      );
    } catch {
      throw new Error(`Error retrieving boardgames`);
    }
  }
  async getById(id: string): Promise<IBoardGame | null> {
    try {
      const findBoardgame = await prisma.boardgames.findUnique({
        where: { id: id },
      });

      if (!findBoardgame) return null; // Return null if no board game is found

      return boardGameMapper.toDomain(findBoardgame);
    } catch {
      throw new Error("Error retrieving boardgame by id");
    }
  }
}

export default new BoardGames();