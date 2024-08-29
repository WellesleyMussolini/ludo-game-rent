"use client"

import { PrimaryButton } from "@/app/components/primary-button/primary-button.component"
import { EnumPrimaryButton } from "@/app/components/primary-button/types/primary-button.types";
import { useHandleRentGame } from "@/app/hooks/handle-rent-game.hook";
import { IBoardGame } from "@/types/boardgame.interface";

export const ButtonRentGame = ({ boardgame }: { boardgame: IBoardGame | null }) => {
    const { handleRentGame } = useHandleRentGame(boardgame);
    if (!boardgame) return null;
    return (
        <div className="w-96 mt-4 max-[450px]:w-[80%] ring-2 ring-white rounded-md">
            <PrimaryButton text="alugar" type={EnumPrimaryButton.PRIMARY} onClick={handleRentGame} />
        </div>
    );
};