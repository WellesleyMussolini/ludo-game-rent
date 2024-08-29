"use client"

import { IBoardGame } from "@/types/boardgame.interface";
import { formatCurrency } from "@/utils/format-currency";
import { useRouter } from "next/navigation";

export const useCard = (boardgame: IBoardGame) => {
  const router = useRouter();
  const boardgamePrice = formatCurrency(boardgame.price);

  const redirectToBoardgameAbout = () => router.push(`/boardgame/${boardgame.id}`);

  return { redirectToBoardgameAbout, boardgamePrice };
};
