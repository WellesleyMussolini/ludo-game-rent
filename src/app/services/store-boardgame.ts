
"use server"

import { prisma } from "@/utils/lib/database/prisma";

export const storeBoardGame = async (image: string, name: string, situation: string, price: string) => {
  try { return await prisma.boardgame.create({ data: { image: image, name: name, situation: situation, price: price} }) }
  catch (error) {
    console.error('Error storing board game:', error);
    throw error;
  };
};