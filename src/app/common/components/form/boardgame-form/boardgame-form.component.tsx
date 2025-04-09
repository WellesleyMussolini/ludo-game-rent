import React from "react";
import { OverlayBackground } from "../../overlay-background/overlay-background.component";
import { useBoardGameForm } from "./hooks/boardgame-form.hook";
import { ModalStepper } from "../../modal-stepper/modal-stepper.component";
import Image from "next/image";
import { PrimaryInput, PrimaryInputTypes } from "../../primary-input";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Dropdown } from "../../dropdown/dropdown.component";

export enum BoardGameFormType {
  CREATE = "create",
  UPDATE = "update",
}

export const BoardGameForm = ({
  visibility,
  handleVisibility,
  type,
}: {
  visibility: boolean;
  handleVisibility: (visibility: boolean) => void;
  type: BoardGameFormType;
}) => {
  const {
    stepIndex,
    animation,
    isLoading,
    closeForm,
    handleSaveGame,
    handleNext,
    getButtonType,
    handleBack,
    handleUpdateGame,
    totalSteps,
    stepKeys,
    steps,
  } = useBoardGameForm({ type, handleVisibility });
  return (
    visibility && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <OverlayBackground onClose={closeForm} />
        <ModalStepper
          buttonType={getButtonType()}
          animation={animation}
          isLoading={isLoading}
          handleClose={closeForm}
          totalSteps={totalSteps}
          handleSubmit={
            type === BoardGameFormType.CREATE
              ? handleSaveGame
              : handleUpdateGame
          }
          currentStep={stepIndex}
          stepsKeys={stepKeys}
          stepsContent={steps}
          handleNextStep={handleNext}
          handlePreviousStep={handleBack}
        />
      </div>
    )
  );
};

export const CreateOrUpdateBoardgameForm = () => {
  const {
    boardgame,
    handleFieldChange,
    isDropdownOpen,
    setIsDropdownOpen,
    statusOptions,
  } = useBoardGameForm({});
  return (
    <div className="w-full">
      <div className="h-full px-4">
        {/* Game Image */}
        <div className="w-full flex justify-center items-center mb-4">
          <Image
            src={boardgame.image ?? ""}
            alt={boardgame.name ?? ""}
            height={0}
            width={0}
            className="rounded shadow-md w-52"
          />
        </div>

        {/* Game Name Input  */}
        <div className="w-full mb-4">
          <PrimaryInput
            placeholder="Digite o nome do jogo"
            handleOnChange={(event) => handleFieldChange("name", event)}
            text={boardgame.name}
            label="Nome"
            type={PrimaryInputTypes.TEXT}
          />
        </div>

        {/* Price Input  */}
        <div className="w-full mb-4">
          <PrimaryInput
            handleOnChange={(event) => handleFieldChange("price", event)}
            text={boardgame.price}
            placeholder="Digite o preço"
            label="Preço"
            type={PrimaryInputTypes.NUMBER}
          />
        </div>

        {/* Available Copies Input  */}
        <div className="w-full mb-4">
          <PrimaryInput
            handleOnChange={(event) =>
              handleFieldChange("availableCopies", event)
            }
            text={boardgame.availableCopies}
            placeholder="Digite o número de cópias"
            type={PrimaryInputTypes.NUMBER}
            label="Cópias disponíveis"
          />
        </div>

        {/* Rental Days Duration Input  */}
        <div className="w-full mb-4">
          <PrimaryInput
            handleOnChange={(event) =>
              handleFieldChange("rentalDurationDays", event)
            }
            text={boardgame.rentalDurationDays}
            placeholder="Digite os dias"
            type={PrimaryInputTypes.NUMBER}
            label="Duração do aluguel"
          />
        </div>

        {/* Dropdown for Game Status  */}
        <div className="w-full pb-6">
          <p className="text-gray-500 mb-2">Situação</p>
          <div className="relative">
            <div
              className={`flex justify-between items-center border border-gray-300 rounded px-4 py-2 cursor-pointer ${
                isDropdownOpen ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setIsDropdownOpen((prev) => !prev)}
            >
              <p className="font-medium text-gray-700">
                {boardgame.status ?? "Selecione o status"}
              </p>
              <div>
                {isDropdownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>

            {/* Dropdown Content  */}
            {isDropdownOpen && (
              <div className="absolute w-full bg-white border border-gray-300 rounded mt-2 shadow-lg z-10">
                <Dropdown
                  styles="w-full"
                  visibility={isDropdownOpen}
                  content={statusOptions}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
