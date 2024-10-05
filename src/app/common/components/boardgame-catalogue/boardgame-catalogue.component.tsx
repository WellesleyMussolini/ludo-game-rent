"use client";

import React from "react";
import { Card } from "../card/card.component";
import { BoardGame } from "@/app/common/types/boardgame.types";
import { ErrorMessage } from "../error-message/error-message.component";
import { PrimaryInput, PrimaryInputTypes } from "../primary-input";
import { useContext } from "../../context/context";

export const BoardGameCatalogue = ({
  boardgames,
}: {
  boardgames: Array<BoardGame>;
}) => {
  const [inputText, setInputText] = React.useState<string>("");
  const { cart } = useContext();

  console.log(cart);

  const filteredBoardGames = inputText
    ? boardgames.filter((game) =>
        game.name.toLowerCase().includes(inputText.toLowerCase())
      )
    : boardgames;

  return (
    <div className="flex items-center justify-center flex-col gap-10 pt-28 pb-5">
      <div className="flex items-center justify-center w-full flex-row">
        <PrimaryInput
          text={inputText}
          type={PrimaryInputTypes.TEXT}
          handleOnChange={setInputText}
          placeholder="Digite o nome do jogo..."
        />
      </div>
      <div className="min-h-[40em] h-auto">
        {filteredBoardGames.length === 0 ? (
          <ErrorMessage
            title="404"
            message="Oops! Por algum motivo não foi possível encontrar o catálogo de jogos..."
          />
        ) : (
          <div
            className={`grid grid-cols-1 gap-10 
              sm:grid sm:grid-cols-2
              lg:grid lg:grid-cols-3
              xl:grid xl:grid-cols-4`}
          >
            {filteredBoardGames.map((boardgame: BoardGame, index: number) => (
              <Card key={index} boardgame={boardgame} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
