"use client";

import { BoardGame } from "@/app/common/types/boardgame.types";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { useContext } from "@/app/common/context/context";
import { formatCurrency } from "@/app/common/utils/format-currency";
import { usePathname, useRouter } from "next/navigation";
import { formatStringForUrl } from "@/app/common/utils/format-string";

export const useCard = (boardgame: BoardGame) => {
  const router = useRouter();
  const pathname = usePathname();
  const { modals, setModals, setGetBoardGameId } = useContext();

  const boardgamePrice = formatCurrency(boardgame.price);

  const redirectToBoardgameAbout = () => {
    pathname === Pathnames.HOME &&
      router.push(`search?boardgame=${formatStringForUrl(boardgame.name)}`);
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
