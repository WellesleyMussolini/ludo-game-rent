import { IoMdClose } from "react-icons/io";
import { ActionButtonForm } from "../../action-button-form/action-button-form.component";

import { IBoardGameFormStepSaveGame } from "./step-save-game.interface";
import Image from "next/image";
import { PrimaryInput } from "@/app/components/primary-input/primary-input.component";
import { EnumPrimaryInputStyle, EnumPrimaryInputType } from "@/app/components/primary-input/primary-input.interface";
import { BoardGameDropdown } from "../../dropdown/dropdown.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";
import { boardGameOptions } from "../../../data/options.data";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export const BoardGameFormStepSaveGame = ({
    isLoading,
    boardgameImage,
    writeGameName,
    chooseGameOptions,
    handleChooseGameOptions,
    writeGamePrice,
    handleCloseForm,
    handleSaveGame,
    handleReturnPreviousStep,
    handleOnChangeFields,
}: IBoardGameFormStepSaveGame) => {
    return (
        <>
            <ActionButtonForm positionX="left-2" onClickIcon={handleReturnPreviousStep}>{<MdKeyboardDoubleArrowLeft size={25} />}</ActionButtonForm>
            <ActionButtonForm positionX="right-2" onClickIcon={handleCloseForm}>{<IoMdClose size={25} />}</ActionButtonForm>
            <div className="relative z-10 h-56 w-56">
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 z-10"></div>
                <Image
                    src={boardgameImage}
                    alt={writeGameName}
                    layout='fill'
                    objectFit='cover'
                    className="w-full h-full bg-center object-cover overflow-hidden select-none touch-none"
                />
            </div>
            <div className="w-full px-10">
                <PrimaryInput  text="Nome" placeholder={"Digite o nome do jogo"} 
                    handleOnChange={(event) => handleOnChangeFields("name", event)}
                    style={EnumPrimaryInputStyle.PRIMARY}
                    value={writeGameName}
                    type={EnumPrimaryInputType.TEXT} />
            </div>
            <div className="w-full px-10">
                <PrimaryInput handleOnChange={(event) => handleOnChangeFields("price", event)} text="Preço" placeholder={"Digite o preço do jogo"} value={writeGamePrice} 
                style={EnumPrimaryInputStyle.PRIMARY}
                type={EnumPrimaryInputType.NUMBER} />
            </div>
            <div className={`flex justify-start items-start gap-3 flex-col w-full px-11 `}>
                <p className="text-gray-400">SITUAÇÃO</p>
                <BoardGameDropdown options={boardGameOptions} boardGameSituation={chooseGameOptions} 
                handleBoardGameSituation={handleChooseGameOptions} 
                />
            </div>
            <div className="w-full px-10">
                <PrimaryButton isLoading={isLoading} handleClick={handleSaveGame} text="SALVAR" type={EnumPrimaryButton.OUTLINED} />
            </div>
        </>
    );
}