import { prisma } from "@/app/common/utils/lib/database/prisma";
import boardGameMapper from "./mapper/board-game.mapper";
import { BoardGame } from "@/app/common/types/boardgame.types";

class BoardGames {
  async get(): Promise<BoardGame[]> {
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
  async getById(id: string): Promise<BoardGame | null> {
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
