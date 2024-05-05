"use server";

import React from "react";
import { BoardgameStats } from "@/app/components/boardgame-stats/boardgame-stats.component";
import { ImageComponent } from "@/app/components/image/image.component";
import { prisma } from "@/utils/lib/database/prisma";
import { ButtonRentGame } from "../../components/button-rent-game/button-rent-game.component";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface BoardGameInfoProps {
  id: string;
}

export default async function BoardGameInfo({ id }: BoardGameInfoProps) {
  const boardgameData = await prisma.boardgames.findUnique({ where: { id } });

  return (
    <div className="flex max-md:flex-col space-y-8 ">
      <div className="flex justify-center h-[55%] lg:h-screen bg-orange-400 w-full rounded-b-2xl lg:rounded-r-3xl">
        <div className="px-4 lg:px-20 justify-center pb-4">
          <Link
            href="/"
            className="absolute left-4 lg:left-20 top-4 text-gray-900 bg-zinc-200 cursor-pointer justify-center rounded-full p-3 hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
          </Link>
          {/* boardgame stats */}
          <div className="flex flex-col justify-center items-center mt-[20%] lg:mt-[50%]">
            {/* boardgame image */}
            <ImageComponent
              layoutType="responsive"
              width="16em"
              image={boardgameData?.image ?? ""}
              alt={boardgameData?.name ?? ""}
            />
            {/* boardgame name & title */}
            <h1 className="text-3xl mt-4 font-black text-white font-cardName">
              {boardgameData?.name}
            </h1>
            <BoardgameStats
              boardgame={boardgameData}
              iconSize="20px"
              styles="flex justify-around gap-6 flex-wrap break-words w-full text-sm mt-4 text-gray-500"
            />
            {/* rent game button */}
            <ButtonRentGame boardgame={boardgameData} />
          </div>
        </div>
        {/* <p>Descrição</p> */}
        {/* <p className="break-words px-3">{boardgameData?.description}</p> */}
        {/* <p>{boardgameData?.status}</p> */}
      </div>
      <div className="flex flex-col overflow-y-auto space-y-4 px-4 lg:px-28 pb-8">
        <h1 className="text-white text-2xl">Sobre o jogo</h1>
        <span className="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure,
          aperiam incidunt, accusantium sit earum laudantium adipisci,
          dignissimos mollitia eum sunt quae commodi illum modi quaerat
          repudiandae minus error itaque.
        </span>
        <span className="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure,
          aperiam incidunt, accusantium sit earum laudantium adipisci,
          dignissimos mollitia eum sunt quae commodi illum modi quaerat
          repudiandae minus error itaque.
        </span>
        <span className="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure,
          aperiam incidunt, accusantium sit earum laudantium adipisci,
          dignissimos mollitia eum sunt quae commodi illum modi quaerat
          repudiandae minus error itaque.
        </span>
        <span className="text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure,
          aperiam incidunt, accusantium sit earum laudantium adipisci,
          dignissimos mollitia eum sunt quae commodi illum modi quaerat
          repudiandae minus error itaque.
        </span>
      </div>
    </div>
  );
}
