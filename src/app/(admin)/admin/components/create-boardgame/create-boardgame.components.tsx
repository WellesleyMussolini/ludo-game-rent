"use client";

import React from "react";
import { BoardGameForm } from "../boardgame-form/boardgame-form.component";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import { useContext } from "@/app/common/context/context";

export const CreateBoardgame = () => {
  const { modals, setModals } = useContext();
  return (
    <div className="flex items-center justify-center w-full sm:px-6">
      <BoardGameForm />
      <div className="flex w-52 sm:w-96 justify-center items-center duration-300">
        <PrimaryButton
          text="abrir formulário"
          onClick={() => setModals({ ...modals, isFormVisible: true })}
          type={PrimaryButtonTypes.PRIMARY}
        />
      </div>
    </div>
  );
};
