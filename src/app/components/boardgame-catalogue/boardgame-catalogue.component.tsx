"use server";

import { prisma } from "@/utils/lib/database/prisma";
import { Card } from "../card/card.component";
import Link from "next/link";
import { formatString } from "./utils/format-string";
import { IBoardGame } from "@/interfaces/boardgame.interface";

interface IBoardGameData extends IBoardGame { id: string };

export default async function BoardGameCatalogue() {
    const findAllBoardGames = await prisma.boardgames.findMany({ orderBy: { id: "desc" } });

    return (
        <ul className="grid justify-items-center gap-10
        grid-cols-4 
        max-[1300px]:grid-cols-3 
        max-[1000px]:grid-cols-2 
        max-[730px]:grid-cols-1 
        max-[350px]:w-full
        "
        >
            {findAllBoardGames.map((boardgame: IBoardGameData, index: number) => (
                <Link
                    href={`/boardgame/${formatString(boardgame.id)}`}
                    key={index}
                    className="w-full flex justify-center">
                    <Card boardgame={boardgame} />
                </Link>
            ))}
        </ul>
    );
};