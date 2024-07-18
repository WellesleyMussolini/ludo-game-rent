"use client"

import { IBoardGame } from "@/types/boardgame.interface";
import { useRouter } from "next/navigation";

export const useCard = (boardgame: IBoardGame) => {
  const router = useRouter();

  const redirectToBoardgameAbout = () => router.push(`/boardgame/${boardgame.id}`);

  return { redirectToBoardgameAbout };
};
