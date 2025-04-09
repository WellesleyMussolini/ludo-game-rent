import React from "react";
import { useContext } from "@/app/common/context/context";
import { toast } from "react-toastify";
import { boardGamesService } from "@/app/common/services/boardgames.service";
import { CardStatus } from "../../../card/boardgames/types/card.types";
import { handleAnimationCloseModal } from "@/app/common/utils/handle-animation-close";
import { Animations } from "@/app/common/types/animations.enum";
import { generatePreviewBoardgame } from "@/app/(admin)/admin/services/generate-preview-boardgame";
import { useRefetchQuery } from "@/app/common/hooks/refetch-query.hook";
import { useMutation } from "@tanstack/react-query";
import { PrimaryButtonTypes } from "../../../buttons";
import { PrimaryInput, PrimaryInputTypes } from "../../../primary-input";
import {
  BoardGameFormType,
  CreateOrUpdateBoardgameForm,
} from "../boardgame-form.component";

export const useBoardGameForm = ({
  type,
  handleVisibility,
}: {
  type?: BoardGameFormType;
  handleVisibility?: (visibility: boolean) => void;
}) => {
  const { boardgame, setBoardGame } = useContext();
  const [stepIndex, setStepIndex] = React.useState<number>(0);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState<boolean>(false);
  const [animation, setAnimation] = React.useState<string>(
    Animations.ANIMATION_JUMP_IN
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const { handleResetQuery } = useRefetchQuery();

  const isFormIncomplete =
    !boardgame.name ||
    !boardgame.price ||
    !boardgame.availableCopies ||
    !boardgame.rentalDurationDays;

  const numericId = React.useMemo(
    () =>
      boardgame.id
        .replace(/[^\d.]/g, "")
        .split(".")
        .slice(0, 2)
        .join("."),
    [boardgame.id]
  );

  const handleFieldChange = React.useCallback(
    (field: string, value: React.ChangeEvent<HTMLInputElement> | string) => {
      const newValue = typeof value === "string" ? value : value.target.value;
      setBoardGame((prev) => ({ ...prev, [field]: newValue }));
    },
    [setBoardGame]
  );

  const statusOptions = React.useMemo(
    () =>
      Object.values(CardStatus).map((status, i) => (
        <li
          key={i}
          className="select-none w-full flex items-center gap-2 px-4 cursor-pointer duration-200 hover:bg-primary hover:rounded hover:text-white py-2"
          onClick={() => {
            handleFieldChange("status", status);
            setIsDropdownOpen(false);
          }}
        >
          <p className="text-base font-medium">{status}</p>
        </li>
      )),
    [handleFieldChange]
  );

  const closeForm = () => {
    handleAnimationCloseModal({
      handleAnimation: setAnimation,
      handleModalVisibility: handleVisibility || (() => {}),
    });
    setTimeout(() => {
      setStepIndex(0);
      setBoardGame((prev) => ({ ...prev, id: "" }));
    }, 400);
  };

  const forms = React.useMemo(
    () => ({
      findById: (
        <PrimaryInput
          type={PrimaryInputTypes.TEXT}
          text={numericId}
          placeholder="Digite seu CPF..."
          label="Digite o CPF"
          handleOnChange={(e) => handleFieldChange("id", e)}
        />
      ),
      form: <CreateOrUpdateBoardgameForm />,
    }),
    [numericId, handleFieldChange]
  );

  const steps =
    type === BoardGameFormType.CREATE ? forms : { form: forms.form };
  const stepKeys = Object.keys(steps);
  const totalSteps = stepKeys.length;

  const handleNext = async () => {
    setIsLoading(true);
    try {
      await generatePreviewBoardgame(boardgame.id, setBoardGame);
      setStepIndex((prev) => Math.min(prev + 1, totalSteps - 1));
    } catch {
      toast.error("JOGO NÃO ENCONTRADO");
    }
    setIsLoading(false);
  };

  const getButtonType = () => {
    if (stepIndex === 0)
      return boardgame.id
        ? PrimaryButtonTypes.PRIMARY
        : PrimaryButtonTypes.DISABLED;

    if (isFormIncomplete) return PrimaryButtonTypes.DISABLED;

    return PrimaryButtonTypes.PRIMARY;
  };

  const handleBack = () => {
    setBoardGame((prev) => ({ ...prev, id: "" }));
    setStepIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSaveOrUpdate = async (
    mode: BoardGameFormType.CREATE | BoardGameFormType.UPDATE
  ) => {
    setIsLoading(true);
    if (isFormIncomplete) {
      toast.warn("Não é possível salvar as informações com campos vazios!");
      setIsLoading(false);
      return;
    }
    try {
      await boardGamesService[mode]({ ...boardgame });
      closeForm();
      toast.success(
        `O JOGO FOI ${mode === "create" ? "CRIADO" : "ATUALIZADO"} COM SUCESSO!`
      );
      handleResetQuery("boardgames");
    } catch {
      toast.error("NÃO FOI POSSÍVEL SALVAR O JOGO");
    }
    setIsLoading(false);
  };

  const { mutate: handleSaveGame } = useMutation({
    mutationKey: ["boardgames"],
    mutationFn: () => handleSaveOrUpdate(BoardGameFormType.CREATE),
  });

  const { mutate: handleUpdateGame } = useMutation({
    mutationKey: ["boardgames"],
    mutationFn: () => handleSaveOrUpdate(BoardGameFormType.UPDATE),
  });

  return {
    boardgame,
    isDropdownOpen,
    statusOptions,
    stepIndex,
    animation,
    isLoading,
    totalSteps,
    stepKeys,
    steps,
    handleFieldChange,
    setIsDropdownOpen,
    closeForm,
    handleSaveGame,
    handleNext,
    getButtonType,
    handleBack,
    handleUpdateGame,
  };
};
