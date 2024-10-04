import { prisma } from "@/app/common/utils/lib/database/prisma";
import boardGameMapper from "./mapper/board-game.mapper";
import { BoardGame } from "@/app/common/types/boardgame.types";
import { ludoApi } from "./api/ludo.api";

class BoardGames {
  async get(): Promise<BoardGame[]> {
    const findAllBoardGames = await prisma.boardgames.findMany({
      orderBy: { id: "desc" },
    });
    // const findAllBoardGames = await ludoApi.boardgames.findAll();

    return findAllBoardGames.map((boardGame: BoardGame) =>
      boardGameMapper.toDomain(boardGame)
    );
  }
  async getById(id: string): Promise<BoardGame | null> {
    // const findBoardgame = await prisma.boardgames.findUnique({
    //   where: { id: id },
    // });

    const findBoardgame = await ludoApi.boardgames.findById(id);

    if (!findBoardgame) return null; // Return null if no board game is found

    return boardGameMapper.toDomain(findBoardgame);
  }
  async getByName(name: string): Promise<BoardGame | null> {
    const findBoardgame = await ludoApi.boardgames.findByName(name);

    if (!findBoardgame || !findBoardgame[0]) return null; // Adjust if the API returns an array

    return boardGameMapper.toDomain(findBoardgame[0]); // Assuming the first result is the match
  }
}

export const boardGamesService = new BoardGames();

export const findAllBoardGames = await boardGamesService.get();
