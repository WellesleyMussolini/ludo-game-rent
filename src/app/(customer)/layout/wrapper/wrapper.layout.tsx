"use client";

import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Header } from "../header/header.layout";
import {
  ActionModal,
  ModalActionType,
} from "@/app/common/components/modal/action-modal.component";

export const LayoutWrapper = () => (
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
    <ActionModal type={ModalActionType.LOGOUT} />
    <Header />
  </>
);
