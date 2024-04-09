import { IoMdClose } from "react-icons/io";
import { ActionButtonForm } from "../../action-button-form/action-button-form.component";

import { IBoardGameFormStepSaveGame } from "./step-save-game.interface";
import { PrimaryInput } from "@/app/components/primary-input/primary-input.component";
import { EnumPrimaryInputStyle, EnumPrimaryInputType } from "@/app/components/primary-input/primary-input.interface";
import { BoardGameDropdown } from "../../dropdown/dropdown.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";
import { boardgameStatus } from "../../../data/boardgame-status.data";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { ImageComponent } from "@/app/components/image/image.component";

export const BoardGameFormStepSaveGame = ({
    isLoading,
    boardgameData,
    handleCloseForm,
    handleSaveGame,
    handleReturnPreviousStep,
    handleOnChangeFields,
}: IBoardGameFormStepSaveGame) => {
    return (
        <>
            {/* action buttons */}
            <ActionButtonForm positionX="left-2" onClickIcon={handleReturnPreviousStep}>{<MdKeyboardDoubleArrowLeft size={25} />}</ActionButtonForm>
            <ActionButtonForm positionX="right-2" onClickIcon={handleCloseForm}>{<IoMdClose size={25} />}</ActionButtonForm>

            {/* game picture */}
            <div className="flex items-start justify-start w-1/2 ">
                    <ImageComponent enableOpacity height="100%" width="100%" image={boardgameData["image"]} alt={boardgameData["name"]} />
            </div>

            {/* game's name */}
            <div className="w-full">
                <PrimaryInput text="Nome" placeholder={"Digite o nome do jogo"}
                    handleOnChange={(event) => handleOnChangeFields("name", event)}
                    style={EnumPrimaryInputStyle.PRIMARY}
                    value={boardgameData["name"]}
                    type={EnumPrimaryInputType.TEXT} />
            </div>

            {/* game's price */}
            <div className="w-full">
                <PrimaryInput handleOnChange={(event) => handleOnChangeFields("price", event)} text="Preço" placeholder={"Digite o preço do jogo"}
                    value={boardgameData["price"]}
                    style={EnumPrimaryInputStyle.PRIMARY}
                    type={EnumPrimaryInputType.NUMBER} />
            </div>

            {/* game's status */}
            <div className={`flex justify-start items-start gap-3 flex-col w-full mb-4`}>
                <p className="text-gray-400">SITUAÇÃO</p>
                <BoardGameDropdown statusList={boardgameStatus} boardgameStatus={boardgameData["status"]}
                    handleOnChangeFields={(field, value) => handleOnChangeFields(field, value)}
                />
            </div>

            {/* game's button */}
            <PrimaryButton isLoading={isLoading} onClick={handleSaveGame} text="SALVAR" type={EnumPrimaryButton.OUTLINED} />
        </>
    );
}