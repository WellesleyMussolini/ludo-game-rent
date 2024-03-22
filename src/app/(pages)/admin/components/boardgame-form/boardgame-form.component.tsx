"use client"

import React from "react";
import { EnumBoardGameFormAnimation, EnumBoardGameFormSteps, IBoardGameForm } from "./boardgame-form.interface";
import { BoardGameFormStepSaveId } from "./components/boardgame-form-steps/step-save-id/step-save-id.component";
import { BoardGameFormStepSaveGame } from "./components/boardgame-form-steps/step-save-game/step-save-game.component";
import { toast } from "react-toastify";
import { iGameApiData } from "../../interfaces/game-api-data.interface";
import { IBoardGame } from "@/interfaces/boardgame.interface";
import { handleSaveBoardGame } from "../../utils/handle-save-game";
import { generatePreviewBoardgame } from "../../services/generate-preview-boardgame";

export const BoardGameForm = ({ visibility, handleVisibility }: IBoardGameForm) => { 
    const [gameApiData, setGameApiData] = React.useState<iGameApiData>({
        id: "",
        image: "",
        name: "",
        price: "",
        status: "Disponível",
    });

    // vai para o banco
    const [boardgame] = React.useState<IBoardGame>({
        image: "",
        name: "",
        price: "",
        status: "Disponível",
    });

    React.useEffect(() => { console.log(gameApiData) }, [gameApiData]);
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
            handleNextStep={async () => {
                setIsLoading(true);
                try {
                    await generatePreviewBoardgame(gameApiData.id, setGameApiData)
                    setStep(EnumBoardGameFormSteps.SAVE_GAME_FORM_STEP);
                } catch (error) {
                    toast.error("JOGO NÃO ENCONTRADO");
                    console.log(error)
                };
                setIsLoading(false);
            }}
            writeGameId={gameApiData.id}
            handleOnChangeFields={handleOnChangeFields}
            isLoading={isLoading}
        />,

        [EnumBoardGameFormSteps.SAVE_GAME_FORM_STEP]: <BoardGameFormStepSaveGame
            isLoading={isLoading}
            boardgameImage={gameApiData.image}
            boardgameName={gameApiData.name}
            handleCloseForm={handleCloseForm}
            handleReturnPreviousStep={() => {
                setStep(EnumBoardGameFormSteps.SEARCH_ID_STEP);
                setGameApiData({ ...gameApiData, id: "" });
            }}
            handleSaveGame={async () => {
                setIsLoading(true);
                try {
                    await handleSaveBoardGame(boardgame, gameApiData);
                    handleCloseForm();
                    toast.success("O JOGO FOI SALVO COM SUCESSO!");
                } catch {
                    toast.error("NÃO FOI POSSÍVEL SALVAR O JOGO");
                };
                setIsLoading(false);
            }}
            handleOnChangeFields={handleOnChangeFields}
            boardgameData={gameApiData}
        />
    };
    return <>
        {
            visibility &&
            <>
                <div className="fixed top-0 opacity-30 h-screen w-screen bg-black z-40" onClick={handleCloseForm}></div>
                <div className={`z-50 relative rounded flex flex-col items-center justify-center gap-6 bg-white py-10 h-auto w-96 duration-300 ${animation} text-gray-500`}>
                    {stepsObjectBoardGameForm[step]}
                </div>
            </>
        }
    </>
};