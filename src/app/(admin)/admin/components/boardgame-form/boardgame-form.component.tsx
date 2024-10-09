"use client";

import React from "react";
import { BoardGameFormSteps } from "./types/boardgame-form.types";
import { useBoardgameForm } from "./hooks/boardgame-form.hook";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { PrimaryInput } from "@/app/common/components/primary-input/primary-input.component";
import { PrimaryInputTypes } from "@/app/common/components/primary-input/primary-input.types";
import Image from "next/image";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { Dropdown } from "@/app/common/components/dropdown/dropdown.component";
import { OverlayBackground } from "@/app/common/components/overlay-background/overlay-background.component";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";

export const BoardGameForm = () => {
  const {
    modals,
    handleCloseForm,
    boardgame,
    isSmallHeight,
    handleOnChangeFields,
    handleNextStep,
    handleReturnPreviousStep,
    handleSaveGame,
    formState,
    formStatus,
    setFormStatus,
    dropdownContent,
  } = useBoardgameForm();
  return (
    modals.isFormVisible && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
        <OverlayBackground onClose={handleCloseForm} />
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
                ${formState.animation}
                text-gray-500
                max-[450px]:w-[85.33%]
                gap-3
                w-96
                py-10
                overflow-y-auto
                ease-in-out
                scroll-smooth
                ${
                  isSmallHeight &&
                  formState.formStep === BoardGameFormSteps.SAVE_GAME_FORM_STEP
                    ? "h-[90%]"
                    : "h-auto"
                }
            `}
        >
          {formState.formStep === BoardGameFormSteps.SEARCH_ID_STEP && (
            <>
              <div
                className={`z-10 absolute top-2 right-2 text-gray-500 hover:text-gray-600 cursor-pointer`}
                onClick={handleCloseForm}
              >
                <IoMdClose size={25} />
              </div>
              <div className="w-full">
                <PrimaryInput
                  placeholder="Digite o id..."
                  text={boardgame.id}
                  handleOnChange={(event) => handleOnChangeFields("id", event)}
                  type={PrimaryInputTypes.NUMBER}
                />
              </div>
              <div className="w-full">
                <PrimaryButton
                  isLoading={formStatus.isLoading}
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

          {formState.formStep === BoardGameFormSteps.SAVE_GAME_FORM_STEP && (
            <>
              {/* Close and Back Buttons */}
              <button
                className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
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
                  handleOnChange={(event) =>
                    handleOnChangeFields("name", event)
                  }
                  text={boardgame.name}
                  type={PrimaryInputTypes.TEXT}
                />
              </div>

              {/* Price Input */}
              <div className="w-full mb-4">
                <PrimaryInput
                  handleOnChange={(event) =>
                    handleOnChangeFields("price", event)
                  }
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
                      formStatus.dropdown ? "bg-gray-100" : "bg-white"
                    }`}
                    onClick={() =>
                      setFormStatus({
                        ...formStatus,
                        dropdown: !formStatus.dropdown,
                      })
                    }
                  >
                    <p className="font-medium text-gray-700">
                      {boardgame.status ?? "Selecione o status"}
                    </p>
                    <div>
                      {formStatus.dropdown ? (
                        <IoIosArrowUp />
                      ) : (
                        <IoIosArrowDown />
                      )}
                    </div>
                  </div>

                  {/* Dropdown Content */}
                  {formStatus.dropdown && (
                    <div className="absolute w-full bg-white border border-gray-300 rounded mt-2 shadow-lg z-10">
                      <Dropdown
                        styles="w-full"
                        visibility={formStatus.dropdown}
                        content={dropdownContent}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Save Button */}
              <PrimaryButton
                isLoading={formStatus.isLoading}
                onClick={handleSaveGame}
                text="Salvar"
                type={PrimaryButtonTypes.OUTLINED}
              />
            </>
          )}
        </div>
      </div>
    )
  );
};
