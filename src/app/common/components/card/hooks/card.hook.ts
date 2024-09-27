"use client"

import { BoardGame } from "@/app/common/types/boardgame.types";
import { formatCurrency } from "@/utils/format-currency";
import { useRouter } from "next/navigation";
import { CardStatus } from "../types/card.types";

export const useCard = (boardgame: BoardGame) => {
  const router = useRouter();
  const boardgamePrice = formatCurrency(boardgame.price);

  const redirectToBoardgameAbout = () => router.push(`/boardgame/${boardgame.id}`);

  return { redirectToBoardgameAbout, boardgamePrice };
};
