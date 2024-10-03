"use server";

import { BoardGame } from "@/app/common/types/boardgame.types";
import { Card } from "../card/card.component";
import { ErrorMessage } from "../error-message/error-message.component";
import { findAllBoardGames } from "@/app/common/services/boardgames.service";

export const BoardGameCatalogue = () => {
  return (
    <>
      {findAllBoardGames.length === 0 ? (
        <ErrorMessage
          title="404"
          message="Oops! Por algum motivo não foi possível encontrar o catálogo de jogos..."
        />
      ) : (
        <div
          className={`
          grid grid-cols-1 gap-10 pt-28 
          sm:grid sm:grid-cols-2 
          lg:grid lg:grid-cols-3 
          xl:grid xl:grid-cols-4 
          `}
        >
          {findAllBoardGames.map((boardgame: BoardGame, index: number) => (
            <Card key={index} boardgame={boardgame} />
          ))}
        </div>
      )}
    </>
  );
};
