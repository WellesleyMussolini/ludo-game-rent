import { generatePreviewBoardgame } from "@/app/(admin)/admin/services/generate-preview-boardgame";
import { useContext } from "@/app/common/context/context";
import { boardGamesService } from "@/app/common/services/boardgames.service";
import { useMediaQuery } from "@react-hook/media-query";
import React from "react";
import { toast } from "react-toastify";
import { OverlayBackground } from "../../overlay-background/overlay-background.component";
import { IoIosArrowDown, IoIosArrowUp, IoMdClose } from "react-icons/io";
import { PrimaryInput, PrimaryInputTypes } from "../../primary-input";
import { PrimaryButton, PrimaryButtonTypes } from "../../buttons";
import Image from "next/image";
import { Dropdown } from "../../dropdown/dropdown.component";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { CardStatus } from "../../card/types/card.types";

export enum BoardGameFormType {
  CREATE = "create",
  UPDATE = "update",
}

enum BoardGameFormSteps {
  SEARCH_ID_STEP = "searchId",
  SAVE_GAME_FORM_STEP = "saveGameForm",
}

enum BoardGameFormAnimation {
  ANIMATION_JUMP_IN = "animate-jump-in",
  ANIMATION_JUMP_OUT = "animate-jump-out",
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

export const BoardGameForm = ({ type }: { type: BoardGameFormType }) => {
  const [formState, setFormState] = React.useState<{
    animation: string;
    formStep: string;
  }>({
    animation: BoardGameFormAnimation.ANIMATION_JUMP_IN,
    formStep: BoardGameFormSteps.SEARCH_ID_STEP,
  });

  const [formStatus, setFormStatus] = React.useState<{
    isLoading: boolean;
    dropdown: boolean;
  }>({
    isLoading: false,
    dropdown: false,
  });

  const { boardgame, setBoardGame, isVisible, setIsVisible } = useContext();

  const handleNextStep = async () => {
    setFormStatus({ ...formStatus, isLoading: true });
    try {
      await generatePreviewBoardgame(boardgame.id, setBoardGame);
      setFormState({
        ...formState,
        formStep: BoardGameFormSteps.SAVE_GAME_FORM_STEP,
      });
    } catch {
      toast.error("JOGO NÃO ENCONTRADO");
      setFormStatus({ ...formStatus, isLoading: false });
      return;
    }
    setFormStatus({ ...formStatus, isLoading: false });
    return;
  };

  const handleReturnPreviousStep = () => {
    setFormState({ ...formState, formStep: BoardGameFormSteps.SEARCH_ID_STEP });
    setBoardGame({ ...boardgame, id: "" });
    return;
  };

  const handleCloseForm = () => {
    setFormState({
      ...formState,
      animation: BoardGameFormAnimation.ANIMATION_JUMP_OUT,
    });
    setTimeout(() => {
      setFormState({
        ...formState,
        animation: BoardGameFormAnimation.ANIMATION_JUMP_IN,
      });
      handleReturnPreviousStep();
      setIsVisible({
        ...isVisible,
        updateBoardGame: false,
        createBoardGame: false,
      });
    }, 600);
  };

  const handleSaveGame = async () => {
    setFormStatus({ ...formStatus, isLoading: true });
    try {
      if (!boardgame.name || !boardgame.price) {
        toast.warn("Não é possível salvar as informações com campos vazios!");
        setFormStatus({ ...formStatus, isLoading: false });
        return;
      } else {
        await boardGamesService.create({
          ...boardgame,
        });
        handleCloseForm();
        toast.success("O JOGO FOI SALVO COM SUCESSO!");
        setFormStatus({ ...formStatus, isLoading: false });
        return;
      }
    } catch {
      toast.error("NÃO FOI POSSÍVEL SALVAR O JOGO");
    }
    setFormStatus({ ...formStatus, isLoading: false });
    return;
  };

  const handleOnChangeFields = React.useCallback(
    (field: string, event: React.ChangeEvent<HTMLInputElement> | string) => {
      typeof event === "string"
        ? setBoardGame((prevState) => ({ ...prevState, [field]: event }))
        : setBoardGame((prevState) => ({
            ...prevState,
            [field]: event.target.value,
          }));
    },
    []
  );

  const isSmallHeight = useMediaQuery("only screen and (max-height: 550px)");

  const dropdownContent = React.useMemo(() => {
    return boardgameStatus.map((chosenStatus: string, index: number) => (
      <li
        key={index}
        className="select-none w-full flex items-center gap-2 px-4 cursor-pointer duration-200 hover:bg-primary hover:rounded hover:text-white py-2"
        onDragStart={(event) => event.preventDefault()}
        onClick={() => {
          handleOnChangeFields("status", chosenStatus);
          setFormStatus({ ...formStatus, dropdown: false });
        }}
      >
        <p className="text-base font-medium">{chosenStatus}</p>
      </li>
    ));
  }, [formStatus, handleOnChangeFields]);

  const handleUpdateGame = async () => {
    setFormStatus({ ...formStatus, isLoading: true });
    try {
      if (!boardgame.name || !boardgame.price) {
        toast.warn("Não é possível salvar as informações com campos vazios!");
        setFormStatus({ ...formStatus, isLoading: false });
        return;
      } else {
        await boardGamesService.update({
          ...boardgame,
        });
        handleCloseForm();
        toast.success("O JOGO FOI ATUALIZADO COM SUCESSO!");
        setFormStatus({ ...formStatus, isLoading: false });
        return;
      }
    } catch {
      toast.error("NÃO FOI POSSÍVEL SALVAR O JOGO");
    }
    setFormStatus({ ...formStatus, isLoading: false });
    return;
  };

  return (
    (type === BoardGameFormType.UPDATE
      ? isVisible.updateBoardGame
      : isVisible.createBoardGame) && (
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
          <div className={`${type === BoardGameFormType.UPDATE && "hidden"}`}>
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
                    handleOnChange={(event) =>
                      handleOnChangeFields("id", event)
                    }
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

          <div className={`${type === BoardGameFormType.CREATE && "hidden"}`}>
            <div
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={handleCloseForm}
            >
              <IoMdClose size={25} />
            </div>
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
              onClick={handleUpdateGame}
              text="atualizar"
              type={PrimaryButtonTypes.OUTLINED}
            />
          </div>
        </div>
      </div>
    )
  );
};
