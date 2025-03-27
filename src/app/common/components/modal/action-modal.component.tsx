"use client";

import React from "react";
import { sizeIcons } from "@/app/common/constants/size-icons";
import { GoAlertFill } from "react-icons/go";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import { OverlayBackground } from "../overlay-background/overlay-background.component";
import { useActionModal } from "./hooks/action-modal.hook";
import { Rental, RentalStatus } from "../../types/rental.types";

export enum ActionModalType {
  LOGOUT = "logout",
  DELETE_BOARDGAME = "delete-boardgame",
  UPDATE_RENTAL = "update-rental",
}

export const ActionModal = ({
  type,
  handleExecuteAction,
  isLoading,
  rental,
}: {
  type: ActionModalType;
  handleExecuteAction: () => void;
  rental?: Rental & {
    handleRental: React.Dispatch<React.SetStateAction<Rental>>;
  };
  isLoading: boolean;
}) => {
  const { animation, isAlertPopup, actionModalConfig, closeModal } =
    useActionModal(type);

  if (isAlertPopup) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <OverlayBackground onClose={closeModal} />
      <div
        className={`relative max-w-[400px] z-50 bg-white rounded-2xl border p-4 shadow-lg sm:p-6 lg:p-8 ${animation} animate-delay-[1ms]`}
        role="alert"
      >
        <div className="flex justify-center">
          <GoAlertFill
            className={actionModalConfig.alertColor}
            size={sizeIcons.larger}
          />
        </div>
        <p className="mt-4 text-gray-500 text-center">
          {actionModalConfig.message}
        </p>
        {type === ActionModalType.UPDATE_RENTAL && rental && (
          <RentalStatusOptions rental={rental} />
        )}
        <div className="mt-6 flex flex-wrap gap-4 lg:grid lg:grid-cols-2 lg:gap-4">
          <PrimaryButton
            isLoading={isLoading}
            text={actionModalConfig.buttonLabel}
            onClick={() => {
              handleExecuteAction();
              closeModal();
            }}
            type={actionModalConfig.buttonType}
          />
          <PrimaryButton
            text="Cancelar"
            onClick={closeModal}
            type={PrimaryButtonTypes.SECONDARY}
          />
        </div>
      </div>
    </div>
  );
};

const RentalStatusOptions = ({
  rental,
}: {
  rental: Rental & {
    handleRental: React.Dispatch<React.SetStateAction<Rental>>;
  };
}) => (
  <div className="mt-4 flex flex-col gap-2">
    {[
      { name: "ENTREGUE", value: RentalStatus.RETURNED },
      { name: "ATIVO", value: RentalStatus.ACTIVE },
      { name: "ATRASADO", value: RentalStatus.OVERDUE },
    ].map((option, index) => (
      <div
        key={index}
        className={`cursor-pointer border rounded-lg p-3 text-center transition-all hover:border-primary active:bg-primary ${
          rental.rentalStatus === option.value
            ? "bg-primary text-white border-primary"
            : "bg-white text-gray-700"
        }`}
        onClick={() =>
          rental.handleRental({ ...rental, rentalStatus: option.value })
        }
      >
        {option.name}
      </div>
    ))}
  </div>
);
