"use client";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Header } from "../header/header.layout";
import {
  ActionModal,
  ActionModalType,
} from "@/app/common/components/modal/action-modal.component";
import { signOut } from "next-auth/react";
import { handleAnimationClose } from "@/app/common/utils/handle-animation-close";
import { useContext } from "@/app/common/context/context";
import { Animations } from "@/app/common/types/animations.enum";

export const LayoutWrapper = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [animation, setAnimation] = React.useState<string>(
    Animations.ANIMATION_JUMP_IN
  );
  const { isVisible, setIsVisible } = useContext();
  const closeModal = () =>
    handleAnimationClose({ isVisible, setIsVisible, setAnimation });
  const logout = async () => {
    setIsLoading(true);
    await signOut();
    setIsLoading(false);
  };
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
        handleExecuteAction={logout}
        isLoading={isLoading}
        type={ActionModalType.LOGOUT}
      />
      <Header />
    </>
  );
};
