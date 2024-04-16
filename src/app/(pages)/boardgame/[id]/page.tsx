"use server"

import React from "react";
import { BoardgameStats } from "@/app/components/boardgame-stats/boardgame-stats.component";
import { ImageComponent } from "@/app/components/image/image.component";
import { prisma } from "@/utils/lib/database/prisma";
import { ButtonRentGame } from "./components/button-rent-game/button-rent-game.component";

export default async function BoardGame({ params: { id } }: { params: { id: string } }) {
    const boardgameData = await prisma.boardgames.findUnique({ where: { id } });
    return (
        <div className="flex items-center justify-center py-16 flex-col gap-4 min-h-[calc(100vh-80px)]">
            {/* boardgame image */}
            <ImageComponent layoutType="responsive" width="10em" image={boardgameData?.image?? ""} alt={boardgameData?.name?? ""} />

            {/* boardgame name & title */}
            <h1 className="text-3xl mt-4 font-black text-black font-cardName">{boardgameData?.name}</h1>

            {/* boardgame stats */}
            <div className="max-[350px]:px-8 flex items-center justify-center">
                <div className="max-w-[1200px] w-full">
                    <BoardgameStats
                        boardgame={boardgameData}
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