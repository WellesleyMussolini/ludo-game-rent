import { httpRequest } from "@/app/common/utils/http-request";
import boardGameMapper, { ResponseBoardGame } from "./mapper/boardgame.mapper";
import { BoardGame } from "@/app/common/types/boardgame.types";
import boardgameMapper from "./mapper/boardgame.mapper";

class BoardGames {
  async get(): Promise<BoardGame[]> {
    const response = await httpRequest("boardgames", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response) return [];

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

    if (!response) return null;

    const findBoardgame: ResponseBoardGame = await response.json();

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

    if (!response) return []; // Return an empty array if the response is null (404)

    const findBoardGame: ResponseBoardGame[] = await response.json();

    return findBoardGame.map(boardGameMapper.toDomain);
  }

  async update({
    id,
    name,
    image,
    price,
    status,
    ageToPlay,
    playTime,
    minimumPlayersToPlay,
    maximumPlayersToPlay,
    description,
    rentalDurationDays,
  }: BoardGame): Promise<BoardGame> {
    const response = await httpRequest(`boardgames/${id}`, {
      method: "PUT",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image,
        price,
        status,
        ageToPlay,
        playTime,
        minimumPlayersToPlay,
        maximumPlayersToPlay,
        description,
        rentalDurationDays,
      }),
    });

    if (!response) {
      throw new Error("Failed to update BoardGame"); // Handle null response
    }

    const updateBoardGame = await response.json();
    return boardgameMapper.toDomain(updateBoardGame);
  }

  async create({
    name,
    image,
    price,
    status,
    ageToPlay,
    playTime,
    minimumPlayersToPlay,
    maximumPlayersToPlay,
    description,
    rentalDurationDays,
  }: BoardGame): Promise<BoardGame> {
    const response = await httpRequest(`boardgames/`, {
      method: "POST",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        image,
        price,
        status,
        ageToPlay,
        playTime,
        minimumPlayersToPlay,
        maximumPlayersToPlay,
        description,
        rentalDurationDays,
      }),
    });

    if (!response) {
      throw new Error("Failed to create BoardGame"); // Handle null response
    }

    const createdBoardGame = await response.json();
    return boardgameMapper.toDomain(createdBoardGame);
  }

  async delete(id: string): Promise<BoardGame> {
    const response = await httpRequest(`boardgames/${id}`, {
      method: "DELETE",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response) {
      throw new Error("Failed to delete BoardGame"); // Handle null response
    }

    const result = await response.text();
    return result && JSON.parse(result);
  }
}

export const boardGamesService = new BoardGames();

export const findAllBoardGames = await boardGamesService.get();
