"use client";

import {
  Rental,
  RentalStatus as RentalStatusType,
} from "../../types/rental.types";
import Image from "next/image";
import { formatDate } from "./utils/format-date";
import { formatCurrency } from "../../utils/format-currency";
import Link from "next/link";
import AlertPing from "../alert-ping/alert-ping";
import { ErrorMessage } from "../error-message/error-message.component";
import { useRentalHistory } from "./hooks/rental-history.hook";

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
  const {
    styleHeaderCol,
    isEmptyTable,
    rentalStatusColor,
    renderAdminHeader,
    renderUserHeader,
    renderAdminColumns,
    renderAdminColumnUpdateItem,
  } = useRentalHistory({ rentals, onSelectRental });

  if (isEmptyTable)
    return (
      <ErrorMessage
        title="Nenhum aluguel encontrado"
        message="Você não possui nenhum aluguel"
      />
    );

  return (
    <div className="relative w-[1000px] max-xl:w-4/5 overflow-x-auto">
      <table className="table-fixed w-[1000px] shadow-md sm:rounded-lg text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {renderAdminHeader()}
            {renderUserHeader()}
          </tr>
        </thead>

        {/* Render BoardGameColumns */}
        <tbody className="text-xs">
          {rentals.map((game, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              {renderAdminColumns(game)}
              <td className={styleHeaderCol}>
                <UserOrBoardgameInfo
                  data={{
                    id: "/search?boardgame=" + game.boardgameId,
                    image: game.boardgameImage,
                    name: game.boardgameName,
                    subtitle: formatCurrency(game.price),
                  }}
                />
              </td>

              <td className={`${styleHeaderCol} text-center`}>
                {formatDate(game.rentalStartDate)}
              </td>

              <td className={`${styleHeaderCol} text-center`}>
                {formatDate(game.rentalEndDate)}
              </td>

              {/* rental status column */}
              <td className={styleHeaderCol}>
                <div className="flex justify-center items-center gap-2">
                  {game.rentalStatus !== RentalStatusType.RETURNED && (
                    <AlertPing
                      isActive={game.rentalStatus === RentalStatusType.ACTIVE}
                    />
                  )}

                  <p
                    className={`text-xs font-semibold ${
                      rentalStatusColor[
                        game.rentalStatus ?? RentalStatusType.ACTIVE
                      ]
                    }`}
                  >
                    {
                      TranslateRentalStatus[
                        game.rentalStatus ?? RentalStatusType.ACTIVE
                      ]
                    }
                  </p>
                </div>
              </td>
              {renderAdminColumnUpdateItem(game)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const UserOrBoardgameInfo = ({
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
