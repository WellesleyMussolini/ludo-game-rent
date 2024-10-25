"use client";

import { useAllUsersRentals } from "../hooks/all-users-rentals.hook";
import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { RentalHistory } from "@/app/common/components/rental-history/rental-history.component";

export const AllUsersRentals = () => {
  const { findAllRentals, handleUpdateStatus } = useAllUsersRentals();
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
        handleUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};
