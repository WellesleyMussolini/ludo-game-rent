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
import { storeBoardGame } from "@/app/services/store-boardgame";

export default function Admin() {
    const { status } = useSession();
    const [openSidebar, setOpenSidebar] = React.useState<boolean>(false);
    const [successfulAlert, setSuccessfulAlert] = React.useState<boolean>(false);
    const [errorAlert, setErrorAlert] = React.useState<boolean>(false);
    const [formVisibility, setFormVisibility] = React.useState<boolean>(false);
    // console.log(status);


    // if (status !== "authenticated") return redirect("/admin/login"); SWITCH PAGE INSTANTLY BUT NEVER ACESS THE "/ADMIN" ROUTE
    // if (status === "unauthenticated") return redirect("/admin/login");
    // adicionar um token de logado para verificar no navegador do usuario se ele está conectado.

    const [card, setCard] = React.useState<any>(null);
    const [option, setOption] = React.useState<string>("Disponível");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [id, setId] = React.useState<string>("");
    const [name, setName] = React.useState<string>("");
    const [price, setPrice] = React.useState<string>("30");

    React.useEffect(() => {
        // checks if the name state has been updated
        if (card && card.boardgames && card.boardgames.boardgame && card.boardgames.boardgame.name) {
            const gameName = Array.isArray(card.boardgames.boardgame.name)
                ? card.boardgames.boardgame.name[0]._text
                : card.boardgames.boardgame.name._text;
            setName(gameName);
        };
        console.log(name);
        card;
    }, [card, name, price]);

    const clearInputFields = () => {
        setId("");
        setName("");
        setPrice("");
    };
    const generateGame = async () => {
        if (!id.trim()) return;
        setIsLoading(true);
        setCard(null);
        try {
            const response = await fetch(`https://thingproxy.freeboard.io/fetch/https://boardgamegeek.com/xmlapi/boardgame/${id}`);
            if (!response.ok) throw new Error('Network response was not ok');
            const xmlText = await response.text();
            const jsonData = JSON.parse(xmlJs.xml2json(xmlText, { compact: true, spaces: 2 }));

            // Customize the name here
            const defaultName = Array.isArray(jsonData.boardgames.boardgame.name)
                ? jsonData.boardgames.boardgame.name[0]._text
                : jsonData.boardgames.boardgame.name._text;

            setCard({ ...jsonData, name: name.trim() !== "" ? name : defaultName, price: price, option: option });

            setSuccessfulAlert(true);
            setFormVisibility(false);
        } catch {
            setErrorAlert(true);
            setFormVisibility(false);
        } finally {
            setIsLoading(false);
            clearInputFields();
            setSuccessfulAlert(false);
            setErrorAlert(false);
        }
    };

    const handleSaveOnDB = async () => {
        setIsLoading(true);
        try {
            await storeBoardGame(card.boardgames.boardgame.image._text, card.name, card.option, card.price);
            setSuccessfulAlert(true);
        } catch {
            setErrorAlert(true)
        }
        setSuccessfulAlert(false);
        setIsLoading(false);
        setCard(null);
    };


    return <div className={`flex items-center justify-center duration-300`} style={{ minHeight: "calc(100vh - 80px)" }}>
        <Sidebar openSidebar={openSidebar} handleOpenSidebar={setOpenSidebar} />
        <Alert message="JOGO ARMAZENADO COM SUCESSO!" type="success" visibility={successfulAlert} />
        <Alert message="ERROR AO SALVAR JOGO... :(" type="error" visibility={errorAlert} />
        <BoardGameForm
            isLoading={isLoading}

            // form fields
            id={id}
            option={option}

            // converter em objeto essas informações abaixo
            handleId={setId}
            handleName={setName}
            handlePrice={setPrice}
            handleOption={setOption}

            // alerts
            handleSuccessfulAlert={setSuccessfulAlert}
            handleErrorAlert={setErrorAlert}

            // form visibility
            visibility={formVisibility}
            handleVisibility={setFormVisibility}

            handleGenerateCard={generateGame}
        />
        <div className="fixed top-28 left-10">
            <PrimaryButton text="abrir formulário" handleClick={() => setFormVisibility(!formVisibility)} type={EnumPrimaryButton.PRIMARY} />
        </div>

        {
            card !== null && card.boardgames.boardgame.error ?
                <p className="text-xl text-gray-500">{"JOGO NÃO ENCONTRADO!"}</p>
                :
                <Card
                    image={card?.boardgames?.boardgame?.image?._text || ""}
                    isLoading={isLoading}
                    name={card?.name}
                    price={card?.price || price || "30"}
                    isEditing={true}
                    // NOME MAIS SUGESTIVO DA FUNÇÃO ABAIXO
                    // NAO UTILIZAR NOMES GENERICOS
                    handleSave={handleSaveOnDB}
                    // NOME MAIS SUGESTIVO DA FUNÇÃO ACIMA
                    handleDelete={() => setCard(null)}
                />
        }
    </div>
};