// "use server";
"use client";

import { Card } from "../card/card.component";
import { IBoardGame } from "@/types/boardgame.interface";
import { ErrorMessage } from "../error-message/error-message.component";
import { findAllBoardGames } from "@/services/find-all-boardgames.service";
import { PrimaryInput } from "../primary-input/primary-input.component";
import { EnumPrimaryInputType } from "../primary-input/primary-input.types";

export default async function BoardGameCatalogue() {
  try {
    return <div className={`flex items-center justify-center flex-wrap gap-10 pt-28 min-h-screen px-10`}>
      <PrimaryInput text="" placeholder="Digite seu nome" handleOnChange={() => {}} type={EnumPrimaryInputType.TEXT} />
      {/* {
        findAllBoardGames.map((boardgame: IBoardGame, index: number) => (
          <Card key={index} boardgame={boardgame} />
        ))
      } */}
    </div>
  } catch {
    return <div className="flex items-center justify-center pt-28 min-h-screen">
      <ErrorMessage
        title="404"
        message="Oops! Por algum motivo não foi possível encontrar o catálogo de jogos..."
      />
    </div>
  }
};