"use client";

import React from "react";
import {
  ActionModal,
  ActionModalType,
} from "@/app/common/components/modal/action-modal.component";
import { RentalHistory } from "@/app/common/components/rental-history/rental-history.component";
import { useRentals } from "@/app/common/hooks/rentals.hook";
import { LoadingScreenSpinner } from "@/app/common/components/loading/loading-screen/loading-screen.component";

export const RentalsOverview = () => {
  const {
    findAllRentals,
    rental,
    animation,
    isLoadingAllRentals,
    setRental,
    closeModal,
    handleUpdateStatus,
  } = useRentals();

  if (isLoadingAllRentals) return <LoadingScreenSpinner size={150} />;
  return (
    <div className="flex justify-center items-center h-screen md:px-10">
      <RentalHistory rentals={findAllRentals} onSelectRental={setRental} />
      <ActionModal
        rental={{ ...rental, handleRental: setRental }}
        handleExecuteAction={() =>
          handleUpdateStatus({ id: rental.id, rental: rental })
        }
        type={ActionModalType.UPDATE_RENTAL}
        isLoading={isLoadingAllRentals}
        animation={animation}
        closeModal={closeModal}
      />
    </div>
  );
};
