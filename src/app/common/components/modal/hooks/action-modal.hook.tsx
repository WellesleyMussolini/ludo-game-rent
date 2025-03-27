import React from "react";
import { ActionModalType } from "../action-modal.component";
import { Animations } from "@/app/common/types/animations.enum";
import { useContext } from "@/app/common/context/context";
import { PrimaryButtonTypes } from "../../buttons";
import { handleAnimationClose } from "@/app/common/utils/handle-animation-close";

export const useActionModal = (type: ActionModalType) => {
  const [animation, setAnimation] = React.useState<string>(
    Animations.ANIMATION_JUMP_IN
  );
  const { isVisible, setIsVisible } = useContext();

  const visibilityMap: Record<ActionModalType, keyof typeof isVisible> = {
    [ActionModalType.LOGOUT]: "logout",
    [ActionModalType.DELETE_BOARDGAME]: "deleteBoardGame",
    [ActionModalType.UPDATE_RENTAL]: "updateRentalStatus",
  };

  const ACTION_MODAL_CONFIG = {
    [ActionModalType.LOGOUT]: {
      message: "Tem certeza que deseja sair?",
      buttonLabel: "Desconectar",
      buttonType: PrimaryButtonTypes.ALERT,
      alertColor: "text-alert",
    },
    [ActionModalType.DELETE_BOARDGAME]: {
      message: "Tem certeza? Essa ação é irreversível",
      buttonLabel: "Deletar",
      buttonType: PrimaryButtonTypes.DELETE,
      alertColor: "text-error",
    },
    [ActionModalType.UPDATE_RENTAL]: {
      message: "Selecione o novo status do aluguel",
      buttonLabel: "Atualizar",
      buttonType: PrimaryButtonTypes.ALERT,
      alertColor: "text-alert",
    },
  };

  const closeModal = () =>
    handleAnimationClose({ isVisible, setIsVisible, setAnimation });

  const actionModalConfig = ACTION_MODAL_CONFIG[type];

  const isAlertPopup = !isVisible[visibilityMap[type]];

  return {
    animation,
    isAlertPopup,
    actionModalConfig,
    closeModal,
  };
};
