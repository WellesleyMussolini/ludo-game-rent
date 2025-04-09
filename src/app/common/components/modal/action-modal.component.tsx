"use client";

import React from "react";
import { sizeIcons } from "@/app/common/constants/size-icons";
import { GoAlertFill } from "react-icons/go";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import { OverlayBackground } from "../overlay-background/overlay-background.component";
import { useActionModal } from "./hooks/action-modal.hook";

export enum ActionModalType {
  LOGOUT = "logout",
  DELETE_BOARDGAME = "delete-boardgame",
  UPDATE_RENTAL = "update-rental",
  REGISTER_USER_CPF = "register-user-cpf",
}

export const ActionModal = ({
  type,
  visibility = false,
  animation,
  handleExecuteAction,
  isLoading,
  content,
  closeModal,
}: {
  visibility: boolean;
  animation: string;
  type: ActionModalType;
  handleExecuteAction: () => void;
  content?: JSX.Element;
  isLoading: boolean;
  closeModal: () => void;
}) => {
  const { actionModalConfig } = useActionModal(type);

  if (!visibility || !actionModalConfig) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <OverlayBackground onClose={closeModal} />
      <div
        className={`relative max-w-[400px] z-50 bg-white rounded-2xl border p-4 shadow-lg sm:p-6 lg:p-8 ${animation} animate-delay-[1ms]`}
        role="alert"
      >
        <div className="flex justify-center">
          <GoAlertFill
            className={actionModalConfig.alertColor}
            size={sizeIcons.larger}
          />
        </div>
        <p className="mt-4 text-gray-500 text-center">
          {actionModalConfig.message}
        </p>
        {content}
        <div className="mt-6 flex flex-wrap gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
          <PrimaryButton
            isLoading={isLoading}
            text={actionModalConfig.buttonLabel}
            onClick={() => {
              handleExecuteAction();
              closeModal();
            }}
            type={actionModalConfig.buttonType}
          />
          <PrimaryButton
            text="Cancelar"
            onClick={closeModal}
            type={PrimaryButtonTypes.SECONDARY}
          />
        </div>
      </div>
    </div>
  );
};
