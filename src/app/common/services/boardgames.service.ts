import { httpRequest } from "@/app/common/utils/http-request";
import boardGameMapper, { ResponseBoardGame } from "./mapper/boardgame.mapper";
import { BoardGame } from "@/app/common/types/boardgame.types";

class BoardGames {
  async get(): Promise<BoardGame[]> {
    const response = await httpRequest("boardgames", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    const findAllBoardGames: ResponseBoardGame[] = await response.json();

    return findAllBoardGames.map((boardGame: ResponseBoardGame) =>
      boardGameMapper.toDomain(boardGame)
    );
  }

  async getById(id: string): Promise<BoardGame | null> {
    const response = await httpRequest(`boardgames/get-by-id/${id}`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    const findBoardgame: ResponseBoardGame = await response.json();

    if (!findBoardgame) return null;

    return boardGameMapper.toDomain(findBoardgame);
  }

  async getByName(name: string): Promise<BoardGame[] | null> {
    const response = await httpRequest(
      `boardgames/search-by-name?name=${name}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    const findBoardGame: ResponseBoardGame[] = await response.json();

    if (!findBoardGame) {
      throw new Error(`BoardGame '${name}' not found`);
    }

    const boardgameFound = Array.isArray(findBoardGame) ? findBoardGame : [];

    return boardgameFound.map(boardGameMapper.toDomain);
  }

  async delete(id: string): Promise<BoardGame> {
    const response = await httpRequest(`boardgames/${id}`, {
      method: "DELETE",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    const result = await response.text();
    return result && JSON.parse(result);
  }
}

export const boardGamesService = new BoardGames();

export const findAllBoardGames = await boardGamesService.get();
