"use client"

import { PrimaryButton } from "@/app/components/primary-button/primary-button.component"
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface"
import { useBoardgameId } from "../../hooks/use-boardgame-id.hook"
import { IBoardGame } from "@/interfaces/boardgame.interface";

export const ButtonRentGame = ({boardgame}: {boardgame: IBoardGame}) => {
    const {handleRentGame} = useBoardgameId(boardgame);
    return <div className="w-96 mt-4 max-[450px]:w-[80%]">
        <PrimaryButton text="alugar" type={EnumPrimaryButton.PRIMARY} onClick={handleRentGame} />
    </div>;
};