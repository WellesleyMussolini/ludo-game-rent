"use client"

import { prisma } from "@/utils/lib/database/prisma";
import { Card } from "../card/card.component";

export default async function BoardGameCatalogue(){
    const findAllBoardGames = await prisma.boardgame.findMany({ orderBy: { id: "desc" } });

    return <ul className="grid justify-items-center max-[1300px]:grid-cols-3 max-[1000px]:grid-cols-2 max-[730px]:grid-cols-1 grid-cols-4 gap-10 max-[350px]:w-full">
        {
            findAllBoardGames.map((e: any, index: number) => <Card key={index} image={e.image} name={e.name} price={e.price} />)
        }
    </ul>
};