"use client";

import { sizeIcons } from "@/app/common/constants/size-icons";
import { GoAlertFill } from "react-icons/go";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import { useContext } from "@/app/common/context/context";
import { signOut } from "next-auth/react";
import { OverlayBackground } from "../../overlay-background/overlay-background.component";

export const LogoutModal = () => {
  const { modals, setModals } = useContext();
  return (
    <>
      {modals.logout && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
          <OverlayBackground
            onClose={() => setModals({ ...modals, logout: false })}
          />
          <div
            className="relative max-[400px]:w-[80%] z-[60] bg-white gap-2 flex flex-col rounded-2xl border border-blue-100 bg-contrastBackground p-4 shadow-lg sm:p-6 lg:p-8 animate-jump-in animate-delay-[1ms]"
            role="alert"
          >
            <div className="w-full flex items-center justify-center">
              <GoAlertFill className="text-alert" size={sizeIcons.larger} />
            </div>
            <p className="mt-4 text-gray-500 text-center">
              Tem certeza de que deseja sair ?
            </p>
            <div className="mt-6 flex flex-wrap gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
              <PrimaryButton
                text="Desconectar"
                onClick={signOut}
                type={PrimaryButtonTypes.ALERT}
              />
              <PrimaryButton
                text="Cancelar"
                onClick={() => setModals({ ...modals, logout: false })}
                type={PrimaryButtonTypes.SECONDARY}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
