"use client";

import { BoardGame } from "@/app/common/types/boardgame.types";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { useContext } from "@/app/common/context/context";
import { formatCurrency } from "@/app/common/utils/format-currency";
import { usePathname, useRouter } from "next/navigation";
import { CardStatus } from "../types/card.types";
import {
  ButtonRentGame,
  PrimaryButton,
  PrimaryButtonTypes,
} from "../../../buttons";

export const useCard = (boardgame: BoardGame) => {
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = pathname !== Pathnames.ADMIN;
  const {
    setIsModalUpdateGameFormOpen,
    setIsModalDeleteGameOpen,
    setBoardGame,
  } = useContext();

  const boardgamePrice = formatCurrency(boardgame.price);

  const redirectToBoardgameAbout = () =>
    router.push(`?boardgame=${boardgame.id}`);

  const renderUserRentalButton = () => {
    if (!isAdmin) return null;
    return (
      <>
        {boardgame.status === CardStatus.AVAILABLE && (
          <ButtonRentGame boardgame={boardgame} />
        )}
      </>
    );
  };

  const renderAdminButtons = () => {
    if (isAdmin) return null;
    const handleOnClick = ({
      event,
      handleVisibility,
    }: {
      event: React.MouseEvent<HTMLButtonElement>;
      handleVisibility: (visibility: boolean) => void;
    }) => {
      event.stopPropagation(); // prevent card click
      setBoardGame(boardgame);
      handleVisibility(true);
    };
    return (
      <>
        <PrimaryButton
          styles="text-xs"
          text={"EDITAR"}
          type={PrimaryButtonTypes.ALERT}
          onClick={(event) =>
            handleOnClick({
              event,
              handleVisibility: setIsModalUpdateGameFormOpen,
            })
          }
        />
        <PrimaryButton
          styles="text-xs"
          text={"DELETAR"}
          type={PrimaryButtonTypes.DELETE}
          onClick={(event) =>
            handleOnClick({
              event,
              handleVisibility: setIsModalDeleteGameOpen,
            })
          }
        />
      </>
    );
  };
  return {
    boardgamePrice,
    pathname,
    setBoardGame,
    setIsModalUpdateGameFormOpen,
    redirectToBoardgameAbout,
    setIsModalDeleteGameOpen,
    renderUserRentalButton,
    renderAdminButtons,
  };
};
