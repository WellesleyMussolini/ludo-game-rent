"use client";

import React from "react";
import { Card } from "../card/card.component";
import { BoardGame } from "@/app/common/types/boardgame.types";
import { ErrorMessage } from "../error-message/error-message.component";
import { PrimaryInput, PrimaryInputTypes } from "../primary-input";
import { usePathname } from "next/navigation";
import { Pathnames } from "../../types/pathnames.enum";

export const BoardGameCatalogue = ({
  boardgames,
}: {
  boardgames: Array<BoardGame>;
}) => {
  const [inputText, setInputText] = React.useState<string>("");
  const pathname = usePathname();

  // Trazer via api
  const filteredBoardGames = inputText
    ? boardgames.filter((game) =>
        game.name.toLowerCase().includes(inputText.toLowerCase())
      )
    : boardgames;

  return (
    <div
      className={`flex items-center justify-center ${
        pathname === Pathnames.HOME ? "pt-28" : "pt-16"
      } pb-5`}
    >
      <div className="flex flex-col w-full px-5 gap-10">
        <div className="flex items-center justify-center w-full duration-300 flex-row">
          <PrimaryInput
            text={inputText}
            type={PrimaryInputTypes.SEARCH}
            handleOnChange={setInputText}
            placeholder="Digite o nome do jogo..."
          />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className="flex justify-center w-full h-[40em]">
            {filteredBoardGames.length === 0 ? (
              <ErrorMessage
                title="404"
                message="Oops! Por algum motivo não foi possível encontrar o catálogo de jogos..."
              />
            ) : (
              <div
                className={`grid grid-cols-1 gap-10
            md:grid md:grid-cols-2
            xl:grid xl:grid-cols-3
            2xl:grid 2xl:grid-cols-4`}
              >
                {filteredBoardGames.map(
                  (boardgame: BoardGame, index: number) => (
                    <Card key={index} boardgame={boardgame} />
                  )
                )}
              </div>
            )}
          </div>
          <div className="pb-5" /> {/* This div adds space at the bottom */}
        </div>
      </div>
    </div>
  );
};
