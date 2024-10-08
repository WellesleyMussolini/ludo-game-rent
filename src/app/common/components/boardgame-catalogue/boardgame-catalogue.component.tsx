"use client";

import React from "react";
import { Card } from "../card/card.component";
import { BoardGame } from "@/app/common/types/boardgame.types";
import { ErrorMessage } from "../error-message/error-message.component";
import { PrimaryInput, PrimaryInputTypes } from "../primary-input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Pathnames } from "../../types/pathnames.enum";
import { boardGamesService } from "../../services/boardgames.service";

export const BoardGameCatalogue = () => {
  const [boardgames, setBoardgames] = React.useState<Array<BoardGame>>([]);
  const [inputText, setInputText] = React.useState<string>("");
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = async (): Promise<void> => {
    const searchUrl = inputText.replace(/\s+/g, "-").toLowerCase(); // Use hyphens for the URL

    const searchQuery = inputText.toLowerCase(); // Convert hyphens back to spaces for backend search

    const result = await boardGamesService.getByName(searchQuery); // searchQuery with spaces

    setBoardgames(result as BoardGame[]);

    const url = `?boardgame=${searchUrl}`; // searchUrl with hyphens
    return router.push(url);
  };

  React.useEffect(() => {
    const fetchBoardGames = async () => {
      const boardgameQuery = searchParams.get("boardgame");

      if (boardgameQuery) {
        const searchQuery = boardgameQuery.replace(/-/g, " "); // Convert hyphens back to spaces for backend search

        const result = await boardGamesService.getByName(searchQuery); // searchQuery with spaces

        setBoardgames(result as BoardGame[]);
      } else {
        const result = await boardGamesService.get();
        setBoardgames(result);
      }
    };

    fetchBoardGames();
  }, [searchParams]);

  return (
    <div
      className={`flex items-center justify-center flex-col w-full gap-10 ${
        pathname === Pathnames.HOME ? "pt-28" : "pt-16"
      } `}
    >
      <div className="flex justify-center items-center flex-col w-full max-w-[1200px] px-5 gap-10">
        <PrimaryInput
          text={inputText}
          type={PrimaryInputTypes.SEARCH}
          handleOnChange={setInputText}
          handleOnSearch={handleSearch}
          placeholder="Digite o nome do jogo..."
        />
      </div>

      <div className="flex justify-center w-full max-w-[1160px] h-[40em]">
        {boardgames.length === 0 ? (
          <div className="w-full">
            <ErrorMessage
              title="NÃO ENCONTRADO"
              message="Oops! parece que o jogo inserido não existe"
            />
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-10
    md:grid md:grid-cols-2
    xl:grid xl:grid-cols-3
    2xl:grid 2xl:grid-cols-4`}
          >
            {boardgames.map((boardgame: BoardGame, index: number) => (
              <Card key={index} boardgame={boardgame} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
