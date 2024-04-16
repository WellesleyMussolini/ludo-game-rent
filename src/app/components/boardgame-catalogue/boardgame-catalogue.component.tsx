"use server";

import { prisma } from "@/utils/lib/database/prisma";
import { Card } from "../card/card.component";
import { IBoardGame } from "@/interfaces/boardgame.interface";
import { ErrorMessage } from "../error-message/error-message.component";

export default async function BoardGameCatalogue() {
    try {
        const findAllBoardGames = await prisma.boardgames.findMany({ orderBy: { id: "desc" } });
        return (
            <ul className="grid justify-items-center gap-10 grid-cols-4 pt-20
            duration-300
            max-[1300px]:grid-cols-3
            max-[1300px]:pt-24

            max-[1000px]:grid-cols-2
            max-[1000px]:pt-24
            
            max-[730px]:grid-cols-1 
            max-[730px]:pt-20

            max-[350px]:w-full
            ">
                {findAllBoardGames.map((boardgame: IBoardGame, index: number) => (
                    <Card key={index} boardgame={boardgame} />
                ))}
            </ul>
        );
    } catch {
        return (
            <div className="flex items-center justify-center h-full">
                <ErrorMessage title="404" message="Oops! Por algum motivo não foi possível encontrar o catálogo de jogos..." />
            </div>
        );
    };
};