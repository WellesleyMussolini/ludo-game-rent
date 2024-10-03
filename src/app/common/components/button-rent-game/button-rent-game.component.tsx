"use client";

import { BoardGame } from "@/app/common/types/boardgame.types";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/components/primary-button";
import { useHandleRentGame } from "@/app/hooks/handle-rent-game.hook";

export const ButtonRentGame = ({
  boardgame,
}: {
  boardgame: BoardGame | null;
}) => {
  const { handleRentGame } = useHandleRentGame(boardgame);
  if (!boardgame) return null;
  return (
    <div className="w-full ring-2 ring-white rounded-md">
      <PrimaryButton
        styles="text-xs"
        text="alugar"
        type={PrimaryButtonTypes.PRIMARY}
        onClick={handleRentGame}
      />
    </div>
  );
};
