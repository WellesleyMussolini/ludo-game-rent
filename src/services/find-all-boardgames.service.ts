import boardGamesService from "./board-games.service";

export const findAllBoardGames = await boardGamesService.get();