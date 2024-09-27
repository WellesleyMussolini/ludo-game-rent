"use server";

import React from "react";
import boardGamesService from "@/services/boardgames.service";
import Image from "next/image";
import { ButtonRentGame } from "./components/button-rent-game/button-rent-game.component";
import { formatDescription } from "@/app/(customer)/utils/format-description";
import { ErrorMessage } from "@/app/components/error-message/error-message.component";

export default async function BoardGame({ params: { id } }: { params: { id: string } }) {
  const boardgame = await boardGamesService.getById(id);
  if (!boardgame) return <ErrorMessage title="ERROR" message="Unable to track the boardgame you wanted :(" />;
  const formattedDescription = formatDescription(boardgame.description);
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
      <div
        className="text-lg text-gray-700"
        dangerouslySetInnerHTML={{ __html: formattedDescription }}
      />
      <ButtonRentGame boardgame={boardgame} />
    </div>
  );
}