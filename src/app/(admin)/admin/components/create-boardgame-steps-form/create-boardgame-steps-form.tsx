"use client"

import React from "react";
import { BoardGameStepForm } from "../boardgame-form/boardgame-step-form.component";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";

export const CreateBoardgameStepsForm = () => {
    const [isOpenBoardgameStepForms, setIsOpenBoardgameStepForms] = React.useState<boolean>(false);
    return <div className="flex items-center justify-center w-full sm:px-6">
            <BoardGameStepForm
                visibility={isOpenBoardgameStepForms}
                handleVisibility={setIsOpenBoardgameStepForms}
            />
        <div className="flex mt-[100px] w-52 sm:w-96 justify-center items-center">
            <PrimaryButton text="abrir formulário" onClick={() => setIsOpenBoardgameStepForms(true)} type={EnumPrimaryButton.PRIMARY} />
        </div>
    </div>
};