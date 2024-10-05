"use client";

import React from "react";
import Image from "next/image";
import { ButtonRentGame } from "@/app/common/components/buttons";
import { BoardGame as BoardGameType } from "../../../../common/types/boardgame.types";
import { useSearchParams } from "next/navigation";
import { formatStringForApi } from "@/app/common/utils/format-string";
import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { boardGamesService } from "@/app/common/services/boardgames.service";

export const BoardGameAbout = async () => {
  const searchParams = useSearchParams()!;
  const param = searchParams.get("boardgame")!;

  const foundGames = await boardGamesService.getByName(
    formatStringForApi(param)
  );

  // Check if foundGames is null or an empty array
  if (!foundGames || foundGames.length === 0) {
    return <ErrorMessage title="404" message="BoardGame were not found" />;
  }

  return (
    <>
      {foundGames.map((game: BoardGameType, index: number) => {
        console.log(game);
        return (
          <div
            key={index}
            className="flex flex-col items-center justify-center py-12 pt-28 gap-6 px-20"
          >
            <Image
              src={game?.image ?? ""}
              alt={game?.name ?? ""}
              height={300}
              width={300}
              className="w-56 h-56 object-cover rounded-xl"
            />
            <h1 className="text-5xl font-bold mb-4">{game?.name}</h1>
            {game?.description && (
              <div
                className="text-lg text-gray-700"
                dangerouslySetInnerHTML={{ __html: game.description }}
              />
            )}
            <ButtonRentGame boardgame={game} />
          </div>
        );
      })}
    </>
  );
};
