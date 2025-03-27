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

export const LayoutWrapper = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
        handleExecuteAction={logout}
        isLoading={isLoading}
        type={ActionModalType.LOGOUT}
      />
      <Header />
    </>
  );
};
