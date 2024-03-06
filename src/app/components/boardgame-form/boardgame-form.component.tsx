"use client"

import React, { useEffect, useState } from "react";
import { Card } from "@/app/components/card/card.component";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../primary-button/primary-button.interface";
import { LoadingSpinner } from "../loading-spinner/loading-spinner.component";
import { Dropdown } from "../dropdown/dropdown.component";
import { BoardGameDropdown } from "./dropdown/dropdown.component";
import { IBoardGameForm } from "./boardgame-form.interface";
import { IoMdClose } from "react-icons/io";
import { Alert } from "../alert/alert.component";
import { PrimaryInput } from "../primary-input/primary-input.component";
import { EnumPrimaryInputStyle, EnumPrimaryInputType } from "../primary-input/primary-input.interface";
import { boardGameOptions } from "./data/options.data";

export const BoardGameForm = ({ 
    visibility, 

    id,
    option,

    isLoading,

    handleId,
    handleName,
    handleOption,
    handlePrice,
    
    handleVisibility, 
    
    handleGenerateCard }: IBoardGameForm) => (
        <>
            {
                visibility &&
                <>
                    {/* overlay */}
                    <div className="bg-black opacity-50 h-full w-full fixed top-0" onClick={() => handleVisibility(false)}></div>

                    <div className="text-gray-500 absolute flex flex-col gap-10 items-center justify-center bg-white h-[30em] w-[30em] max-[600px]:w-[80%] animate-jump-in z-50" role="alert">
                        <div className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 cursor-pointer" onClick={() => handleVisibility(false)}><IoMdClose size={25} /></div>

                        {/* ID */}
                        <div className="w-[80%]">
                            <PrimaryInput handleOnChange={handleId} id="id" htmlFor="id" text="ID" placeholder="Digite o nome do jogo" type={EnumPrimaryInputType.TEXT} style={EnumPrimaryInputStyle.SECONDARY} />
                        </div>

                        {/* NAME */}
                        <div className="w-[80%]">
                            <PrimaryInput handleOnChange={handleName} id="name" htmlFor="name" text="Nome" placeholder="Digite o nome do jogo" type={EnumPrimaryInputType.TEXT} style={EnumPrimaryInputStyle.SECONDARY} />
                        </div>

                        {/* OPTIONS */}
                        <div className={`flex items-center justify-around w-full max-[568px]:w-[80%] max-[568px]:items-start gap-3 max-[568px]:flex-col`}>
                            <p className="text-gray-400">SITUAÇÃO</p>
                            <BoardGameDropdown options={boardGameOptions} boardGameSituation={option} handleBoardGameSituation={handleOption} />
                        </div>

                        {/* PRICE */}
                        <div className="w-[80%]">
                            <PrimaryInput handleOnChange={handlePrice} id="price" htmlFor="price" text="Preço" placeholder="Insira um valor" type={EnumPrimaryInputType.NUMBER} style={EnumPrimaryInputStyle.SECONDARY} />
                        </div>

                        {/* SAVE INFORMATIONS */}
                        <div className="w-[80%]">
                            <PrimaryButton isLoading={isLoading} disabled={!id} type={id ? EnumPrimaryButton.OUTLINED : EnumPrimaryButton.DISABLED} text="REGISTRAR" handleClick={handleGenerateCard} />
                        </div>
                    </div>
                </>
            }
        </>
    );