"use client";

import React from "react";
import Link from "next/link";
import { Pathnames } from "../../types/pathnames.enum";
import { UserProfileCard } from "../card/user-profile/card.component";
import { RentalHistory } from "../rental-history/rental-history.component";
import { ActionModal, ActionModalType } from "../modal/action-modal.component";
import { useRentals } from "../../hooks/rentals.hook";
import { LoadingScreenSpinner } from "../loading/loading-screen/loading-screen.component";

export const UserRentals = ({ userId }: { userId: string }) => {
  const {
    animation,
    isLoadingUserRentals,
    pathname,
    rental,
    userRental,
    closeModal,
    setRental,
    handleUpdateStatus,
  } = useRentals(userId);

  if (isLoadingUserRentals) return <LoadingScreenSpinner size={150} />;

  if (!userRental?.user) return null;

  return (
    <div className="flex justify-center items-center flex-col gap-8 w-full sm:px-10">
      {pathname === Pathnames.ADMIN_USERS && (
        <Link className="cursor-pointer" href={Pathnames.ADMIN_USERS}>
          RETORNAR
        </Link>
      )}
      <UserProfileCard
        data={{
          image: userRental.user.image,
          name: userRental.user.name,
          email: userRental.user.email,
        }}
      />
      <RentalHistory rentals={userRental.rentals} onSelectRental={setRental} />
      <ActionModal
        animation={animation}
        rental={{ ...rental, handleRental: setRental }}
        handleExecuteAction={() =>
          handleUpdateStatus({ id: rental.id, rental: rental })
        }
        type={ActionModalType.UPDATE_RENTAL}
        isLoading={isLoadingUserRentals}
        closeModal={closeModal}
      />
    </div>
  );
};
