import React from "react";
import { ActionModalType } from "../action-modal.component";
import { Animations } from "@/app/common/types/animations.enum";
import { useContext } from "@/app/common/context/context";
import { PrimaryButtonTypes } from "../../buttons";

export const useActionModal = () => {
  const [animation, setAnimation] = React.useState<string>(
    Animations.ANIMATION_JUMP_IN
  );
  const { isVisible, setIsVisible } = useContext();

  const modalMessage: Record<ActionModalType, string> = {
    [ActionModalType.LOGOUT]: "Tem certeza que deseja sair?",
    [ActionModalType.DELETE_BOARDGAME]: "Tem certeza? Essa ação é irreversível",
    [ActionModalType.UPDATE_RENTAL]:
      "Tem certeza? O jogo foi realmente entregue?",
  };

  const buttonLabel: Record<ActionModalType, string> = {
    [ActionModalType.LOGOUT]: "Desconectar",
    [ActionModalType.DELETE_BOARDGAME]: "Deletar",
    [ActionModalType.UPDATE_RENTAL]: "Atualizar",
  };

  const buttonType: Record<ActionModalType, PrimaryButtonTypes> = {
    [ActionModalType.LOGOUT]: PrimaryButtonTypes.ALERT,
    [ActionModalType.DELETE_BOARDGAME]: PrimaryButtonTypes.DELETE,
    [ActionModalType.UPDATE_RENTAL]: PrimaryButtonTypes.ALERT,
  };

  const alertColor: Record<ActionModalType, string> = {
    [ActionModalType.LOGOUT]: "text-alert",
    [ActionModalType.DELETE_BOARDGAME]: "text-error",
    [ActionModalType.UPDATE_RENTAL]: "text-alert",
  };

  const visibilityMap: Record<ActionModalType, keyof typeof isVisible> = {
    [ActionModalType.LOGOUT]: "logout",
    [ActionModalType.DELETE_BOARDGAME]: "deleteBoardGame",
    [ActionModalType.UPDATE_RENTAL]: "updateRentalStatus",
  };

  return {
    animation,
    isVisible,
    modalMessage,
    buttonLabel,
    buttonType,
    alertColor,
    visibilityMap,
    setAnimation,
    setIsVisible,
  };
};
