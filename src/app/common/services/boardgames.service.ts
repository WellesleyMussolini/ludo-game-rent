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
  async getByName(name: string): Promise<BoardGame[] | null> {
    const findBoardgame = await ludoApi.boardgames.findByName(name);

    if (
      !findBoardgame ||
      (Array.isArray(findBoardgame) && findBoardgame.length === 0)
    ) {
      return null;
    }

    const boardGameData = Array.isArray(findBoardgame)
      ? findBoardgame
      : [findBoardgame];

    return boardGameData.map(boardGameMapper.toDomain);
  }
}

export const boardGamesService = new BoardGames();

export const findAllBoardGames = await boardGamesService.get();
