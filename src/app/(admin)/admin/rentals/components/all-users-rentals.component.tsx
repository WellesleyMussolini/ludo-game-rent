"use client";

import { useAllUsersRentals } from "../hooks/all-users-rentals.hook";
import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import {
  ActionModal,
  ActionModalType,
} from "@/app/common/components/modal/action-modal.component";
import { RentalHistory } from "@/app/common/components/rental-history/rental-history.component";

export const AllUsersRentals = () => {
  const { findAllRentals, isLoading, updatedStatus, setSelectedRental } =
    useAllUsersRentals();
  if (!findAllRentals)
    return (
      <ErrorMessage
        title="No rentals found"
        message="The BoardGames Rentals is empty"
      />
    );
  return (
    <div className="flex justify-center items-center h-screen md:px-10">
      <RentalHistory
        rentals={findAllRentals}
        onSelectRental={setSelectedRental}
      />
      <ActionModal
        handleExecuteAction={updatedStatus}
        type={ActionModalType.UPDATE_RENTAL}
        isLoading={isLoading}
      />
    </div>
  );
};
