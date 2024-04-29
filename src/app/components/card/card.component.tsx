"use client"

import { toast } from "react-toastify";
import { ImageComponent } from "../image/image.component";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../primary-button/primary-button.interface";
import { ICard } from "./card.interface";
import { useCard } from "./hooks/use-card.hook";
import { useHandleRentGame } from "@/app/hooks/use-handle-rent-game.hook";

export const Card = ({ boardgame }: ICard) => {
    const { redirectToBoardgameAbout} = useCard(boardgame);
    const {handleRentGame} = useHandleRentGame(boardgame);
    return (
        <div className="
        bg-white 
        z-10 
        cursor-pointer
        rounded-md 
        shadow-cardShadow 
        hover:shadow-lg
        transition-transform
        transform-gpu
        hover:scale-105 
        duration-300
        ease-in-out
        w-[200px] 
        h-[230px]
        "
            onClick={redirectToBoardgameAbout}>
            <div className="relative h-[60%] rounded-md bg-primary">
                <ImageComponent
                    enableOpacity
                    image={boardgame.image ?? ""}
                    alt={boardgame.name ?? ""}
                    layoutType="fill"
                    width="100%"
                    height="100%"
                    className="rounded-t-md"
                />
                <p className="
            font-cardName
            absolute 
            bottom-4 
            left-4 
            font-black 
            text-xl 
            z-20 
            text-white 
            break-words
            drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{boardgame.name}</p>
            </div>

            <div className="flex items-start mt-2 flex-col gap-1 px-5">
                <p className="text-primary flex text-xl">R${boardgame.price}</p>
                <PrimaryButton styles="text-[12px]" text="alugar" type={EnumPrimaryButton.OUTLINED} onClick={(event) => {
                    event.stopPropagation(); // Prevents the user to switch page 
                    handleRentGame(); // Call the handleRentGame function
                }} />
            </div>
        </div>

    );
};