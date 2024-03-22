import { prisma } from "@/utils/lib/database/prisma";
import React from "react";

interface BoardgamePageProps { params: { id: string } };

export default async function BoardGame({ params: { id } }: BoardgamePageProps) {
    const boardgameData = await prisma.boardgame.findUnique({ where: { id } });
    return (
        <div>
            <p>{boardgameData?.id}</p>
            <p>{boardgameData?.name}</p>
            <p>{boardgameData?.price}</p>
            <p>{boardgameData?.status}</p>
        </div>
    );
};

// export default async function BoardGame({ params: { name } }: BoardgamePageProps) {
    // const boardgameData = await prisma.boardgame.findFirst({ where: { name: name } });