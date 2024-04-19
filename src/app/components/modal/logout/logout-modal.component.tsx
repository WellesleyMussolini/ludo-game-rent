"use client"

import { sizeIcons } from "@/constants/size-icons";
import { GoAlertFill } from "react-icons/go";
import { PrimaryButton } from "../../primary-button/primary-button.component";
import { EnumPrimaryButton } from "../../primary-button/primary-button.interface";
import { OverlayBackground } from "../../overlay-background/overlay-background.component";

interface ILogoutModal {
    visibility: boolean,
    handleLogout: () => void,
    handleCloseModal: () => void,
};

export const LogoutModal = ({ visibility, handleCloseModal, handleLogout }: ILogoutModal) => {
    return <>
        {
            visibility &&
            <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                <OverlayBackground onClick={handleCloseModal} />
                <div
                    className="relative bg-white z-50 gap-2 flex flex-col rounded-2xl border border-blue-100 bg-contrastBackground p-4 shadow-lg sm:p-6 lg:p-8 animate-jump-in animate-delay-[1ms]"
                    role="alert"
                >
                    <div className="w-full flex items-center justify-center">
                        <GoAlertFill className="text-alert" size={sizeIcons.larger} />
                    </div>
                    <p className="mt-4 text-gray-500">Tem certeza de que deseja sair ?</p>
                    <div className="mt-6 flex flex-wrap gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
                        <PrimaryButton
                            text="Desconectar"
                            onClick={handleLogout}
                            type={EnumPrimaryButton.SECONDARY}
                            styles="border border-slate-50 bg-slate-50 text-zinc-950 hover:text-zinc-950 hover:bg-slate-50"
                        />
                        <PrimaryButton
                            text="Cancelar"
                            onClick={handleCloseModal}
                            type={EnumPrimaryButton.PRIMARY}
                            styles="bg-[#ebb44f]"

                        />
                    </div>
                </div>
            </div>
        }
    </>
};