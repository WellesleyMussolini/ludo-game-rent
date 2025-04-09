"use client";

import { useContext } from "@/app/common/context/context";
import Sidebar from "../sidebar/sidebar.layout";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  ActionModal,
  ActionModalType,
} from "@/app/common/components/modal/action-modal.component";
import {
  BoardGameForm,
  BoardGameFormType,
} from "@/app/common/components/form/boardgame-form/boardgame-form.component";
import { boardGamesService } from "@/app/common/services/boardgames.service";
import { useRefetchQuery } from "@/app/common/hooks/refetch-query.hook";
import { CardStatus } from "@/app/common/components/card/boardgames/types/card.types";
import { handleAnimationCloseModal } from "@/app/common/utils/handle-animation-close";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Animations } from "@/app/common/types/animations.enum";

export const LayoutWrapper = () => {
  const {
    boardgame,
    isModalDeleteGameOpen,
    isModalUpdateGameFormOpen,
    setIsModalUpdateGameFormOpen,
    setBoardGame,
    setIsModalDeleteGameOpen,
  } = useContext();

  const [animation, setAnimation] = React.useState<string>(
    Animations.ANIMATION_JUMP_IN
  );

  const { handleResetQuery } = useRefetchQuery();

  const closeModal = (): void =>
    handleAnimationCloseModal({
      handleAnimation: setAnimation,
      handleModalVisibility: setIsModalDeleteGameOpen,
    });

  const { mutate: handleDeleteBoardgame, isPending: isLoading } = useMutation({
    mutationKey: ["boardgames"],
    mutationFn: async () => await boardGamesService.delete(boardgame.id),
    onSuccess: () => {
      handleResetQuery("boardgames");
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
        rentalDurationDays: "",
        availableCopies: "",
      });
      closeModal();
    },
  });

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Bounce}
        className="z-50"
      />
      <ActionModal
        visibility={isModalDeleteGameOpen}
        animation={animation}
        closeModal={closeModal}
        handleExecuteAction={handleDeleteBoardgame}
        isLoading={isLoading}
        type={ActionModalType.DELETE_BOARDGAME}
      />
      <BoardGameForm
        visibility={isModalUpdateGameFormOpen}
        handleVisibility={setIsModalUpdateGameFormOpen}
        type={BoardGameFormType.UPDATE}
      />
      <Sidebar />
    </>
  );
};
