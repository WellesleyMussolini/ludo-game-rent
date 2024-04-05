import { BoardgameStats } from "@/app/components/boardgame-stats/boardgame-stats.component";
import { ImageComponent } from "@/app/components/image/image.component";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";
import { prisma } from "@/utils/lib/database/prisma";
import Image from "next/image";
import React from "react";

export default async function BoardGame({ params: { id } }: { params: { id: string } }) {
    const boardgameData = await prisma.boardgames.findUnique({ where: { id } });
    return (
        <div className="flex items-center justify-center flex-col h-[calc(100vh-80px)]">

            <div className="relative h-[16em] w-[16em] max-[320px]:h-[44%] max-[320px]:w-[80%] mb-10"><ImageComponent image={boardgameData?.image} alt={boardgameData?.name} /></div>
            <h1 className="text-4xl font-black">{boardgameData?.name}</h1>
            <div className="flex flex-col text-sm">
            <BoardgameStats
                minimumPlayersToPlay={boardgameData?.minimumPlayersToPlay}
                maximumPlayersToPlay={boardgameData?.maximumPlayersToPlay}
                playTime={boardgameData?.playTime}
                ageToPlay={boardgameData?.ageToPlay}
                iconSize="2em"
                styles="flex items-start w-full px-4 mt-3 gap-3 text-gray-500"
                />
                </div>
            {/* <FaBaby /> <p>{boardgameData?.ageToPlay} anos</p> */}
            <div className="w-96 max-[320px]:w-[80%]">
                <PrimaryButton text="alugar" type={EnumPrimaryButton.PRIMARY} />
            </div>

            {/* <p>Descrição</p> */}
            {/* <p>{boardgameData?.description}</p> */}
            {/* <p>{boardgameData?.status}</p> */}
        </div>
    );
};