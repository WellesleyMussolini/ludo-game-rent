"use client";

import { BoardGame } from "@/app/common/types/boardgame.types";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { useContext } from "@/app/common/context/context";
import { formatCurrency } from "@/utils/format-currency";
import { usePathname, useRouter } from "next/navigation";

export const useCard = (boardgame: BoardGame) => {
  const router = useRouter();
  const pathname = usePathname();
  const { modals, setModals, setGetBoardGameId } = useContext();

  const boardgamePrice = formatCurrency(boardgame.price);

  const formatName = boardgame.name.toLowerCase().replace(/\s+/g, "-");

  const redirectToBoardgameAbout = () => {
    pathname === Pathnames.HOME && router.push(`?boardgame=${formatName}`);
  };

  return {
    redirectToBoardgameAbout,
    boardgamePrice,
    pathname,
    modals,
    setModals,
    setGetBoardGameId,
  };
};
