import React from "react";
import { useContext } from "@/app/common/context/context";
import { useIsLoading } from "@/app/common/hooks/is-loading.hook";
import { toast } from "react-toastify";
import { boardGamesService } from "@/app/common/services/boardgames.service";
import { CardStatus } from "../../../card/types/card.types";
import { useMediaQuery } from "@react-hook/media-query";
import { handleAnimationClose } from "@/app/common/utils/handle-animation-close";
import { Animations } from "@/app/common/types/animations.enum";
import { generatePreviewBoardgame } from "@/app/(admin)/admin/services/generate-preview-boardgame";
import { BoardGameFormSteps } from "../boardgame-form.component";

export const useBoardGameForm = ({
  handleCloseForm,
}: {
  handleCloseForm?: () => void;
}) => {
  const { boardgame, setBoardGame, isVisible, setIsVisible } = useContext();
  const [animation, setAnimation] = React.useState<string>(
    Animations.ANIMATION_JUMP_IN
  );
  const { isLoading, setIsLoading } = useIsLoading();

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

  const dropdownContent = React.useMemo(() => {
    const boardgameStatus = [
      CardStatus.FIXED_COPY,
      CardStatus.RESERVED,
      CardStatus.QUARANTINE,
      CardStatus.UNAVAILABLE,
      CardStatus.MAINTENANCE,
      CardStatus.RENT,
      CardStatus.AVAILABLE,
    ];
    return boardgameStatus.map((chosenStatus: string, index: number) => (
      <li
        key={index}
        className="select-none w-full flex items-center gap-2 px-4 cursor-pointer duration-200 hover:bg-primary hover:rounded hover:text-white py-2"
        onDragStart={(event) => event.preventDefault()}
        onClick={() => {
          handleOnChangeFields("status", chosenStatus);
          setIsVisible({ ...isVisible, dropdown: false });
        }}
      >
        <p className="text-base font-medium">{chosenStatus}</p>
      </li>
    ));
  }, [isVisible, setIsVisible, handleOnChangeFields]);

  const [step, setStep] = React.useState<BoardGameFormSteps>(
    BoardGameFormSteps.SEARCH_ID_STEP
  );

  const handleNextStep = async () => {
    setIsLoading(true);
    try {
      await generatePreviewBoardgame(boardgame.id, setBoardGame);

      setStep(BoardGameFormSteps.SAVE_GAME_FORM_STEP);
    } catch {
      toast.error("JOGO NÃO ENCONTRADO");
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    return;
  };

  const handleReturnPreviousStep = () => {
    setStep(BoardGameFormSteps.SEARCH_ID_STEP);
    setBoardGame({ ...boardgame, id: "" });
    return;
  };

  const closeForm = () => {
    handleAnimationClose({
      isVisible,
      setIsVisible,
      setAnimation,
      handleReturnPreviousStep,
    });
  };

  const isSmallHeight = useMediaQuery("only screen and (max-height: 550px)");

  const handleSaveGame = async () => {
    setIsLoading(true);
    try {
      if (!boardgame.name || !boardgame.price) {
        toast.warn("Não é possível salvar as informações com campos vazios!");
        setIsLoading(false);
        return;
      } else {
        await boardGamesService.create({
          ...boardgame,
        });
        handleCloseForm && handleCloseForm();
        toast.success("O JOGO FOI SALVO COM SUCESSO!");
        setIsLoading(false);
        return;
      }
    } catch {
      toast.error("NÃO FOI POSSÍVEL SALVAR O JOGO");
    }
    setIsLoading(false);
    return;
  };

  const handleUpdateGame = async () => {
    setIsLoading(true);
    try {
      if (!boardgame.name || !boardgame.price) {
        toast.warn("Não é possível salvar as informações com campos vazios!");
        setIsLoading(false);
        return;
      } else {
        await boardGamesService.update({
          ...boardgame,
        });
        handleCloseForm && handleCloseForm();
        toast.success("O JOGO FOI ATUALIZADO COM SUCESSO!");
        setIsLoading(false);
        return;
      }
    } catch {
      toast.error("NÃO FOI POSSÍVEL SALVAR O JOGO");
    }
    setIsLoading(false);
    return;
  };

  return {
    boardgame,
    animation,
    isVisible,
    step,
    isLoading,
    dropdownContent,
    isSmallHeight,
    setAnimation,
    setIsVisible,
    handleNextStep,
    closeForm,
    handleOnChangeFields,
    handleReturnPreviousStep,
    handleSaveGame,
    handleUpdateGame,
  };
};
