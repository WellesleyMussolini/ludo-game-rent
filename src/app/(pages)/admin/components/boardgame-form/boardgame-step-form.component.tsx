"use client"

import React from "react";
import { IBoardGameStepForm } from "./boardgame-step-form.interface";
import { OverlayBackground } from "@/app/components/overlay-background/overlay-background.component";
import { useBoardgameStepForm } from "./hooks/boardgame-step-form.hook";

export const BoardGameStepForm = ({ visibility, handleVisibility }: IBoardGameStepForm) => {
    const { animation, step, stepsObjectBoardGameForm, isSmallHeight, handleCloseForm } = useBoardgameStepForm(handleVisibility);
    
    return visibility &&
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
            <OverlayBackground onClick={handleCloseForm} />
            <div className={`
                text-base 
                px-10 
                z-50 
                flex 
                flex-col 
                items-center 
                justify-center 
                bg-white 
                rounded 
                duration-300 
                ${animation} 
                text-gray-500
                max-[450px]:w-[85.33%]
                gap-3 
                w-96 
                py-10 
                overflow-y-auto
                ${isSmallHeight ? 'h-[90%]' : 'h-auto'}
            `}>
                {stepsObjectBoardGameForm[step]}
            </div>
        </div>
};