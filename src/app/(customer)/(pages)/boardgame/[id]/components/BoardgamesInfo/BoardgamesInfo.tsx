"use server";

import React from "react";
import { BoardgameStats } from "@/app/components/boardgame-stats/boardgame-stats.component";
import { ImageComponent } from "@/app/components/image/image.component";
import { prisma } from "@/utils/lib/database/prisma";
import { ButtonRentGame } from "../button-rent-game/button-rent-game.component";
import Link from "next/link";
import { ArrowLeft, Heart } from "lucide-react";
import CategoriasGames from "./categorias";

interface BoardGameInfoProps {
  id: string;
}

export default async function BoardGameInfo({ id }: BoardGameInfoProps) {
  const boardgameData = await prisma.boardgames.findUnique({ where: { id } });

  return (
    <div className="flex max-md:flex-col space-y-8">
      <div className="flex justify-center h-[55%] lg:h-screen bg-sky-600 w-full rounded-b-2xl lg:rounded-r-3xl text-white">
        <div className="px-4 lg:px-20 justify-center pb-4">
          <Link
            href="/"
            className="absolute left-4 lg:left-20 top-4 text-gray-900 bg-zinc-200 cursor-pointer justify-center rounded-full p-2 hover:bg-gray-400 hover:text-white"
          >
            <ArrowLeft size={18} />
          </Link>
          {/* boardgame stats */}
          <div className="flex flex-col justify-center items-center mt-[15%] lg:mt-[35%]">
            {/* boardgame image */}
            <ImageComponent
              layoutType="responsive"
              width="16em"
              image={boardgameData?.image ?? ""}
              alt={boardgameData?.name ?? ""}
            />
            {/* boardgame name & title */}
            <h1 className="text-3xl mt-4 font-black font-cardName">
              {boardgameData?.name}
            </h1>
            <div className="flex items-center text-lg gap-10 py-2">
              <div className="flex gap-2">
                <span>Avaliações</span>
                <span>3.8/5</span>
              </div>
              <button className="flex items-center px-3 py-2 gap-2 hover:bg-sky-800 rounded-lg">
                Favoritar
                <Heart size={20} />
              </button>
            </div>
            <div className="flex flex-col justify-center items-center lg:space-y-8">
              <BoardgameStats
                boardgame={boardgameData}
                iconSize="20px"
                styles="flex justify-around gap-6 flex-wrap break-words w-full text-sm mt-4 text-gray-500"
              />
              <div className="max-lg:hidden">
                <CategoriasGames />
              </div>
              {/* rent game button */}
              <ButtonRentGame boardgame={boardgameData} />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col dark:text-white overflow-y-auto space-y-4 px-4 lg:px-28 pb-8">
        <h1 className="text-3xl mt-4 font-black font-cardName">
          {boardgameData?.name}
        </h1>
        <h1 className="text-2xl">Sobre o jogo</h1>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure,
          aperiam incidunt, accusantium sit earum laudantium adipisci,
          dignissimos mollitia eum sunt quae commodi illum modi quaerat
          repudiandae minus error itaque.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure,
          aperiam incidunt, accusantium sit earum laudantium adipisci,
          dignissimos mollitia eum sunt quae commodi illum modi quaerat
          repudiandae minus error itaque.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure,
          aperiam incidunt, accusantium sit earum laudantium adipisci,
          dignissimos mollitia eum sunt quae commodi illum modi quaerat
          repudiandae minus error itaque.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure,
          aperiam incidunt, accusantium sit earum laudantium adipisci,
          dignissimos mollitia eum sunt quae commodi illum modi quaerat
          repudiandae minus error itaque.
        </span>
        <hr />
        <h1 className="text-2xl">Regras</h1>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure,
          aperiam incidunt, accusantium sit earum laudantium adipisci,
          dignissimos mollitia eum sunt quae commodi illum modi quaerat
          repudiandae minus error itaque.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure,
          aperiam incidunt, accusantium sit earum laudantium adipisci,
          dignissimos mollitia eum sunt quae commodi illum modi quaerat
          repudiandae minus error itaque.
        </span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea iure,
          aperiam incidunt, accusantium sit earum laudantium adipisci,
          dignissimos mollitia eum sunt quae commodi illum modi quaerat
          repudiandae minus error itaque.
        </span>
      </div>
    </div>
  );
}
