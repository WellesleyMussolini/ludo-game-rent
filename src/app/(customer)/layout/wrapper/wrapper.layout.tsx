import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LogoutModal } from "@/app/components/modal/logout/logout-modal.component";
import React from "react";
import { Header } from "../header/header.layout";
import { handleLogout } from "../../utils/handle-logout";

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

    <LogoutModal handleLogout={handleLogout} />
    <Header />
  </>
);
