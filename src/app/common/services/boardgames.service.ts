import boardGameMapper from "./mapper/board-game.mapper";
import { BoardGame } from "@/app/common/types/boardgame.types";
import { ludoApi } from "./api/ludo.api";
import { ResponseBoardGame } from "./types/board-games.types";

class BoardGames {
  async get(): Promise<BoardGame[]> {
    const findAllBoardGames: ResponseBoardGame[] =
      await ludoApi.boardgames.findAll();

    return findAllBoardGames.map((boardGame: ResponseBoardGame) =>
      boardGameMapper.toDomain(boardGame)
    );
  }
  async getById(id: string): Promise<BoardGame | null> {
    const findBoardgame = await ludoApi.boardgames.findById(id);

    if (!findBoardgame) return null;

    return boardGameMapper.toDomain(findBoardgame);
  }
  // async getByName(name: string): Promise<BoardGame | null> {
  //   const findBoardgame = await ludoApi.boardgames.findByName(name);

  //   if (!findBoardgame) return null;

  //   return boardGameMapper.toDomain(findBoardgame);
  // }
  async getByName(name: string): Promise<BoardGame[] | null> {
    const findBoardgame = await ludoApi.boardgames.findByName(name);

    // Check if findBoardgame is an array or an object
    if (
      !findBoardgame ||
      (Array.isArray(findBoardgame) && findBoardgame.length === 0)
    ) {
      return null; // Return null if no games are found
    }

    // If it's an array, return the whole array instead of just the first item
    const boardGameData = Array.isArray(findBoardgame)
      ? findBoardgame
      : [findBoardgame]; // Wrap in an array if it's a single object

    // Map over the boardGameData to convert each item to the domain model
    return boardGameData.map(boardGameMapper.toDomain);
  }
}

export const boardGamesService = new BoardGames();

export const findAllBoardGames = await boardGamesService.get();
