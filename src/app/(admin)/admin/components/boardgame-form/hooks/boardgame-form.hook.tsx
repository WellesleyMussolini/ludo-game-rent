import React from "react";
import { iGameApiData } from "../../../interfaces/game-api-data.interface";
import { generatePreviewBoardgame } from "../../../services/generate-preview-boardgame";
import { toast } from "react-toastify";
import { useMediaQuery } from "@react-hook/media-query";
import { createBoardGame } from "@/app/common/services/create-boardgame.service";
import { BoardGame } from "@/app/common/types/boardgame.types";
import {
  BoardGameFormAnimation,
  BoardGameFormSteps,
} from "../types/boardgame-form.types";
import { boardgameStatus } from "../mock/boardgame-status.mock";

export const useBoardgameForm = (
  handleVisibility: (visibility: boolean) => void
) => {
  const [gameApiData, setGameApiData] = React.useState<iGameApiData>({
    id: "",
    image: "",
    name: "",
    price: "",
    ageToPlay: "",
    description: "",
    playTime: "",
    maximumPlayersToPlay: "",
    minimumPlayersToPlay: "",
    status: "Disponível",
  });

  // save to the database
  const [boardgame] = React.useState<BoardGame>({
    id: "",
    image: "",
    name: "",
    price: "",
    ageToPlay: "",
    description: "",
    playTime: "",
    maximumPlayersToPlay: "",
    minimumPlayersToPlay: "",
    status: "Disponível",
  });

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

  const handleNextStep = async () => {
    setFormStatus({ ...formStatus, isLoading: true });
    try {
      await generatePreviewBoardgame(gameApiData.id, setGameApiData);
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
    setGameApiData({ ...gameApiData, id: "" });
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
      handleVisibility(false);
    }, 600);
  };

  const handleSaveGame = async () => {
    setFormStatus({ ...formStatus, isLoading: true });
    try {
      if (!gameApiData.name || !gameApiData.price) {
        toast.warn("Não é possível salvar as informações com campos vazios!");
        setFormStatus({ ...formStatus, isLoading: false });
        return;
      } else {
        await createBoardGame({
          ...boardgame,
          ...gameApiData,
        });
        handleCloseForm();
        toast.success("O JOGO FOI SALVO COM SUCESSO!");
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
        ? setGameApiData((prevState) => ({ ...prevState, [field]: event }))
        : setGameApiData((prevState) => ({
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
    gameApiData,
    handleOnChangeFields,
    handleNextStep,
    handleReturnPreviousStep,
    handleSaveGame,
    formState,
    formStatus,
    setFormStatus,
    dropdownContent,
  };
};
