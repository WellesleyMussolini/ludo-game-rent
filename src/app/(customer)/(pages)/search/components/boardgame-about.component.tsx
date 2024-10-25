"use client";

import React from "react";
import Image from "next/image";
import { ButtonRentGame } from "@/app/common/components/buttons";
import { useSearchParams } from "next/navigation";
import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { boardGamesService } from "@/app/common/services/boardgames.service";

export const BoardGameAbout = async () => {
  const searchParams = useSearchParams()!;
  const param = searchParams.get("boardgame")!;

  const foundBoardGame = await boardGamesService.getById(param);

  if (!foundBoardGame) {
    return <ErrorMessage title="404" message="BoardGame were not found" />;
  }

  return (
    <div className="flex flex-col items-center justify-center py-12 pt-28 gap-6 px-20">
      {!foundBoardGame ? (
        <ErrorMessage title="404" message="BoardGame were not found" />
      ) : (
        <>
          <Image
            src={foundBoardGame?.image ?? ""}
            alt={foundBoardGame?.name ?? ""}
            height={300}
            width={300}
            className="w-56 h-56 object-cover rounded-xl"
          />
          <h1 className="text-5xl font-bold mb-4">{foundBoardGame?.name}</h1>
          {foundBoardGame?.description && (
            <div
              className="text-lg text-gray-700"
              dangerouslySetInnerHTML={{ __html: foundBoardGame.description }}
            />
          )}
          <ButtonRentGame boardgame={foundBoardGame} />
        </>
      )}
    </div>
  );
};
