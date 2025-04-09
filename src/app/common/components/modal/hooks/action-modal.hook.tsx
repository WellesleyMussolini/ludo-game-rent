import { ActionModalType } from "../action-modal.component";
import { PrimaryButtonTypes } from "../../buttons";

export const useActionModal = (type: ActionModalType | null) => {
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
    [ActionModalType.REGISTER_USER_CPF]: {
      message: "Tem certeza? Essa ação é irreversível",
      buttonLabel: "Atualizar",
      buttonType: PrimaryButtonTypes.ALERT,
      alertColor: "text-alert",
    },
  };

  const config = type ? ACTION_MODAL_CONFIG[type] : null;
  return {
    actionModalConfig: config,
  };
};
