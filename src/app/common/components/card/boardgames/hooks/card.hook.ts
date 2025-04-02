"use client";

import { BoardGame } from "@/app/common/types/boardgame.types";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { useContext } from "@/app/common/context/context";
import { formatCurrency } from "@/app/common/utils/format-currency";
import { usePathname, useRouter } from "next/navigation";

export const useCard = (boardgame: BoardGame) => {
  const router = useRouter();
  const pathname = usePathname();
  const { isVisible, setIsVisible, setBoardGame } = useContext();

  const boardgamePrice = formatCurrency(boardgame.price);

  const redirectToBoardgameAbout = () =>
    router.push(`?boardgame=${boardgame.id}`);

  return {
    redirectToBoardgameAbout,
    boardgamePrice,
    pathname,
    isVisible,
    setIsVisible,
    setBoardGame,
  };
};
