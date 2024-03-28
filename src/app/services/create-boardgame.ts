
"use server"

import { IBoardGame } from "@/interfaces/boardgame.interface";
import { prisma } from "@/utils/lib/database/prisma";

export const createBoardGame = async ({ image, name, status, price, ageToPlay, description, playTime, playersToPlay }: IBoardGame) => {
  try {
    return await prisma.boardgame.create({
      data: {
        image: image,
        name: name,
        status: status,
        price: price,
        ageToPlay: ageToPlay,
        description: description,
        playTime: playTime,
        playersToPlay: {
          create: {
            maximum: playersToPlay.maximum,
            minimum: playersToPlay.minimum,
          }
        }
      }
    })
  } catch {
    throw new Error("error while trying to save the game on the database...");
  }
};
