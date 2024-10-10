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
  ModalActionType,
} from "@/app/common/components/modal/action-modal.component";
import {
  BoardGameForm,
  BoardGameFormType,
} from "@/app/common/components/form/boardgame-form/boardgame-form.component";

export const LayoutWrapper = () => {
  const { isVisible, setIsVisible } = useContext();
  const pathname = usePathname();
  return (
    <>
      <div
        className={`p-4 ${
          pathname === Pathnames.ADMIN_AUTH && "hidden"
        } text-gray-600`}
      >
        <Hamburger
          toggled={isVisible.sidebar}
          onToggle={() =>
            setIsVisible({ ...isVisible, sidebar: !isVisible.sidebar })
          }
        />
      </div>
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
      <ActionModal type={ModalActionType.DELETE_BOARDGAME} />
      <BoardGameForm type={BoardGameFormType.UPDATE} />
      <Sidebar />
    </>
  );
};
