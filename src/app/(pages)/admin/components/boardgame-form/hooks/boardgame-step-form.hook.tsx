import React from "react";
import { iGameApiData } from "../../../interfaces/game-api-data.interface";
import { IBoardGame } from "@/types/boardgame.interface";
import { EnumBoardGameFormAnimation, EnumBoardGameFormSteps } from "../boardgame-step-form.interface";
import { generatePreviewBoardgame } from "../../../services/generate-preview-boardgame";
import { toast } from "react-toastify";
import { createBoardGame } from "@/app/services/create-boardgame";
import { BoardGameFormStepSaveId } from "../components/boardgame-form-steps/step-save-id/step-save-id.component";
import { BoardGameFormStepSaveGame } from "../components/boardgame-form-steps/step-save-game/step-save-game.component";
import { useMediaQuery } from "@react-hook/media-query";

export const useBoardgameStepForm = (handleVisibility: (visibility: boolean) => void) => {
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

    const isSmallHeight = useMediaQuery('only screen and (max-height: 550px)');

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

    return {
        animation,
        step,
        handleCloseForm,
        stepsObjectBoardGameForm,
        isSmallHeight
    };
};