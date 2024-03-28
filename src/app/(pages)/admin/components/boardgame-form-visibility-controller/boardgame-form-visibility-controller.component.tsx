"use client"

import React from "react";
import { BoardGameStepForm } from "../boardgame-form/boardgame-step-form.component";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";

export const BoardgameFormVisibilityController = () => {
    const [formVisibility, setFormVisibility] = React.useState<boolean>(false);
    return <div className="flex sm:inline items-center justify-center w-full sm:px-6 duration-300">
            <BoardGameStepForm
                visibility={formVisibility}
                handleVisibility={setFormVisibility}
            />
        <div className="flex mt-10 items-start max-[350px]:w-[77.14%] w-[270px]">
            <PrimaryButton text="abrir formulário" handleClick={() => setFormVisibility(true)} type={EnumPrimaryButton.PRIMARY} />
        </div>
    </div>
};