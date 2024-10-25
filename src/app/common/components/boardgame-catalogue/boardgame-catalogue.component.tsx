"use client";

import React from "react";
import { Card } from "../card/boardgames/card.component";
import { BoardGame } from "@/app/common/types/boardgame.types";
import { ErrorMessage } from "../error-message/error-message.component";
import { PrimaryInput, PrimaryInputTypes } from "../primary-input";
import { Pathnames } from "../../types/pathnames.enum";
import { CardSkeleton } from "../card-skeleton/card-skeleton.component";
import { useBoardGameCatalogue } from "./hooks/boardgame-catalogue.hook";

export const BoardGameCatalogue = () => {
  const {
    searchQuery,
    setSearchQuery,
    pathname,
    handleSearch,
    boardgames,
    isLoading,
  } = useBoardGameCatalogue();
  return (
    <div
      className={`flex items-center justify-center flex-col w-full gap-10 ${
        pathname === Pathnames.HOME ? "pt-28" : "pt-16"
      } `}
    >
      <div className="flex justify-center items-center flex-col w-full max-w-[1200px] px-5 gap-10">
        <PrimaryInput
          handleOnChange={setSearchQuery}
          text={searchQuery}
          type={PrimaryInputTypes.SEARCH}
          handleOnSearch={handleSearch}
          placeholder="Digite o nome do jogo..."
        />
      </div>

      {boardgames && boardgames.length === 0 ? (
        <div className="w-full h-[40em]">
          <ErrorMessage
            title="NÃO ENCONTRADO"
            message="Oops! parece que o jogo inserido não existe"
          />
        </div>
      ) : (
        <div
          className={`grid grid-cols-1 gap-10 justify-items-center px-5
          md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 h-[40em]`}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : boardgames?.map((boardgame: BoardGame, index: number) => (
                <Card key={index} boardgame={boardgame} />
              ))}
        </div>
      )}
    </div>
  );
};
