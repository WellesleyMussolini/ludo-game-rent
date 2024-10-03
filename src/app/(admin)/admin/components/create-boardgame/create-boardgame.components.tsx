"use client";

import React from "react";
import { BoardGameForm } from "../boardgame-form/boardgame-form.component";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/components/primary-button";

export const CreateBoardgame = () => {
  const [isOpenBoardgameStepForms, setIsOpenBoardgameStepForms] =
    React.useState<boolean>(false);
  return (
    <div className="flex items-center justify-center w-full sm:px-6">
      <BoardGameForm
        visibility={isOpenBoardgameStepForms}
        handleVisibility={setIsOpenBoardgameStepForms}
      />
      <div className="flex w-52 sm:w-96 justify-center items-center">
        <PrimaryButton
          text="abrir formulário"
          onClick={() => setIsOpenBoardgameStepForms(true)}
          type={PrimaryButtonTypes.PRIMARY}
        />
      </div>
    </div>
  );
};
