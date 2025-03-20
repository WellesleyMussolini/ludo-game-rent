"use client";

import React from "react";
import { sizeIcons } from "@/app/common/constants/size-icons";
import { GoAlertFill } from "react-icons/go";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import { OverlayBackground } from "../overlay-background/overlay-background.component";
import { handleAnimationClose } from "../../utils/handle-animation-close";
import { useActionModal } from "./hooks/action-modal.hook";

export enum ActionModalType {
  LOGOUT = "logout",
  DELETE_BOARDGAME = "delete-boardgame",
  UPDATE_RENTAL = "update-rental",
}

export const ActionModal = ({
  type,
  handleExecuteAction,
  isLoading,
}: {
  type: ActionModalType;
  handleExecuteAction: () => void;
  isLoading: boolean;
}) => {
  const {
    animation,
    isVisible,
    alertColor,
    buttonLabel,
    buttonType,
    modalMessage,
    visibilityMap,
    setAnimation,
    setIsVisible,
  } = useActionModal();
  return (
    <>
      {isVisible[visibilityMap[type]] && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <OverlayBackground
            onClose={() =>
              handleAnimationClose({ isVisible, setIsVisible, setAnimation })
            }
          />
          <div
            className={`relative max-[400px]:w-[80%] z-[60] bg-white gap-2 flex flex-col rounded-2xl border border-blue-100 bg-contrastBackground p-4 shadow-lg sm:p-6 lg:p-8 ${animation} animate-delay-[1ms]`}
            role="alert"
          >
            <div className="w-full flex items-center justify-center">
              <GoAlertFill
                className={alertColor[type]}
                size={sizeIcons.larger}
              />
            </div>
            <p className="mt-4 text-gray-500 text-center">
              {modalMessage[type]}
            </p>
            <div className="mt-6 flex flex-wrap gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
              <PrimaryButton
                isLoading={isLoading}
                text={buttonLabel[type]}
                onClick={() => {
                  handleExecuteAction();
                  handleAnimationClose({
                    isVisible,
                    setIsVisible,
                    setAnimation,
                  });
                }}
                type={buttonType[type]}
              />
              <PrimaryButton
                text="cancelar"
                onClick={() =>
                  handleAnimationClose({
                    isVisible,
                    setIsVisible,
                    setAnimation,
                  })
                }
                type={PrimaryButtonTypes.SECONDARY}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
