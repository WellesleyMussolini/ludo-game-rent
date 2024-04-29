"use client"

import { PrimaryButton } from "@/app/components/primary-button/primary-button.component"
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface"
import { useHandleRentGame } from "@/app/hooks/use-handle-rent-game.hook";
import { IBoardGame } from "@/interfaces/boardgame.interface";

interface ButtonRentGameProps {
    boardgame: IBoardGame | null;
}

export const ButtonRentGame = ({ boardgame }: ButtonRentGameProps) => {
    const { handleRentGame } = useHandleRentGame(boardgame); 
    
    if (!boardgame) {
        return null;
    }
    
    return (
        <div className="w-96 mt-4 max-[450px]:w-[80%]">
            <PrimaryButton text="alugar" type={EnumPrimaryButton.PRIMARY} onClick={handleRentGame} />
        </div>
    );
};