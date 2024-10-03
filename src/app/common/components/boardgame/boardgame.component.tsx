"use client";

import React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { ButtonRentGame } from "@/app/common/components/buttons";
import { ludoApi } from "../../services/api/ludo.api";
import { formatStringForApi } from "../../utils/format-string";

export const BoardGame = async () => {
  const searchParams = useSearchParams()!;
  const param = searchParams.get("boardgame")!;

  const foundGame = await ludoApi.boardgames.findByName(
    formatStringForApi(param)
  );

  if (!foundGame || foundGame.statusCode === 404) {
    return (
      <ErrorMessage title={foundGame.statusCode} message={foundGame.message} />
    );
  }
  const boardgame = foundGame[0];
  return (
    <div className="flex flex-col items-center justify-center py-12 pt-28 gap-6 px-20">
      <Image
        src={boardgame?.image ?? ""}
        alt={boardgame?.name ?? ""}
        height={300}
        width={300}
        className="w-56 h-56 object-cover rounded-xl"
      />
      <h1 className="text-5xl font-bold mb-4">{boardgame?.name}</h1>
      {boardgame?.description && (
        <div
          className="text-lg text-gray-700"
          dangerouslySetInnerHTML={{ __html: boardgame.description }}
        />
      )}
      <ButtonRentGame boardgame={boardgame} />
    </div>
  );
};
