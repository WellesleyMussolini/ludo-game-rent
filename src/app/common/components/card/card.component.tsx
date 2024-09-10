"use client";

import { PrimaryButtonStyles } from "../../../components/primary-button/types/primary-button.types";
import { useCard } from "./hooks/card.hook";
import { PrimaryButton } from "../../../components/primary-button/primary-button.component";
import { useHandleRentGame } from "@/app/hooks/handle-rent-game.hook";
import Image from "next/image";
import { BsHourglassSplit } from "react-icons/bs";
import { MdGroup } from "react-icons/md";
import { BoardGame } from "../../types/boardgame.types";
import { CardStatus } from "./types/card.types";

export const Card = ({ boardgame }: { boardgame: BoardGame }) => {
    const { redirectToBoardgameAbout, boardgamePrice } = useCard(boardgame);
    const { handleRentGame } = useHandleRentGame(boardgame);
    return (
        <div className="bg-white cursor-pointer rounded-md w-auto max-w-[260px] min-w-[200px] h-[320px] border-2 border-zinc-900 transition ease-in-out delay-75 relative hover:translate-y-1 shadow-[8px_8px_0px_rgba(0,0,0,0.75)] hover:shadow-[4px_4px_0px_rgba(0,0,0,0.75)]"
            onClick={redirectToBoardgameAbout}>

            <div className="relative h-[60%]">
                <p className={`
                ${boardgame.status === CardStatus.AVAILABLE ? "bg-green-600 text-white" : "bg-white text-black"}
                absolute 
                left-3 
                top-3  
                text-sm 
                z-20
                py-1 
                px-3 
                rounded-full`}>{boardgame.status}</p>
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

            <div className="flex items-center justify-between w-full flex-col h-16">
                <div className="flex flex-col xs:flex-row justify-between text-xs mt-1 xs:gap-9 w-full px-6">
                    <p className="flex items-center gap-1 text-gray-500"><MdGroup className="text-primary" /> 2-7 jogadores</p>
                    <p className="flex items-center gap-1 text-gray-500"><BsHourglassSplit className="text-primary" /> 30 minutos</p>
                </div>
                <p className={`text-start w-full px-6 text-primary flex text-lg mt-1`}>{boardgamePrice}</p>
                <div className="absolute bottom-4 w-full flex items-start flex-col gap-1 px-6">
                    {
                        boardgame.status !== CardStatus.AVAILABLE
                        &&
                        <PrimaryButton
                            styles="text-xs"
                            text={"alugar"}
                            type={PrimaryButtonStyles.OUTLINED}
                            onClick={(event) => {
                                event.stopPropagation(); // Prevents the user to switch page
                                handleRentGame();
                            }}
                        />
                    }
                </div>
            </div>
        </div >
    );
};