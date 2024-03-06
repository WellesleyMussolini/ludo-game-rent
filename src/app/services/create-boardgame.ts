
"use server"

import { IBoardGame } from "@/interfaces/boardgame.interface";
import { prisma } from "@/utils/lib/database/prisma";

export const createBoardGame = async ({ image, name, situation, price }: IBoardGame) => {
  try { return await prisma.boardgame.create({ data: { image: image, name: name, situation: situation, price: price } }) }
  catch (error) {
    console.error('Error storing board game:', error);
    throw error;
  };
};