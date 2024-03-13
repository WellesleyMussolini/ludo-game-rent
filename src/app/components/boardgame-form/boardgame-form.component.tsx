"use client"

import React from "react";
import { PrimaryButton } from "../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../primary-button/primary-button.interface";
import { BoardGameDropdown } from "./components/dropdown/dropdown.component";
import { EnumBoardGameFormSteps, IBoardGameForm } from "./boardgame-form.interface";
import { IoMdClose } from "react-icons/io";
import { PrimaryInput } from "../primary-input/primary-input.component";
import { EnumPrimaryInputStyle, EnumPrimaryInputType } from "../primary-input/primary-input.interface";
import { boardGameOptions } from "./data/options.data";
import Image from "next/image";
import { ActionButtonForm } from "./components/action-button-form/action-button-form.component";

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

    handleGenerateCard }: IBoardGameForm) => { // UTILIZAR O INTERFACE NA PASTA INTERFACES AQUI
    const [animation, setAnimation] = React.useState<string>("animate-jump-in");
    const [step, setStep] = React.useState<EnumBoardGameFormSteps>(EnumBoardGameFormSteps.SEARCH_ID_STEP);

    const handleCloseForm = () => {
        setAnimation("animate-jump-out");
        setTimeout(() => {
            setAnimation("animate-jump-in");
            handleVisibility(false);
        }, 600);
    };

    const stepsObjectBoardGameForm: { [key: string]: React.ReactNode } = {
        // COMPONENTE 1
        [EnumBoardGameFormSteps.SEARCH_ID_STEP]: <>
            <ActionButtonForm children={<IoMdClose size={25} />} onClickIcon={handleCloseForm} />
            <div className="w-full px-10">
                <PrimaryInput style={EnumPrimaryInputStyle.SECONDARY} text="Insira o ID" htmlFor="id" id="id" handleOnChange={handleId} type={EnumPrimaryInputType.NUMBER} />
            </div>
            <div className="w-full px-10">
                <PrimaryButton handleClick={() => {
                    handleGenerateCard();
                    setStep(EnumBoardGameFormSteps.SAVE_GAME_FORM_STEP);
                }} text="avançar" disabled={!id} type={!id ? EnumPrimaryButton.DISABLED : EnumPrimaryButton.OUTLINED} />

            </div>
        </>,
        // COMPONENTE 2
        [EnumBoardGameFormSteps.SAVE_GAME_FORM_STEP]: <>
            <ActionButtonForm children={<IoMdClose size={25} />} onClickIcon={() => setStep(EnumBoardGameFormSteps.SEARCH_ID_STEP)} />
            <div className="relative z-10 h-56 w-56">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>
                <Image
                    src={image}
                    alt={imageName}
                    layout='fill'
                    objectFit='cover'
                    className="w-full h-full bg-center object-cover overflow-hidden select-none touch-none"
                />
            </div>
            <div className="w-full px-10">
                <PrimaryInput style={EnumPrimaryInputStyle.PRIMARY} text="Nome" placeholder={gameName} handleOnChange={handleName} type={EnumPrimaryInputType.TEXT} />
            </div>
            <div className="w-full px-10">
                <PrimaryInput style={EnumPrimaryInputStyle.PRIMARY} text="Preço" placeholder={gamePrice} handleOnChange={handlePrice} type={EnumPrimaryInputType.NUMBER} />
            </div>
            <div className={`flex justify-start items-start gap-3 flex-col w-full px-11 `}>
                <p className="text-gray-400">SITUAÇÃO</p>
                <BoardGameDropdown options={boardGameOptions} boardGameSituation={option} handleBoardGameSituation={handleOption} />
            </div>
            <div className="w-full px-10">
                <PrimaryButton isLoading={isLoading} handleClick={() => {
                    setStep(EnumBoardGameFormSteps.SEARCH_ID_STEP);
                    handleCloseForm();
                }} text="SALVAR" type={EnumPrimaryButton.OUTLINED} />
            </div>
        </>
    };

    return <>
        {visibility &&
            <div className={`relative rounded flex flex-col items-center justify-center gap-6 bg-white py-10 h-auto w-96 duration-300 ${animation} text-gray-500`}>{stepsObjectBoardGameForm[step]}</div>
        }
    </>
};






//     <>
//     {
//         visibility &&
//         <>
//             {/* overlay */}
//             <div className="bg-black opacity-50 h-full w-full fixed top-0" onClick={() => handleVisibility(false)}></div>

//             <div className="text-gray-500 absolute flex flex-col gap-10 items-center justify-center bg-white h-[30em] w-[30em] max-[600px]:w-[80%] animate-jump-in z-50" role="alert">
//                 <div className="absolute top-2 right-2 text-gray-500 hover:text-gray-600 cursor-pointer" onClick={() => handleVisibility(false)}><IoMdClose size={25} /></div>

//                 {/* ID */}
//                 <div className="w-[80%]">
//                     <PrimaryInput handleOnChange={handleId} id="id" htmlFor="id" text="ID" placeholder="Digite o nome do jogo" type={EnumPrimaryInputType.TEXT} style={EnumPrimaryInputStyle.SECONDARY} />
//                 </div>

//                 {/* NAME */}
//                 <div className="w-[80%]">
//                     <PrimaryInput handleOnChange={handleName} id="name" htmlFor="name" text="Nome" placeholder="Digite o nome do jogo" type={EnumPrimaryInputType.TEXT} style={EnumPrimaryInputStyle.SECONDARY} />
//                 </div>

//                 {/* OPTIONS */}
//                 <div className={`flex items-center justify-around w-full max-[568px]:w-[80%] max-[568px]:items-start gap-3 max-[568px]:flex-col`}>
//                     <p className="text-gray-400">SITUAÇÃO</p>
//                     <BoardGameDropdown options={boardGameOptions} boardGameSituation={option} handleBoardGameSituation={handleOption} />
//                 </div>

//                 {/* PRICE */}
//                 <div className="w-[80%]">
//                     <PrimaryInput handleOnChange={handlePrice} id="price" htmlFor="price" text="Preço" placeholder="Insira um valor" type={EnumPrimaryInputType.NUMBER} style={EnumPrimaryInputStyle.SECONDARY} />
//                 </div>

//                 {/* SAVE INFORMATIONS */}
//                 <div className="w-[80%]">
//                     <PrimaryButton isLoading={isLoading} disabled={!id} type={id ? EnumPrimaryButton.OUTLINED : EnumPrimaryButton.DISABLED} text="REGISTRAR" handleClick={handleGenerateCard} />
//                 </div>
//             </div>
//         </>
//     }
// </>












// STEPS ICONS:

<div className="flex items-center justify-center  w-full">
    <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
        <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
            <svg className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
            </svg>
        </span>
    </li>
    <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
        <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
            </svg>
        </span>
    </li>
    <li className="flex items-center w-full">
        <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
            <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
            </svg>
        </span>
    </li>
</div>