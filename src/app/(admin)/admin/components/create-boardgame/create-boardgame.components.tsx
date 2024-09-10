"use client"

import React from "react";
import { BoardGameForm } from "../boardgame-form/boardgame-form.component";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { PrimaryButtonStyles } from "@/app/components/primary-button/types/primary-button.types";

export const CreateBoardgame = () => {
    const [isOpenBoardgameStepForms, setIsOpenBoardgameStepForms] = React.useState<boolean>(false);
    return <div className="flex items-center justify-center w-full sm:px-6">
        <BoardGameForm
            visibility={isOpenBoardgameStepForms}
            handleVisibility={setIsOpenBoardgameStepForms}
        />
        <div className="flex mt-[100px] w-52 sm:w-96 justify-center items-center">
            <PrimaryButton text="abrir formulário" onClick={() => setIsOpenBoardgameStepForms(true)} type={PrimaryButtonStyles.PRIMARY} />
        </div>
    </div>
};