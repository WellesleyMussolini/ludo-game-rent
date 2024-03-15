"use client"

import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";
import { BoardGameForm } from "@/app/components/boardgame-form/boardgame-form.component";
import { Header } from "@/app/layout/header/header.layout";
import { EnumHeader } from "@/app/layout/header/header.interface";
import { Sidebar } from "@/app/layout/sidebar/sidebar.layout";
import { Alert } from "@/app/components/alert/alert.component";
import { Card } from "@/app/components/card/card.component";
import xmlJs from 'xml-js';
import { createBoardGame } from "@/app/services/create-boardgame";
import { IBoardGame } from "@/interfaces/boardgame.interface";
import { iGameApiData } from "./interfaces/game-api-data.interface";

export default function Admin() {
    const { status } = useSession();
    const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
    const [successfulAlert, setSuccessfulAlert] = React.useState<boolean>(false);
    const [errorAlert, setErrorAlert] = React.useState<boolean>(false);
    const [formVisibility, setFormVisibility] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    // vai para o banco
    const [boardgame, setBoardgame] = React.useState<IBoardGame>({
        image: "",
        name: "",
        price: "",
        situation: "Disponível",
    });

    const [gameApiData, setGameApiData] = React.useState<iGameApiData>({
        id: "",
        image: "",
        name: "",
        situation: "Disponível",
        price: "",
    });


    const isInputFieldEmpty = (event: keyof iGameApiData, defaultValue: string) => gameApiData[event].trim() !== "" ? gameApiData[event] : defaultValue;

    const generatePreviewBoardgame = async (id: string) => {
        setIsLoading(true);
        try {
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
                name: isInputFieldEmpty("name", defaultName),
                price: isInputFieldEmpty("price", "30"),
                situation: isInputFieldEmpty("situation", "Disponível"),
            });
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    };


    // saves the boardgame in the database
    const handleSaveBoardGameOnDB = async () => {
        setIsLoading(true);
        try {
            await createBoardGame({
                ...boardgame,
            });
            setSuccessfulAlert(true);
        } catch {
            setErrorAlert(true)
        }
        setSuccessfulAlert(false);
        setIsLoading(false);
    };

    const handleInputChange = (event: string, field: string) => setGameApiData((prevState) => ({ ...prevState, [field]: event }));


    React.useEffect(() => { console.log(gameApiData) }, [gameApiData]);

    return <div className={`flex items-center justify-center duration-300`} style={{ minHeight: "calc(100vh - 80px)" }}>
        <Sidebar openSidebar={openSidebar} handleOpenSidebar={setOpenSidebar} />
        <Alert message="JOGO ARMAZENADO COM SUCESSO!" type="success" visibility={successfulAlert} />
        <Alert message="ERROR AO SALVAR JOGO... :(" type="error" visibility={errorAlert} />
        <BoardGameForm
            image={gameApiData.image}
            imageName={gameApiData.name}
            gameName={gameApiData.name}
            gamePrice={gameApiData.price}
            // converter em um arquivo separado
            isLoading={isLoading}
            // converter em um arquivo separado
            id={gameApiData.id}
            option={gameApiData.situation}

            // converter em objeto essas informações abaixo

            handleId={(event) => handleInputChange(event, "id")}
            handleName={(event) => handleInputChange(event, "name")}
            handlePrice={(event) => handleInputChange(event, "price")}
            handleOption={(event) => handleInputChange(event, "situation")}

            // alerts
            handleSuccessfulAlert={setSuccessfulAlert}
            handleErrorAlert={setErrorAlert}

            // form visibility
            visibility={formVisibility}
            handleVisibility={setFormVisibility}

            handleGenerateCard={() => generatePreviewBoardgame(gameApiData.id)}
        />
        <div className="fixed top-28 left-10">
            <PrimaryButton text="abrir formulário" handleClick={() => setFormVisibility(true)} type={EnumPrimaryButton.PRIMARY} />
        </div>
    </div>
};

















// if (status !== "authenticated") return redirect("/admin/login"); SWITCH PAGE INSTANTLY BUT NEVER ACESS THE "/ADMIN" ROUTE
// if (status === "unauthenticated") return redirect("/admin/login");
// adicionar um token de logado para verificar no navegador do usuario se ele está conectado.

// const generatePreviewBoardgame = async () => {
//     setIsLoading(true);
//     try {
//         const response = await fetch(`https://thingproxy.freeboard.io/fetch/https://boardgamegeek.com/xmlapi/boardgame/${gameApiData.id}`);
//         if (!response.ok) throw new Error('Network response was not ok');
//         const xmlText = await response.text();
//         const jsonData = JSON.parse(xmlJs.xml2json(xmlText, { compact: true, spaces: 2 }));

//         // checks if the game data is from an array or an object
//         const defaultName = Array.isArray(jsonData.boardgames.boardgame.name)
//             ? jsonData.boardgames.boardgame.name[0]._text
//             : jsonData.boardgames.boardgame.name._text;

//         // acess the image inside of the API
//         const { _text } = jsonData.boardgames.boardgame.image;

//         setGameApiData({
//             id: gameApiData.id,
//             image: _text,
//             name: isInputFieldEmpty("name", defaultName),
//             price: isInputFieldEmpty("price", "30"),
//             situation: isInputFieldEmpty("situation", "Disponível")
//         });

//         setSuccessfulAlert(true);
//         setFormVisibility(false);
//     } catch {
//         setErrorAlert(true);
//         setFormVisibility(false);
//     } finally {
//         setIsLoading(false);
//         clearInputFields();
//         setSuccessfulAlert(false);
//         setErrorAlert(false);
//     }
// };
// const clearInputFields = () => {
//     setBoardgame({
//         image: "",
//         name: "",
//         price: "",
//         situation: "Disponível",
//     });
// };



// gameApiData.image && gameApiData.name && gameApiData.price &&
//     <Card
//         image={gameApiData.image}
//         name={gameApiData.name}
//         price={gameApiData.price}
//     />