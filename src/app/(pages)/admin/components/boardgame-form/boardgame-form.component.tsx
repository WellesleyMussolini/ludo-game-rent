"use client"

import React from "react";
import { EnumBoardGameFormAnimation, EnumBoardGameFormSteps, IBoardGameForm } from "./boardgame-form.interface";
import { BoardGameFormStepSaveId } from "./components/boardgame-form-steps/step-save-id/step-save-id.component";
import { BoardGameFormStepSaveGame } from "./components/boardgame-form-steps/step-save-game/step-save-game.component";
import { toast } from "react-toastify";
import { iGameApiData } from "../../interfaces/game-api-data.interface";
import { isInputFieldEmpty } from "../../utils/is-input-field-empty";
import xmlJs from 'xml-js';
import { IBoardGame } from "@/interfaces/boardgame.interface";
import { handleSaveBoardGame } from "../../utils/handle-save-game";

export const BoardGameForm = ({ visibility, handleVisibility }: IBoardGameForm) => { // UTILIZAR O INTERFACE NA PASTA INTERFACES AQUI
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

    React.useEffect(() => { console.log(gameApiData) }, [gameApiData])
    const [animation, setAnimation] = React.useState<EnumBoardGameFormAnimation>(EnumBoardGameFormAnimation.ANIMATION_JUMP_IN);
    const [step, setStep] = React.useState<EnumBoardGameFormSteps>(EnumBoardGameFormSteps.SEARCH_ID_STEP);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const generatePreviewBoardgame = async (id: string) => {
        const response = await fetch(`https://thingproxy.freeboard.io/fetch/https://boardgamegeek.com/xmlapi/boardgame/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const xmlText = await response.text();
        const jsonData = JSON.parse(xmlJs.xml2json(xmlText, { compact: true, spaces: 2 }));

        // checks if the game data is from an array or an object
        const defaultName = Array.isArray(jsonData.boardgames.boardgame.name) ? jsonData.boardgames.boardgame.name[0]._text : jsonData.boardgames.boardgame.name._text;

        // access the image inside of the API
        const { _text } = jsonData.boardgames.boardgame.image;

        setGameApiData({
            id,
            image: _text,
            name: defaultName,
            price: isInputFieldEmpty("price", "30", gameApiData),
            status: isInputFieldEmpty("status", "Disponível", gameApiData),
        });
    };

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
                    await generatePreviewBoardgame(gameApiData.id)
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
            chooseGameStatus={gameApiData.status}
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
            writeGameName={gameApiData.name}
            handleOnChangeFields={handleOnChangeFields}
            writeGamePrice={gameApiData.price}
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