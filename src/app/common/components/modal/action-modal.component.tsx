"use client";

import React from "react";
import { sizeIcons } from "@/app/common/constants/size-icons";
import { GoAlertFill } from "react-icons/go";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import { useContext } from "@/app/common/context/context";
import { signOut } from "next-auth/react";
import { OverlayBackground } from "../overlay-background/overlay-background.component";
import { useIsLoading } from "../../hooks/is-loading.hook";
import { boardGamesService } from "../../services/boardgames.service";
import { CardStatus } from "../card/types/card.types";
import { handleAnimationClose } from "../../utils/handle-animation-close";
import { Animations } from "../../types/animations.enum";

export enum ModalActionType {
  LOGOUT = "logout",
  DELETE_BOARDGAME = "delete-boardgame",
}

export const ActionModal = ({ type }: { type: ModalActionType }) => {
  const [animation, setAnimation] = React.useState<string>(
    Animations.ANIMATION_JUMP_IN
  );
  const { boardgame, setBoardGame, isVisible, setIsVisible } = useContext();
  const { isLoading, setIsLoading } = useIsLoading();

  const handleExecuteAction = async () => {
    if (type === ModalActionType.LOGOUT) return signOut();

    setIsLoading(true);
    await boardGamesService.delete(boardgame.id);
    setBoardGame({
      id: "",
      name: "",
      image: "",
      price: "",
      status: CardStatus.AVAILABLE,
      ageToPlay: "",
      playTime: "",
      minimumPlayersToPlay: "",
      maximumPlayersToPlay: "",
      description: "",
    });
    handleAnimationClose({ isVisible, setIsVisible, setAnimation });
    setIsLoading(false);
  };

  const modalMessage =
    type === ModalActionType.LOGOUT
      ? "Tem certeza de que deseja sair?"
      : "Tem certeza? Essa ação é irreversível.";

  const buttonLabel =
    type === ModalActionType.LOGOUT ? "Desconectar" : "Deletar";
  const buttonType =
    type === ModalActionType.LOGOUT
      ? PrimaryButtonTypes.ALERT
      : PrimaryButtonTypes.DELETE;

  const alertColor =
    type === ModalActionType.LOGOUT ? "text-alert" : "text-error";

  return (
    <>
      {(type === ModalActionType.LOGOUT
        ? isVisible.logout
        : isVisible.deleteBoardGame) && (
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
              <GoAlertFill className={alertColor} size={sizeIcons.larger} />
            </div>
            <p className="mt-4 text-gray-500 text-center">{modalMessage}</p>
            <div className="mt-6 flex flex-wrap gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
              <PrimaryButton
                isLoading={isLoading}
                text={buttonLabel}
                onClick={handleExecuteAction}
                type={buttonType}
              />
              <PrimaryButton
                text="Cancelar"
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
