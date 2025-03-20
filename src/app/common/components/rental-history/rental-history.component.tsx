"use client";

import {
  Rental,
  RentalStatus as RentalStatusType,
} from "../../types/rental.types";
import Image from "next/image";
import { formatDate } from "./utils/format-date";
import { usePathname } from "next/navigation";
import { Pathnames } from "../../types/pathnames.enum";
import { PrimaryButton, PrimaryButtonTypes } from "../buttons";
import { useContext } from "../../context/context";
import { formatCurrency } from "../../utils/format-currency";
import Link from "next/link";

enum TranslateRentalStatus {
  overdue = "Atrasado",
  active = "Alugado",
  returned = "Devolvido",
}

export const RentalHistory = ({
  rentals,
  onSelectRental,
}: {
  rentals: Rental[];
  onSelectRental: (rental: Rental) => void;
}) => {
  const pathname = usePathname();
  const { isVisible, setIsVisible } = useContext();
  const isUserView = pathname === Pathnames.USER;

  return (
    <div className="relative w-[1000px] overflow-x-auto">
      <table className="table-fixed w-[1000px] shadow-md sm:rounded-lg text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {!isUserView && (
              <th
                scope="col"
                className="px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ width: "166px" }}
              >
                USER
              </th>
            )}
            <th
              scope="col"
              className="px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ width: "166px" }}
            >
              BOARDGAME
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ width: "166px" }}
            >
              INÍCIO DO ALUGUEL
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ width: "166px" }}
            >
              FIM DO ALUGUEL
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ width: "166px" }}
            >
              STATUS
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-center whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ width: "166px" }}
            >
              ATUALIZAR
            </th>
          </tr>
        </thead>

        <tbody className="text-xs">
          {rentals.map((game, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {/* user column */}
              {!isUserView && (
                <td
                  className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ width: "166px" }}
                >
                  <UserOrBoardgameInfo
                    data={{
                      id: "/admin/users?id=" + game.userId,
                      image: game.userImage,
                      name: game.userName,
                      subtitle: game.userEmail,
                    }}
                  />
                </td>
              )}

              {/* boardgame column */}
              <td
                className="px-6 py-4 whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ width: "166px" }}
              >
                <UserOrBoardgameInfo
                  data={{
                    id: "/search?boardgame=" + game.boardgameId,
                    image: game.boardgameImage,
                    name: game.boardgameName,
                    subtitle: formatCurrency(game.price),
                  }}
                />
              </td>

              {/* rental start date column */}
              <td
                className="px-6 py-4 text-center whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ width: "166px" }}
              >
                {formatDate(game.rentalStartDate)}
              </td>

              {/* rental end date column */}
              <td
                className="px-6 py-4 text-center whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ width: "166px" }}
              >
                {formatDate(game.rentalEndDate)}
              </td>

              {/* rental status column */}
              <td
                className="px-6 py-4 text-center whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ width: "166px" }}
              >
                <div className="flex justify-center items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className={`${
                        game.rentalStatus === RentalStatusType.RETURNED &&
                        "hidden"
                      } animate-ping absolute inline-flex h-full w-full rounded-full
                    ${
                      game.rentalStatus === RentalStatusType.ACTIVE &&
                      "bg-green-500"
                    }
                    ${
                      game.rentalStatus === RentalStatusType.OVERDUE &&
                      "bg-error"
                    }
                    opacity-75`}
                    />
                    <span
                      className={`${
                        game.rentalStatus === RentalStatusType.RETURNED &&
                        "hidden"
                      } relative inline-flex rounded-full h-2.5 w-2.5
                    ${
                      game.rentalStatus === RentalStatusType.ACTIVE &&
                      "bg-green-500"
                    }
                    ${
                      game.rentalStatus === RentalStatusType.OVERDUE &&
                      "bg-error"
                    }`}
                    />
                  </span>
                  <p
                    className={`text-xs font-semibold
                  ${
                    game.rentalStatus === RentalStatusType.ACTIVE &&
                    "text-green-500"
                  }
                  ${
                    game.rentalStatus === RentalStatusType.OVERDUE &&
                    "text-error"
                  }
                  ${
                    game.rentalStatus === RentalStatusType.RETURNED &&
                    "text-gray-500"
                  }`}
                  >
                    {TranslateRentalStatus[game.rentalStatus ?? "active"]}
                  </p>
                </div>
              </td>

              {/* update rental status column */}
              <td
                className="px-6 py-4 text-center whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ width: "166px" }}
              >
                <PrimaryButton
                  onClick={() => {
                    onSelectRental(game);
                    setIsVisible({ ...isVisible, updateRentalStatus: true });
                  }}
                  text="ATUALIZAR"
                  type={PrimaryButtonTypes.OUTLINED}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const UserOrBoardgameInfo = ({
  data,
}: {
  data: {
    id: string;
    image: string;
    name: string;
    subtitle: string;
  };
}) => {
  return (
    <div className="flex items-center gap-2">
      <Link href={data.id} className="relative w-8 h-8 shrink-0">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="object-cover rounded-md"
        />
      </Link>
      <div className="overflow-hidden">
        <p className="font-semibold truncate">{data.name}</p>
        <p className="text-gray-500 truncate">{data.subtitle}</p>
      </div>
    </div>
  );
};
