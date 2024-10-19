"use client";

import { useQuery } from "@tanstack/react-query";
import { useUserSession } from "../../hooks/session.hook";
import { rentalsService } from "../../services/rentals.service";
import { Rental, RentalStatus } from "../../types/rental.types";
import Image from "next/image";

const formatDate = (isoDate: string | undefined) => {
  if (!isoDate) {
    return "N/A"; // Handle undefined by returning a placeholder like "N/A"
  }

  const date = new Date(isoDate);
  if (isNaN(date.getTime())) {
    return "Invalid date"; // Handle invalid date formats
  }

  const day = String(date.getDate()).padStart(2, "0"); // Get the day, padded with leading zero
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Get the month (getMonth() returns 0-11, so +1)
  const year = date.getFullYear(); // Get the year

  return `${day}/${month}/${year}`;
};

const translateStatus = (status: RentalStatus) => {
  if (status === RentalStatus.ACTIVE) return "alugado";
  if (status === RentalStatus.OVERDUE) return "atrasado";
  if (status === RentalStatus.RETURNED) return "devolvido";
};

export const SessionRentalHistory = () => {
  const { session } = useUserSession();
  const { data: rentals, isPending: isLoading } = useQuery({
    queryKey: ["session-rentals"],
    queryFn: async (): Promise<Rental[]> => {
      return await rentalsService.getUserRentalsById(session?.user.id ?? "");
    },
  });

  if (!rentals || isLoading) return <>No rental history available.</>;

  const myRentals = [...rentals].sort((a: Rental, b: Rental) => {
    const overdue = b.rentalStatus ?? "";
    const active = a.rentalStatus ?? "";
    return overdue < active ? -1 : overdue > active ? 1 : 0;
  });

  return (
    <table className="w-full shadow-md rounded-lg">
      <thead className="bg-gray-100 border-b sm:text-sm">
        <th className=" py-4 text-gray-600 text-[5px]">BoardGame</th>
        <th className=" py-4 text-gray-600 text-[5px]">Rental Date</th>
        <th className=" py-4 text-gray-600 text-[5px]">Rental End Date</th>
        <th className=" py-4 text-gray-600 text-[5px]">Status</th>
      </thead>
      {/* <tbody>
        {myRentals.map((game, index) => (
          <tr key={index} className="border-b">
            <td className="px-6 py-4 flex items-center space-x-2 text-left">
              <Image
                className="rounded-md w-6"
                src={game.boardgameImage}
                alt={game.boardgameName}
                height={0}
                width={0}
              />
              <span className="text-xs w-20 bg-violet-300 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {game.boardgameName}
              </span>
            </td>
            <td className="px-6 py-4 text-center text-xs">
              {formatDate(game.rentalStartDate)}
            </td>
            <td className="px-6 py-4 text-center text-xs">
              {formatDate(game.rentalEndDate)}
            </td>
            <td className="px-6 py-4 text-right">
              <RentalStatusComponent status={game.rentalStatus} />
            </td>
          </tr>
        ))}
      </tbody> */}
    </table>
  );
};

const RentalStatusComponent = ({ status }: { status: RentalStatus }) => (
  <div className="flex justify-center items-center gap-2 rounded-md">
    <span className="relative flex h-3 w-3">
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full
                    ${status === RentalStatus.ACTIVE && "bg-green-500"}
                    ${status === RentalStatus.OVERDUE && "bg-error"}
                    ${status === RentalStatus.RETURNED && "bg-gray-500"}
                    opacity-75`}
      />
      <span
        className={`relative inline-flex rounded-full h-3 w-3
              ${status === RentalStatus.ACTIVE && "bg-green-500"}
              ${status === RentalStatus.OVERDUE && "bg-error"}
              ${status === RentalStatus.RETURNED && "bg-gray-500"}`}
      ></span>
    </span>
    <p
      className={`text-xs
                       ${status === RentalStatus.ACTIVE && "text-green-500"}
                       ${status === RentalStatus.OVERDUE && "text-error"}
                       ${status === RentalStatus.RETURNED && "text-gray-500"}`}
    >
      {translateStatus(status)}
    </p>
  </div>
);
