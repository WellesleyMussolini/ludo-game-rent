"use server"

import { BoardgameStats } from "@/app/components/boardgame-stats/boardgame-stats.component";
import { ImageComponent } from "@/app/components/image/image.component";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";
import { prisma } from "@/utils/lib/database/prisma";
import React from "react";
import { ButtonRentGame } from "./components/button-rent-game/button-rent-game.component";

export default async function BoardGame({ params: { id } }: { params: { id: string } }) {
    const boardgameData = await prisma.boardgames.findUnique({ where: { id } });
    return (
        <div className="flex items-center justify-center py-16 flex-col gap-4 min-h-[calc(100vh-80px)]">
            {/* boardgame image */}
            <ImageComponent height="13em" width="13em" image={boardgameData?.image} alt={boardgameData?.name} />

            {/* boardgame name & title */}
            <h1 className="text-4xl mt-4 font-black">{boardgameData?.name}</h1>

            {/* boardgame stats */}
            <div className="max-[350px]:px-8 flex items-center justify-center">
                <div className="max-w-[1200px] w-full">
                    <BoardgameStats
                        minimumPlayersToPlay={boardgameData?.minimumPlayersToPlay}
                        maximumPlayersToPlay={boardgameData?.maximumPlayersToPlay}
                        playTime={boardgameData?.playTime}
                        ageToPlay={boardgameData?.ageToPlay}
                        iconSize="20px"
                        styles="flex justify-between px-10 flex-row gap-6 flex-wrap break-words w-full text-[13px] mt-4 text-gray-500"
                    />
                </div>
            </div>


            {/* rent game button */}
            <ButtonRentGame boardgame={boardgameData} />
            {/* <p>Descrição</p> */}
            {/* <p className="break-words px-3">{boardgameData?.description}</p> */}
            {/* <p>{boardgameData?.status}</p> */}
        </div>
    );
};