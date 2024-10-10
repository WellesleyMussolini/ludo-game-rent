"use client";

import React from "react";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import { useContext } from "@/app/common/context/context";
import {
  BoardGameForm,
  BoardGameFormType,
} from "@/app/common/components/form/boardgame-form/boardgame-form.component";

export const CreateBoardgame = () => {
  const { isVisible, setIsVisible } = useContext();
  return (
    <div className="flex items-center justify-center w-full sm:px-6">
      <BoardGameForm type={BoardGameFormType.CREATE} />

      <div className="flex w-52 sm:w-96 justify-center items-center duration-300">
        <PrimaryButton
          text="abrir formulário"
          onClick={() => setIsVisible({ ...isVisible, createBoardGame: true })}
          type={PrimaryButtonTypes.PRIMARY}
        />
      </div>
    </div>
  );
};
