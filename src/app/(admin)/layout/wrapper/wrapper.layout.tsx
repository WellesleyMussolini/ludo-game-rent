"use client";

import { useContext } from "@/app/common/context/context";
import Sidebar from "../sidebar/sidebar.layout";
import { Squash as Hamburger } from "hamburger-react";
import { usePathname } from "next/navigation";
import { Pathnames } from "@/app/common/types/pathnames.enum";
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
import { handleAnimationClose } from "@/app/common/utils/handle-animation-close";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Animations } from "@/app/common/types/animations.enum";

export const LayoutWrapper = () => {
  const { isVisible, boardgame, setIsVisible, setBoardGame } = useContext();

  const [animation, setAnimation] = React.useState<string>(
    Animations.ANIMATION_JUMP_IN
  );

  const { handleResetQuery } = useRefetchQuery();

  const closeModal = () =>
    handleAnimationClose({ isVisible, setIsVisible, setAnimation });

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
        animation={animation}
        closeModal={closeModal}
        handleExecuteAction={handleDeleteBoardgame}
        isLoading={isLoading}
        type={ActionModalType.DELETE_BOARDGAME}
      />
      <BoardGameForm type={BoardGameFormType.UPDATE} />
      <Sidebar />
    </>
  );
};
