"use client";

import { useSearchParams } from "next/navigation";
import { ludoGamesApi } from "../../api/ludo-games-api/boardgames.api";
import { ErrorMessage } from "@/app/components/error-message/error-message.component";
import Image from "next/image";
import { ButtonRentGame } from "../button-rent-game/button-rent-game.component";

export const BoardGame = async () => {
  const searchParams = useSearchParams()!;
  const param = searchParams.get("boardgame")!;

  const formattedName = param
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const foundGame = await ludoGamesApi.findByName(formattedName);

  if (foundGame.length === 0) {
    <div>
      <ErrorMessage title="404" message="BoardGame não encontrado" />;
    </div>;
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
      <div
        className="text-lg text-gray-700"
        dangerouslySetInnerHTML={{ __html: boardgame.description }}
      />
      <ButtonRentGame boardgame={boardgame} />
    </div>
  );
};
