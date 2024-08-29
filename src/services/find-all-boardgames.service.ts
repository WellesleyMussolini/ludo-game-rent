import boardGamesService from "./boardgames.service";

export const findAllBoardGames = await boardGamesService.get();