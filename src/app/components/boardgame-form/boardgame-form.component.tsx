"use client"

import { storeBoardGame } from "@/app/services/store-boardgame";
import React, { useEffect, useState } from "react";
import xmlJs from 'xml-js';
import { Card } from "@/app/components/card/card.component";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../primary-button/primary-button.interface";
import { LoadingSpinner } from "../loading-spinner/loading-spinner.component";
import { Dropdown } from "../dropdown/dropdown.component";
import { SituationDropDown } from "./situation-dropdown/situation-dropdown.component";
import { IBoardGameForm } from "./boardgame-form.interface";
import { IoMdClose } from "react-icons/io";

export const BoardGameForm = ({ visibility, handleVisibility }: IBoardGameForm) => {
    const [successfulAlert, setSuccessfulAlert] = useState<boolean>(false);
    const [errorAlert, setErrorAlert] = useState<boolean>(false);
    const [boardGameData, setBoardGameData] = useState<any>(null);
    const [boardGameId, setBoardGameId] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [boardGameSituation, setBoardGameSituation] = useState<string>("Disponível");
    const [price, setPrice] = useState<string>("20");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const timeOut = React.useRef<NodeJS.Timeout>();

    const situations = ["Cópia Fixa", "Reservado", "Quarentena", "Indisponível", "Manutenção", "Alugado", "Disponível"];

    useEffect(() => {
        // checks if the name state has been updated
        if (boardGameData && boardGameData.boardgames && boardGameData.boardgames.boardgame && boardGameData.boardgames.boardgame.name) {
            const gameName = Array.isArray(boardGameData.boardgames.boardgame.name)
                ? boardGameData.boardgames.boardgame.name[0]._text
                : boardGameData.boardgames.boardgame.name._text;
            setName(gameName);
        }
    }, [boardGameData, name]);

    const clearInputFields = () => {
        setBoardGameId("");
        setName("");
        setPrice("");
    };

    const handleAlertVisibility = (visibility: boolean, handleVisibility: (visibility: boolean) => void) => {
        handleVisibility(true);
        if (!visibility) {
            if (timeOut.current) {
                clearTimeout(timeOut.current);
                handleVisibility(false);
            }
        } else {
            return timeOut.current = setTimeout(() => {
                handleVisibility(false);
            }, 5000);
        };
    };

    const fetchDataAndSave = async () => {
        if (!boardGameId.trim()) return;
        setIsLoading(true);
        try {
            const response = await fetch(`https://thingproxy.freeboard.io/fetch/https://boardgamegeek.com/xmlapi/boardgame/${boardGameId}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const xmlText = await response.text();
            const jsonData = JSON.parse(xmlJs.xml2json(xmlText, { compact: true, spaces: 2 }));

            setBoardGameData(jsonData);

            // checks if the boardgame's name is an array or not.
            const defaultName = Array.isArray(jsonData.boardgames.boardgame.name)
                ? jsonData.boardgames.boardgame.name[0]._text
                : jsonData.boardgames.boardgame.name._text;
            setName(name || defaultName); // Set name to the default value if it's empty

            // save to the DATABASE
            storeBoardGame(jsonData.boardgames.boardgame.image._text, name || defaultName, boardGameSituation, price);

            clearInputFields();
            handleAlertVisibility(successfulAlert, setSuccessfulAlert);
            handleVisibility(false);
        } catch {
            handleAlertVisibility(errorAlert, setErrorAlert);
            handleVisibility(false);
        };
        setIsLoading(false);
    };
    return (
        <>


            {
                visibility &&
                <>
                    {/* overlay */}
                    <div className="bg-black opacity-50 h-full w-full fixed top-0" onClick={() => handleVisibility(false)}></div>

                    <div className="absolute flex flex-col gap-10 items-center justify-center bg-white h-[30em] w-[30em] max-[600px]:w-[80%] animate-jump-in z-50" role="alert">
                        <div className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 cursor-pointer" onClick={() => handleVisibility(false)}><IoMdClose size={25} /></div>

                        {/* ID */}
                        <div className="relative group flex flex-col gap-1 w-[80%] h-10">
                            <input id="boardGameIdInput" type="number" required className="w-full h-full peer border-b-2 outline-none border-opacity-45 border-primary focus:border-opacity-100" value={boardGameId} onChange={(event) => setBoardGameId(event.target.value)} />
                            <label htmlFor="boardGameIdInput" className="cursor-text transform transition-all duration-300 ease-in-out text-gray-400 absolute top-0 left-0 h-full flex items-center group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Insira o ID</label>
                        </div>

                        {/* NAME */}
                        <div className="relative group flex flex-col gap-1 w-[80%]">
                            <input id="boardGameNameInput" onChange={(event) => setName(event.target.value)} required className="w-full h-10 peer border-b-2 outline-none border-opacity-45 border-primary focus:border-opacity-100" />
                            <label htmlFor="boardGameNameInput" className="cursor-text transform transition-all duration-300 ease-in-out text-gray-400 absolute top-0 left-0 h-full flex items-center group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Nome</label>
                        </div>

                        {/* SITUATION */}
                        <div className={`flex items-center justify-around w-full max-[568px]:w-[80%] max-[568px]:items-start gap-3  max-[568px]:flex-col max-[568px]:flex-col`}>
                            <p className="text-gray-400">SITUAÇÃO</p>
                            {/* use memo envolta */}
                            <SituationDropDown situations={situations} boardGameSituation={boardGameSituation} handleBoardGameSituation={setBoardGameSituation} />
                        </div>

                        {/* PRICE */}
                        <div className="relative group flex flex-col gap-1 w-[80%]">
                            <input onChange={(event) => setPrice(event.target.value)} id="boardGamePriceInput" type="number" required className="w-full h-10 peer border-b-2 outline-none border-opacity-45 border-primary focus:border-opacity-100" />
                            <label htmlFor="boardGamePriceInput" className="cursor-text transform transition-all duration-300 ease-in-out text-gray-400 absolute top-0 left-0 h-full flex items-center group-focus-within:text-xs peer-valid:text-xs group-focus-within:h-1/2 peer-valid:h-1/2 group-focus-within:-translate-y-full peer-valid:-translate-y-full group-focus-within:pl-0 peer-valid:pl-0">Preço</label>
                        </div>
                        <div className="w-[80%]">
                            <PrimaryButton isLoading={isLoading} disabled={!boardGameId} type={boardGameId ? EnumPrimaryButton.OUTLINED : EnumPrimaryButton.DISABLED} text="REGISTRAR" handleClick={fetchDataAndSave} />
                        </div>
                    </div>
                </>
            }
            {/* {(boardGameData && boardGameData.boardgames && boardGameData.boardgames.boardgame) && <Card image={boardGameData.boardgames.boardgame.image && boardGameData.boardgames.boardgame.image._text || "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"} />} */}
        </>
    );
};


// SEARCH
// const fetchData = async () => {
//     try {
//         const response = await fetch(`https://thingproxy.freeboard.io/fetch/https://boardgamegeek.com/xmlapi/boardgame/${boardGameId}`);
//         if (!response.ok) throw new Error('Network response was not ok');
//         const xmlText = await response.text();
//         const jsonData = xmlJs.xml2json(xmlText, { compact: true, spaces: 2 });
//         const parsedData = JSON.parse(jsonData);
//         setBoardGameData(parsedData);
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// };

// <button className=" bg-primary w-full text-white font-black h-10" onClick={fetchData}>SEARCH</button>