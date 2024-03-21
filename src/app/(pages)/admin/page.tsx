"use client"

import React from "react";
import { useSession } from "next-auth/react";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";
import { Sidebar } from "@/app/layout/sidebar/sidebar.layout";
import xmlJs from 'xml-js';
import { IBoardGame } from "@/interfaces/boardgame.interface";
import { iGameApiData } from "./interfaces/game-api-data.interface";
import { createBoardGame } from "@/app/services/create-boardgame";
import { isInputFieldEmpty } from "./utils/is-input-field-empty";
import BoardGameCatalogue from "@/app/components/boardgame-catalogue/boardgame-catalogue.component";
import { handleInputChange } from "./utils/handle-input-change";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { BoardGameForm } from "./components/boardgame-form/boardgame-form.component";


// export const InputTest = ({ handleOnChange }: { handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => (
//     <input onChange={handleOnChange} placeholder="Digite Algo" />
// );

// const InputTest2 = ({ handleOnChangeField }: { handleOnChangeField: (field: string, event: React.ChangeEvent<HTMLInputElement>) => void }) => (
//     <InputTest handleOnChange={(event) => handleOnChangeField("name", event)} />
// );


export default function Admin() {
    // if (status !== "authenticated") return redirect("/admin/login"); SWITCH PAGE INSTANTLY BUT NEVER ACESS THE "/ADMIN" ROUTE
    // if (status === "unauthenticated") return redirect("/admin/login");
    // adicionar um token de logado para verificar no navegador do usuario se ele está conectado.
    const { status } = useSession();

    const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
    const [formVisibility, setFormVisibility] = React.useState<boolean>(false);

    // vai para o banco
    const [boardgame] = React.useState<IBoardGame>({
        image: "",
        name: "",
        price: "",
        situation: "Disponível",
    });

    const [gameApiData, setGameApiData] = React.useState<iGameApiData>({
        id: "",
        image: "",
        name: "",
        price: "",
        situation: "Disponível",
    });

    // const generatePreviewBoardgame = async (id: string) => {
    //     const response = await fetch(`https://thingproxy.freeboard.io/fetch/https://boardgamegeek.com/xmlapi/boardgame/${id}`);
    //     if (!response.ok) throw new Error('Network response was not ok');
    //     const xmlText = await response.text();
    //     const jsonData = JSON.parse(xmlJs.xml2json(xmlText, { compact: true, spaces: 2 }));

    //     // checks if the game data is from an array or an object
    //     const defaultName = Array.isArray(jsonData.boardgames.boardgame.name) ? jsonData.boardgames.boardgame.name[0]._text : jsonData.boardgames.boardgame.name._text;

    //     // access the image inside of the API
    //     const { _text } = jsonData.boardgames.boardgame.image;

    //     setGameApiData({
    //         id,
    //         image: _text,
    //         name: defaultName,
    //         price: isInputFieldEmpty("price", "30", gameApiData),
    //         situation: isInputFieldEmpty("situation", "Disponível", gameApiData),
    //     });
    // };

    // saves the boardgame in the database
    const handleSaveBoardGame = async () => await createBoardGame({
        ...boardgame,
        name: gameApiData.name,
        image: gameApiData.image,
        situation: gameApiData.situation,
        price: gameApiData.price
    });

    // const handleOnChangeFields = (event: any, handleState: any) => handleState((prevState: any) => ({ ...prevState, name: event.target.value }));



    const handleOnChangeFields = (field: string, event: React.ChangeEvent<HTMLInputElement>) => setGameApiData((prevState) => ({ ...prevState, [field]: event.target.value }));

    React.useEffect(() => { console.log(gameApiData) }, [gameApiData])


    return <div className={`flex items-center justify-center duration-300`} style={{ minHeight: "calc(100vh - 80px)" }}>
        <Sidebar openSidebar={openSidebar} handleOpenSidebar={setOpenSidebar} />
        <BoardGameForm
            option={gameApiData.situation}
            visibility={formVisibility}

            handleBoardgameOption={(event) => handleInputChange(event, "situation", setGameApiData)}

            handleVisibility={setFormVisibility}
            handleSaveGame={handleSaveBoardGame}
        />
        {/* <BoardGameCatalogue /> */}
        <div className="fixed top-28 left-10">
            <PrimaryButton text="abrir formulário" handleClick={() => setFormVisibility(true)} type={EnumPrimaryButton.PRIMARY} />
        </div>


        {/* <div> */}
            {/* <p>name: {gameApiData.name}</p> */}
            {/* <InputTest2 handleOnChangeField={handleOnChangeFields} /> */}
        {/* </div> */}

    </div>
};