"use server";

import { IBoardGame } from "@/interfaces/boardgame.interface";
import { prisma } from "@/utils/lib/database/prisma";

export const createBoardGame = async (boardgame: IBoardGame) => {
  try {
    return await prisma.boardgames.create({
      data: {
        image: boardgame.image,
        name: boardgame.name,
        status: boardgame.status,
        price: boardgame.price,
        ageToPlay: boardgame.ageToPlay,
        description: boardgame.description,
        playTime: boardgame.playTime,
        minimumPlayersToPlay: boardgame.minimumPlayersToPlay,
        maximumPlayersToPlay: boardgame.maximumPlayersToPlay,
      },
    });
  } catch {
    throw new Error("error while trying to save the game on the database...");
  }
};