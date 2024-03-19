"use client"

import React from "react";
import { EnumBoardGameFormAnimation, EnumBoardGameFormSteps, IBoardGameForm } from "./boardgame-form.interface";
import { BoardGameFormStepSaveId } from "./components/boardgame-form-steps/step-save-id/step-save-id.component";
import { BoardGameFormStepSaveGame } from "./components/boardgame-form-steps/step-save-game/step-save-game.component";

export const BoardGameForm = ({
    visibility,
    boardgameId,
    image,
    imageName,
    gameName,
    option,
    gamePrice,
    isLoading,
    handleBoardgameId,
    handleBoardgameName,
    handleBoardgameOption,
    handleBoardgamePrice,
    handleVisibility,
    handleGenerateCard,
    handleSaveGameInDB,
}: IBoardGameForm) => { // UTILIZAR O INTERFACE NA PASTA INTERFACES AQUI
    const [animation, setAnimation] = React.useState<string>(EnumBoardGameFormAnimation.ANIMATION_JUMP_IN);
    const [step, setStep] = React.useState<EnumBoardGameFormSteps>(EnumBoardGameFormSteps.SEARCH_ID_STEP);

    const handleCloseForm = () => {
        setAnimation(EnumBoardGameFormAnimation.ANIMATION_JUMP_OUT);
        setTimeout(() => {
            setStep(EnumBoardGameFormSteps.SEARCH_ID_STEP);
            setAnimation(EnumBoardGameFormAnimation.ANIMATION_JUMP_IN);
            handleVisibility(false);
            handleBoardgameId("");
        }, 600);
    };

    const stepsObjectBoardGameForm: { [key: string]: React.ReactNode } = {
        [EnumBoardGameFormSteps.SEARCH_ID_STEP]: <BoardGameFormStepSaveId
            handleCloseForm={handleCloseForm}
            handleNextStep={async () => {
                await handleGenerateCard();
                setStep(EnumBoardGameFormSteps.SAVE_GAME_FORM_STEP);
            }}
            writeGameId={boardgameId}
            handleOnChangeId={handleBoardgameId}
            isLoading={isLoading}
        />,
        [EnumBoardGameFormSteps.SAVE_GAME_FORM_STEP]: <BoardGameFormStepSaveGame
            isLoading={isLoading}
            boardgameImage={image}
            boardgameName={imageName}
            chooseGameOptions={option}
            handleChooseGameOptions={handleBoardgameOption}
            handleCloseForm={handleCloseForm}
            handleReturnPreviousStep={() => {
                setStep(EnumBoardGameFormSteps.SEARCH_ID_STEP);
                handleBoardgameId("");
            }}
            handleSaveGameInDB={async () => {
                await handleSaveGameInDB();
                handleCloseForm();
            }}
            writeGameName={gameName}
            handleWriteGameName={handleBoardgameName}
            writeGamePrice={gamePrice}
            handleWriteGamePrice={handleBoardgamePrice}
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