import { IoMdClose } from "react-icons/io";
import { ActionButtonForm } from "../../action-button-form/action-button-form.component";
import { IBoardGameFormStepSaveId } from "./step-save-id.interface";
import { PrimaryInput } from "@/app/components/primary-input/primary-input.component";
import {
  EnumPrimaryInputStyle,
  EnumPrimaryInputType,
} from "@/app/components/primary-input/primary-input.interface";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";

export const BoardGameFormStepSaveId = ({
  isLoading,
  writeGameId,
  handleOnChangeFields,
  handleCloseForm,
  handleNextStep,
}: IBoardGameFormStepSaveId) => (
  <>
    <ActionButtonForm positionX="right-2" onClickIcon={handleCloseForm}>
      {<IoMdClose size={25} />}
    </ActionButtonForm>
    <div className="w-full">
      <PrimaryInput
        style={EnumPrimaryInputStyle.SECONDARY}
        text="Insira o ID"
        htmlFor="id"
        id="id"
        handleOnChange={(event) => handleOnChangeFields("id", event)}
        type={EnumPrimaryInputType.NUMBER}
      />
    </div>
    <div className="w-full">
      <PrimaryButton
        isLoading={isLoading}
        onClick={handleNextStep}
        text="avançar"
        disabled={!writeGameId}
        type={
          !writeGameId ? EnumPrimaryButton.DISABLED : EnumPrimaryButton.OUTLINED
        }
      />
    </div>
  </>
);
