import { ImageComponent } from "@/app/components/image/image.component";
import { prisma } from "@/utils/lib/database/prisma";
import Image from "next/image";
import React from "react";

export default async function BoardGame({ params: { id } }: { params: { id: string } }) {
    const boardgameData = await prisma.boardgame.findUnique({ where: { id } });
    return (
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
            <div className="relative h-[32em] w-[32em]"><ImageComponent image={boardgameData?.image} alt={boardgameData?.name} /></div>
            <p>{boardgameData?.id}</p>
            <p>{boardgameData?.name}</p>
            <p>{boardgameData?.price}</p>
            <p>{boardgameData?.status}</p>
        </div>
    );
};

// export default async function BoardGame({ params: { name } }: BoardgamePageProps) {
// const boardgameData = await prisma.boardgame.findFirst({ where: { name: name } });