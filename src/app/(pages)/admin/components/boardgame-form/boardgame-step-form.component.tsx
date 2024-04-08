"use client"

import React from "react";
import { EnumBoardGameFormAnimation, EnumBoardGameFormSteps, IBoardGameStepForm } from "./boardgame-step-form.interface";
import { BoardGameFormStepSaveId } from "./components/boardgame-form-steps/step-save-id/step-save-id.component";
import { BoardGameFormStepSaveGame } from "./components/boardgame-form-steps/step-save-game/step-save-game.component";
import { toast } from "react-toastify";
import { iGameApiData } from "../../interfaces/game-api-data.interface";
import { IBoardGame } from "@/interfaces/boardgame.interface";
import { generatePreviewBoardgame } from "../../services/generate-preview-boardgame";
import { createBoardGame } from "@/app/services/create-boardgame";
import { OverlayBackground } from "@/app/components/overlay-background/overlay-background.component";

export const BoardGameStepForm = ({ visibility, handleVisibility }: IBoardGameStepForm) => {
    const [gameApiData, setGameApiData] = React.useState<iGameApiData>({
        id: "",
        image: "",
        name: "",
        price: "",
        ageToPlay: "",
        description: "",
        playTime: "",
        maximumPlayersToPlay: "",
        minimumPlayersToPlay: "",
        status: "Disponível",
    });

    // save to the database
    const [boardgame] = React.useState<IBoardGame>({
        image: "",
        name: "",
        price: "",
        ageToPlay: "",
        description: "",
        playTime: "",
        maximumPlayersToPlay: "",
        minimumPlayersToPlay: "",
        status: "Disponível",
    });

    const [animation, setAnimation] = React.useState<EnumBoardGameFormAnimation>(EnumBoardGameFormAnimation.ANIMATION_JUMP_IN);
    const [step, setStep] = React.useState<EnumBoardGameFormSteps>(EnumBoardGameFormSteps.SEARCH_ID_STEP);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleCloseForm = () => {
        setAnimation(EnumBoardGameFormAnimation.ANIMATION_JUMP_OUT);
        setTimeout(() => {
            setStep(EnumBoardGameFormSteps.SEARCH_ID_STEP);
            setAnimation(EnumBoardGameFormAnimation.ANIMATION_JUMP_IN);
            handleVisibility(false);
            setGameApiData({ ...gameApiData, id: "" });
        }, 600);
    };

    const handleNextStep = async () => {
        setIsLoading(true);
        try {
            await generatePreviewBoardgame(gameApiData.id, setGameApiData);
            setStep(EnumBoardGameFormSteps.SAVE_GAME_FORM_STEP);
        } catch {
            toast.error("JOGO NÃO ENCONTRADO");
            setIsLoading(false);
            return;
        };
        setIsLoading(false);
        return;
    };

    const handleReturnPreviousStep = () => {
        setStep(EnumBoardGameFormSteps.SEARCH_ID_STEP);
        setGameApiData({ ...gameApiData, id: "" });
        return;
    };

    const handleSaveGame = async () => {
        setIsLoading(true);
        try {
            if (!gameApiData.name || !gameApiData.price) {
                toast.warn("Não é possível salvar as informações com campos vazios!");
                setIsLoading(false);
                return;
            } else {
                await createBoardGame({
                    ...boardgame,
                    ...gameApiData,
                })
                handleCloseForm();
                toast.success("O JOGO FOI SALVO COM SUCESSO!");
                return;
            }
        } catch {
            toast.error("NÃO FOI POSSÍVEL SALVAR O JOGO");
        }
        setIsLoading(false);
        return;
    };

    const handleOnChangeFields = (field: string, event: React.ChangeEvent<HTMLInputElement> | string) => {
        typeof event === "string"
            ?
            setGameApiData((prevState) => ({ ...prevState, [field]: event }))
            :
            setGameApiData((prevState) => ({ ...prevState, [field]: event.target.value }));
    };

    const stepsObjectBoardGameForm: { [key: string]: React.ReactNode } = {
        [EnumBoardGameFormSteps.SEARCH_ID_STEP]: <BoardGameFormStepSaveId
            handleCloseForm={handleCloseForm}
            handleNextStep={handleNextStep}
            writeGameId={gameApiData.id}
            handleOnChangeFields={handleOnChangeFields}
            isLoading={isLoading}
        />,

        [EnumBoardGameFormSteps.SAVE_GAME_FORM_STEP]: <BoardGameFormStepSaveGame
            isLoading={isLoading}
            handleCloseForm={handleCloseForm}
            handleReturnPreviousStep={handleReturnPreviousStep}
            handleSaveGame={handleSaveGame}
            handleOnChangeFields={handleOnChangeFields}
            boardgameData={gameApiData}
        />
    };
    return <>
        {
            visibility &&
            <>
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                    <OverlayBackground onClick={handleCloseForm} />
                    <div className={`z-50 rounded flex flex-col items-center justify-center gap-6 bg-white py-10 h-auto w-96 duration-300 ${animation} text-gray-500
                    max-[450px]:w-[85.33%]
                    `}>
                        {stepsObjectBoardGameForm[step]}
                    </div>
                </div>
            </>
        }
    </>
};