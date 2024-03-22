
"use server"

import { IBoardGame } from "@/interfaces/boardgame.interface";
import { prisma } from "@/utils/lib/database/prisma";

export const createBoardGame = async ({ image, name, status, price }: IBoardGame) => {
  try {
    return await prisma.boardgame.create({ data: { image: image, name: name, status: status, price: price } })
  } catch {
    throw new Error();
  };
};