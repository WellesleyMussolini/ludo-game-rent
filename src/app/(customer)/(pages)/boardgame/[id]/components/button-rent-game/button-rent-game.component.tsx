"use client"

import { BoardGame } from "@/app/common/types/boardgame.types";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component"
import { PrimaryButtonStyles } from "@/app/components/primary-button/types/primary-button.types";
import { useHandleRentGame } from "@/app/hooks/handle-rent-game.hook";

export const ButtonRentGame = ({ boardgame }: { boardgame: BoardGame | null }) => {
    const { handleRentGame } = useHandleRentGame(boardgame);
    if (!boardgame) return null;
    return (
        <div className="w-96 mt-4 max-[450px]:w-[80%] ring-2 ring-white rounded-md">
            <PrimaryButton text="alugar" type={PrimaryButtonStyles.PRIMARY} onClick={handleRentGame} />
        </div>
    );
};