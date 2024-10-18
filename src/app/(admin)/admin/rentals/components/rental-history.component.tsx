"use client";

import { Rental, RentalStatus } from "@/app/common/types/rental.types";
import Image from "next/image";
import { useRentals } from "../hooks/rentals.hook";

export const RentalHistory = () => {
  const { rentals } = useRentals();
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1>ALUGUEIS</h1>
      {rentals.map((rental: Rental, index: number) => (
        <div className="flex flex-row text-xs" key={index}>
          <Image
            src={rental.userImage}
            alt={rental.userName}
            height={35}
            width={35}
          />
          <p>{rental.userName}</p>
          <p>{rental.userEmail}</p>
          <Image
            src={rental.boardgameImage}
            alt={rental.boardgameName}
            height={35}
            width={35}
          />
          <p>{rental.boardgameName}</p>
          <p>{rental.rentalEndDate}</p>
          <p
            className={`
            ${rental.rentalStatus === RentalStatus.ACTIVE && "text-green-500"}
            ${rental.rentalStatus === RentalStatus.OVERDUE && "text-red-500"}
            ${rental.rentalStatus === RentalStatus.RETURNED && "text-gray-700"}
          `}
          >
            {rental.rentalStatus}
          </p>
        </div>
      ))}
    </div>
  );
};
