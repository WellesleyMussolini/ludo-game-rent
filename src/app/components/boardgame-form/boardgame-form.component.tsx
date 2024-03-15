"use client"

import React from "react";
import { EnumBoardGameFormAnimation, EnumBoardGameFormSteps, IBoardGameForm } from "./boardgame-form.interface";
import { BoardGameFormStepOne } from "./components/boardgame-form-steps/step-one/step-one.component";
import { BoardGameFormStepTwo } from "./components/boardgame-form-steps/step-two/step-two.component";

export const BoardGameForm = ({
    visibility,
    id,
    image,
    imageName,
    gameName,
    option,
    gamePrice,
    isLoading,
    handleId,
    handleName,
    handleOption,
    handlePrice,
    handleVisibility,
    handleGenerateCard,
}: IBoardGameForm) => { // UTILIZAR O INTERFACE NA PASTA INTERFACES AQUI
    const [animation, setAnimation] = React.useState<string>(EnumBoardGameFormAnimation.ANIMATION_JUMP_IN);
    const [step, setStep] = React.useState<EnumBoardGameFormSteps>(EnumBoardGameFormSteps.SEARCH_ID_STEP);

    const handleCloseForm = () => {
        setAnimation(EnumBoardGameFormAnimation.ANIMATION_JUMP_OUT);
        setTimeout(() => {
            setStep(EnumBoardGameFormSteps.SEARCH_ID_STEP);
            setAnimation(EnumBoardGameFormAnimation.ANIMATION_JUMP_IN);
            handleVisibility(false);
        }, 600);
    };

    const stepsObjectBoardGameForm: { [key: string]: React.ReactNode } = {
        [EnumBoardGameFormSteps.SEARCH_ID_STEP]: <BoardGameFormStepOne
            handleCloseForm={handleCloseForm}
            handleNextStep={async () => {
                await handleGenerateCard();
                setStep(EnumBoardGameFormSteps.SAVE_GAME_FORM_STEP);
            }}
            writeGameId={id}
            handleOnChangeId={handleId}
            isLoading={isLoading}
        />,
        [EnumBoardGameFormSteps.SAVE_GAME_FORM_STEP]: <BoardGameFormStepTwo
            boardgameImage={image}
            boardgameName={imageName}
            chooseGameOptions={option}
            handleChooseGameOptions={handleOption}
            handleCloseForm={handleCloseForm}
            handleReturnPreviousStep={() => setStep(EnumBoardGameFormSteps.SEARCH_ID_STEP)}
            handleNextStep={handleCloseForm}
            writeGameName={gameName}
            handleWriteGameName={handleName}
            writeGamePrice={gamePrice}
            handleWriteGamePrice={handlePrice}
        />
    };
    return <>
        {
            visibility &&
            <>
                <div className="fixed top-0 opacity-30 h-screen w-screen bg-black z-40"></div>
                <div className={`z-50 relative rounded flex flex-col items-center justify-center gap-6 bg-white py-10 h-auto w-96 duration-300 ${animation} text-gray-500`}>{stepsObjectBoardGameForm[step]}</div>
            </>
        }
    </>
};