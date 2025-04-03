import React from "react";
import Image from "next/image";
import { OverlayBackground } from "../../overlay-background/overlay-background.component";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { PrimaryInput, PrimaryInputTypes } from "../../primary-input";
import { PrimaryButton, PrimaryButtonTypes } from "../../buttons";
import { Dropdown } from "../../dropdown/dropdown.component";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { useBoardGameForm } from "./hooks/boardgame-form.hook";

export enum BoardGameFormType {
  CREATE = "create",
  UPDATE = "update",
}

export enum BoardGameFormSteps {
  SEARCH_ID_STEP = "searchId",
  SAVE_GAME_FORM_STEP = "saveGameForm",
}

const BoardGameFormSubmit = ({
  type,
  handleCloseForm,
  handleReturnPreviousStep,
}: {
  type: BoardGameFormType;
  handleCloseForm: () => void;
  handleReturnPreviousStep: () => void;
}) => {
  const {
    boardgame,
    isLoading,
    dropdownContent,
    handleOnChangeFields,
    handleSaveGame,
    handleUpdateGame,
    isSubmitButtonDisabled,
    isOpenDropdownStatus,
    setIsOpenDropdownStatus,
  } = useBoardGameForm({ handleCloseForm });

  return (
    <div className="h-96 w-full">
      {/* Close and Back Buttons */}
      <div className="flex justify-between cursor-pointer w-full">
        <div
          className={`absolute top-4 left-4 ${
            type === BoardGameFormType.UPDATE && "hidden"
          } text-gray-500 hover:text-gray-700`}
          onClick={handleReturnPreviousStep}
        >
          <MdKeyboardDoubleArrowLeft size={25} />
        </div>
        <div
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleCloseForm}
        >
          <IoMdClose size={25} />
        </div>
      </div>

      <div className="h-full px-4 overflow-y-auto">
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
            handleOnChange={(event) => handleOnChangeFields("name", event)}
            text={boardgame.name}
            label="Nome"
            type={PrimaryInputTypes.TEXT}
          />
        </div>

        {/* Price Input  */}
        <div className="w-full mb-4">
          <PrimaryInput
            handleOnChange={(event) => handleOnChangeFields("price", event)}
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
              handleOnChangeFields("availableCopies", event)
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
              handleOnChangeFields("rentalDurationDays", event)
            }
            text={boardgame.rentalDurationDays}
            placeholder="Digite os dias"
            type={PrimaryInputTypes.NUMBER}
            label="Duração do aluguel"
          />
        </div>

        {/* Dropdown for Game Status  */}
        <div className="w-full mb-6">
          <p className="text-gray-500 mb-2">Situação</p>
          <div className="relative">
            <div
              className={`flex justify-between items-center border border-gray-300 rounded px-4 py-2 cursor-pointer ${
                isOpenDropdownStatus ? "bg-gray-100" : "bg-white"
              }`}
              onClick={() => setIsOpenDropdownStatus((prev) => !prev)}
            >
              <p className="font-medium text-gray-700">
                {boardgame.status ?? "Selecione o status"}
              </p>
              <div>
                {isOpenDropdownStatus ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>

            {/* Dropdown Content  */}
            {isOpenDropdownStatus && (
              <div className="absolute w-full bg-white border border-gray-300 rounded mt-2 shadow-lg z-10">
                <Dropdown
                  styles="w-full"
                  visibility={isOpenDropdownStatus}
                  content={dropdownContent}
                />
              </div>
            )}
          </div>
        </div>
        {type === BoardGameFormType.CREATE && (
          <PrimaryButton
            isLoading={isLoading}
            onClick={handleSaveGame}
            text="salvar"
            type={isSubmitButtonDisabled}
          />
        )}
        {type === BoardGameFormType.UPDATE && (
          <PrimaryButton
            isLoading={isLoading}
            onClick={handleUpdateGame}
            text="atualizar"
            type={isSubmitButtonDisabled}
          />
        )}
      </div>
    </div>
  );
};

export const BoardGameForm = ({ type }: { type: BoardGameFormType }) => {
  const {
    boardgame,
    isLoading,
    step,
    animation,
    isVisible,
    handleOnChangeFields,
    handleNextStep,
    handleReturnPreviousStep,
    closeForm,
  } = useBoardGameForm({});
  return (
    (type === BoardGameFormType.UPDATE
      ? isVisible.updateBoardGame
      : isVisible.createBoardGame) && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <OverlayBackground onClose={closeForm} />
        <div
          className={`
              text-base
              z-50
              flex
              flex-col
              items-center
              justify-center
              bg-white
              rounded
              duration-300
              ${animation}
              text-gray-500
              max-[450px]:w-[85.33%]
              gap-3
              w-96
              overflow-y-auto
              ease-in-out
              scroll-smooth
              py-10
          `}
        >
          <div
            className={`${
              type === BoardGameFormType.UPDATE && "hidden"
            } w-full`}
          >
            {step === BoardGameFormSteps.SEARCH_ID_STEP && (
              <>
                <div
                  className={`z-10 absolute top-2 right-2 text-gray-500 hover:text-gray-600 cursor-pointer`}
                  onClick={closeForm}
                >
                  <IoMdClose size={25} />
                </div>
                <div className="flex px-4 flex-col gap-2">
                  <PrimaryInput
                    placeholder="Digite o id"
                    text={boardgame.id}
                    label="Pesquisar jogo"
                    handleOnChange={(event) =>
                      handleOnChangeFields("id", event)
                    }
                    type={PrimaryInputTypes.NUMBER}
                  />
                  <PrimaryButton
                    isLoading={isLoading}
                    onClick={handleNextStep}
                    text="avançar"
                    disabled={!boardgame.id}
                    type={
                      !boardgame.id
                        ? PrimaryButtonTypes.DISABLED
                        : PrimaryButtonTypes.OUTLINED
                    }
                  />
                </div>
              </>
            )}

            {step === BoardGameFormSteps.SAVE_GAME_FORM_STEP && (
              <BoardGameFormSubmit
                type={BoardGameFormType.CREATE}
                handleCloseForm={closeForm}
                handleReturnPreviousStep={handleReturnPreviousStep}
              />
            )}
          </div>

          <div
            className={`${
              type === BoardGameFormType.CREATE && "hidden"
            } w-full`}
          >
            <BoardGameFormSubmit
              type={BoardGameFormType.UPDATE}
              handleCloseForm={closeForm}
              handleReturnPreviousStep={handleReturnPreviousStep}
            />
          </div>
        </div>
      </div>
    )
  );
};
