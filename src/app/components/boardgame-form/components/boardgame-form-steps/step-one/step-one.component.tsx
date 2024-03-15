import { IoMdClose } from "react-icons/io";
import { ActionButtonForm } from "../../action-button-form/action-button-form.component";
import { IBoardGameFormStepOne } from "./step-one.interface";
import { PrimaryInput } from "@/app/components/primary-input/primary-input.component";
import { EnumPrimaryInputStyle, EnumPrimaryInputType } from "@/app/components/primary-input/primary-input.interface";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";

export const BoardGameFormStepOne = ({ isLoading, writeGameId, handleOnChangeId, handleCloseForm, handleNextStep }: IBoardGameFormStepOne) => (
    <>
        <ActionButtonForm positionX="right-2" children={<IoMdClose size={25} />} onClickIcon={handleCloseForm} />
        <div className="w-full px-10">
            <PrimaryInput style={EnumPrimaryInputStyle.SECONDARY} text="Insira o ID" htmlFor="id" id="id" handleOnChange={handleOnChangeId} type={EnumPrimaryInputType.NUMBER} />
        </div>
        <div className="w-full px-10">
            <PrimaryButton isLoading={isLoading} handleClick={handleNextStep} text="avançar" disabled={!writeGameId} type={!writeGameId ? EnumPrimaryButton.DISABLED : EnumPrimaryButton.OUTLINED} />
        </div>
    </>
)