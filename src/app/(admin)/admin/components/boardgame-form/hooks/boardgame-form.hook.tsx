import React from "react";
import { generatePreviewBoardgame } from "../../../services/generate-preview-boardgame";
import { toast } from "react-toastify";
import { useMediaQuery } from "@react-hook/media-query";
import {
  BoardGameFormAnimation,
  BoardGameFormSteps,
} from "../types/boardgame-form.types";
import { boardgameStatus } from "../mock/boardgame-status.mock";
import { boardGamesService } from "@/app/common/services/boardgames.service";
import { useContext } from "@/app/common/context/context";

export const useBoardgameForm = () => {
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

  const { boardgame, setBoardGame, modals, setModals } = useContext();

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
      setModals({ ...modals, isFormVisible: false });
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

  return {
    handleCloseForm,
    isSmallHeight,
    boardgame,
    handleOnChangeFields,
    handleNextStep,
    handleReturnPreviousStep,
    handleSaveGame,
    formState,
    formStatus,
    setFormStatus,
    dropdownContent,
    modals,
    setModals,
  };
};
