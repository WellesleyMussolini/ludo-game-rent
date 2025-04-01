import { handleHttpRequest } from "@/app/common/utils/handle-http-request";
import boardGameMapper, { ResponseBoardGame } from "./mapper/boardgame.mapper";
import { BoardGame } from "@/app/common/types/boardgame.types";
import boardgameMapper from "./mapper/boardgame.mapper";
import { RequestMethods } from "../types/request-methods.enum";

const url = process.env.NEXT_PUBLIC_API_URL;

class BoardGames {
  async get(): Promise<BoardGame[]> {
    const response = await handleHttpRequest(
      url,
      "boardgames",
      RequestMethods.GET
    );

    if (!response) return [];

    const findAllBoardGames: ResponseBoardGame[] = await response.json();

    return findAllBoardGames.map((boardGame: ResponseBoardGame) =>
      boardGameMapper.toDomain(boardGame)
    );
  }

  async getById(id: string): Promise<BoardGame | null> {
    try {
      const response = await handleHttpRequest(
        url,
        `boardgames/get-by-id/${id}`,
        RequestMethods.GET
      );

      if (!response) return null;

      const findBoardgame: ResponseBoardGame = await response.json();

      return boardGameMapper.toDomain(findBoardgame);
    } catch {
      return null;
    }
  }

  async getByName(name: string): Promise<BoardGame[] | null> {
    const response = await handleHttpRequest(
      url,
      `boardgames/search-by-name?name=${name}`,
      RequestMethods.GET
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
    const response = await handleHttpRequest(
      url,
      `boardgames/${id}`,
      RequestMethods.PUT,
      {
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
      }
    );

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
    availableCopies,
  }: BoardGame): Promise<BoardGame> {
    const response = await handleHttpRequest(
      url,
      `boardgames/`,
      RequestMethods.POST,
      {
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
        availableCopies,
      }
    );

    if (!response) {
      throw new Error("Failed to create BoardGame"); // Handle null response
    }

    const createdBoardGame = await response.json();
    return boardgameMapper.toDomain(createdBoardGame);
  }

  async delete(id: string): Promise<BoardGame> {
    const response = await handleHttpRequest(
      url,
      `boardgames/${id}`,
      RequestMethods.DELETE
    );

    if (!response) {
      throw new Error("Failed to delete BoardGame"); // Handle null response
    }

    const result = await response.text();
    return result && JSON.parse(result);
  }
}

export const boardGamesService = new BoardGames();

export const findAllBoardGames = await boardGamesService.get();
