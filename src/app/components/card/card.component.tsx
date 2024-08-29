"use client";

import { EnumPrimaryButton } from "../primary-button/types/primary-button.types";
import { ICard } from "./card.interface";
import { useCard } from "./hooks/card.hook";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { useHandleRentGame } from "@/app/hooks/handle-rent-game.hook";
import Image from "next/image";
import { BsHourglassSplit } from "react-icons/bs";
import { MdGroup } from "react-icons/md";

export const Card = ({ boardgame }: ICard) => {
    const { redirectToBoardgameAbout, boardgamePrice } = useCard(boardgame);
    const { handleRentGame } = useHandleRentGame(boardgame);
    return (
        <div className="bg-white cursor-pointer rounded-md w-[260px] h-[320px] border-2 border-zinc-900 transition ease-in-out delay-75 relative
            hover:translate-y-1 shadow-[8px_8px_0px_rgba(0,0,0,0.75)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.75)]"
            onClick={redirectToBoardgameAbout}
        >
            <div className="relative h-[60%]">
                <p className="
                bg-green-600 
                absolute 
                left-3 
                top-3 
                z-20 
                text-sm 
                text-white 
                py-1 
                px-3 
                rounded-full">Disponível</p>
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10 rounded-t-md" />
                <Image
                    src={boardgame.image}
                    alt={boardgame.name}
                    objectFit='cover'
                    layout="fill"
                    className={"w-full h-full bg-center object-cover overflow-hidden select-none touch-none"}
                    width={0}
                    height={0}
                />
                <p
                    className="
                    font-cardName
                    absolute 
                    bottom-4 
                    left-4 
                    font-black 
                    text-xl 
                    z-20 
                    text-white 
                    break-words
                    drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
                >
                    {boardgame.name}
                </p>
            </div>

            <div className="flex items-center justify-between h-11">
                <div className="flex flex-col xs:flex-row justify-between text-xs sm:text-sm w-full px-6">
                    <p className="flex items-center gap-1 text-gray-500"><MdGroup className="text-primary" /> 2-7 jogadores</p>
                    <p className="flex items-center gap-1 text-gray-500"><BsHourglassSplit className="text-primary" /> 30 minutos</p>
                </div>
                <div className="absolute bottom-4 w-full flex items-start flex-col gap-1 px-6">
                    <p className="text-primary flex text-lg">{boardgamePrice}</p>
                    <PrimaryButton
                        styles="text-xs"
                        text="alugar"
                        type={EnumPrimaryButton.OUTLINED}
                        onClick={(event) => {
                            event.stopPropagation(); // Prevents the user to switch page
                            handleRentGame();
                        }}
                    />
                </div>
            </div>
        </div>
    );
};