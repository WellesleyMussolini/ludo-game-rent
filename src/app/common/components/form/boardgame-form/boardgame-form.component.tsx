import React from "react";
import Image from "next/image";
import { OverlayBackground } from "../../overlay-background/overlay-background.component";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { PrimaryInput, PrimaryInputTypes } from "../../primary-input";
import { PrimaryButton, PrimaryButtonTypes } from "../../buttons";
import { Dropdown } from "../../dropdown/dropdown.component";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { CardStatus } from "../../card/types/card.types";
import { useBoardGameForm } from "./hooks/boardgame-form.hook";

export enum BoardGameFormType {
  CREATE = "create",
  UPDATE = "update",
}

export enum BoardGameFormSteps {
  SEARCH_ID_STEP = "searchId",
  SAVE_GAME_FORM_STEP = "saveGameForm",
}

const boardgameStatus = [
  CardStatus.FIXED_COPY,
  CardStatus.RESERVED,
  CardStatus.QUARANTINE,
  CardStatus.UNAVAILABLE,
  CardStatus.MAINTENANCE,
  CardStatus.RENT,
  CardStatus.AVAILABLE,
];

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
    isVisible,
    isLoading,
    dropdownContent,
    setIsVisible,
    handleOnChangeFields,
    handleSaveGame,
    handleUpdateGame,
  } = useBoardGameForm({ handleCloseForm });
  return (
    <>
      {/* Close and Back Buttons */}
      <button
        className={`absolute top-4 left-4 ${
          type === BoardGameFormType.UPDATE && "hidden"
        } text-gray-500 hover:text-gray-700`}
        onClick={handleReturnPreviousStep}
      >
        <MdKeyboardDoubleArrowLeft size={25} />
      </button>
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        onClick={handleCloseForm}
      >
        <IoMdClose size={25} />
      </button>

      {/* Game Image */}
      <div className="w-full flex justify-center items-center mb-4">
        <Image
          src={boardgame.image ?? ""}
          alt={boardgame.name ?? ""}
          height={60}
          width={60}
          className="rounded shadow-md"
        />
      </div>

      {/* Game Name Input */}
      <div className="w-full mb-4">
        <PrimaryInput
          placeholder="Digite o nome do jogo"
          handleOnChange={(event) => handleOnChangeFields("name", event)}
          text={boardgame.name}
          type={PrimaryInputTypes.TEXT}
        />
      </div>

      {/* Price Input */}
      <div className="w-full mb-4">
        <PrimaryInput
          handleOnChange={(event) => handleOnChangeFields("price", event)}
          text={boardgame.price}
          placeholder="Digite o preço do jogo"
          type={PrimaryInputTypes.NUMBER}
        />
      </div>

      {/* Dropdown for Game Status */}
      <div className="w-full mb-6">
        <p className="text-gray-500 mb-2">Situação</p>
        <div className="relative">
          <div
            className={`flex justify-between items-center border border-gray-300 rounded px-4 py-2 cursor-pointer ${
              isVisible.dropdown ? "bg-gray-100" : "bg-white"
            }`}
            onClick={() =>
              setIsVisible({
                ...isVisible,
                dropdown: !isVisible.dropdown,
              })
            }
          >
            <p className="font-medium text-gray-700">
              {boardgame.status ?? "Selecione o status"}
            </p>
            <div>
              {isVisible.dropdown ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>
          </div>

          {/* Dropdown Content */}
          {isVisible.dropdown && (
            <div className="absolute w-full bg-white border border-gray-300 rounded mt-2 shadow-lg z-10">
              <Dropdown
                styles="w-full"
                visibility={isVisible.dropdown}
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
          type={PrimaryButtonTypes.OUTLINED}
        />
      )}
      {type === BoardGameFormType.UPDATE && (
        <PrimaryButton
          isLoading={isLoading}
          onClick={handleUpdateGame}
          text="atualizar"
          type={PrimaryButtonTypes.OUTLINED}
        />
      )}
    </>
  );
};

export const BoardGameForm = ({ type }: { type: BoardGameFormType }) => {
  const {
    boardgame,
    isLoading,
    step,
    isSmallHeight,
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
              px-10
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
              py-10
              overflow-y-auto
              ease-in-out
              scroll-smooth
              ${
                isSmallHeight && step === BoardGameFormSteps.SAVE_GAME_FORM_STEP
                  ? "h-[90%]"
                  : "h-auto"
              }
          `}
        >
          <div className={`${type === BoardGameFormType.UPDATE && "hidden"}`}>
            {step === BoardGameFormSteps.SEARCH_ID_STEP && (
              <>
                <div
                  className={`z-10 absolute top-2 right-2 text-gray-500 hover:text-gray-600 cursor-pointer`}
                  onClick={closeForm}
                >
                  <IoMdClose size={25} />
                </div>
                <div className="w-full">
                  <PrimaryInput
                    placeholder="Digite o id..."
                    text={boardgame.id}
                    handleOnChange={(event) =>
                      handleOnChangeFields("id", event)
                    }
                    type={PrimaryInputTypes.NUMBER}
                  />
                </div>
                <div className="w-full">
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

          <div className={`${type === BoardGameFormType.CREATE && "hidden"}`}>
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
