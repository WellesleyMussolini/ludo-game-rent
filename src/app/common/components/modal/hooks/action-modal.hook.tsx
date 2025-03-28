import { ActionModalType } from "../action-modal.component";
import { useContext } from "@/app/common/context/context";
import { PrimaryButtonTypes } from "../../buttons";

export const useActionModal = (type: ActionModalType) => {
  const { isVisible } = useContext();

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

  const actionModalConfig = ACTION_MODAL_CONFIG[type];

  const isAlertPopup = !isVisible[visibilityMap[type]];

  return {
    isAlertPopup,
    actionModalConfig,
  };
};
