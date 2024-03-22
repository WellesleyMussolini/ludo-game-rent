"use server"

import { prisma } from "@/utils/lib/database/prisma";
import { Card } from "../card/card.component";
import Link from 'next/link'
import { formatString } from "./utils/format-string";

export default async function BoardGameCatalogue({ isEditing }: { isEditing?: boolean }) {
    const findAllBoardGames = await prisma.boardgame.findMany({ orderBy: { id: "desc" } });

    return <ul className="grid justify-items-center max-[1300px]:grid-cols-3 max-[1000px]:grid-cols-2 max-[730px]:grid-cols-1 grid-cols-4 gap-10 max-[350px]:w-full">
        {
            findAllBoardGames.map((e: any, index: number) => (
                <Link href={`/boardgame/${(formatString(e.id))}`} key={index}>
                    <Card image={e.image} name={e.name} price={e.price} status={e.status} isEditing={isEditing} />
                </Link>
            ))
        }
    </ul>
};