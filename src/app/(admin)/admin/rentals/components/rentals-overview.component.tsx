"use client";

import React from "react";
import {
  ActionModal,
  ActionModalType,
} from "@/app/common/components/modal/action-modal.component";
import { RentalHistory } from "@/app/common/components/rental-history/rental-history.component";
import { useRentals } from "@/app/common/hooks/rentals.hook";
import { LoadingScreenSpinner } from "@/app/common/components/loading/loading-screen/loading-screen.component";
import { Rental, RentalStatus } from "@/app/common/types/rental.types";

export const RentalsOverview = () => {
  const {
    isModalOpen,
    findAllRentals,
    rental,
    animation,
    isLoadingAllRentals,
    setRental,
    setIsModalOpen,
    closeModal,
    handleUpdateStatus,
  } = useRentals();

  if (isLoadingAllRentals) return <LoadingScreenSpinner size={150} />;
  return (
    <div className="flex justify-center items-center h-screen md:px-10">
      <RentalHistory
        rentals={findAllRentals}
        onSelectRental={setRental}
        isRentalUpdateModalOpen={setIsModalOpen}
      />
      <ActionModal
        visibility={isModalOpen}
        content={
          <>
            {rental && (
              <RentalStatusOptions
                rental={{ ...rental, handleRental: setRental }}
              />
            )}
          </>
        }
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
