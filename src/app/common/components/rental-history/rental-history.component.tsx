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
import AlertPing from "../alert-ping/alert-ping";

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

  const isAdmin = pathname !== Pathnames.USER;
  const isEmptyTable = rentals.length === 0;

  const styleHeaderCol =
    "px-6 py-3 whitespace-nowrap overflow-hidden text-ellipsis w-[166px]";

  const renderAdminHeader = (): JSX.Element | null => {
    if (!isAdmin) return null;
    const headerCols = [
      "USUÁRIO",
      "BOARDGAME",
      "INÍCIO DO ALUGUEL",
      "FIM DO ALUGUEL",
      "STATUS",
      "ATUALIZAR",
    ];
    return (
      <>
        {headerCols.map((col, index) => (
          <th key={index} scope="col" className={styleHeaderCol}>
            {col}
          </th>
        ))}
      </>
    );
  };

  const renderUserHeader = (): JSX.Element | null => {
    if (isAdmin) return null;
    const headerCols = [
      "BOARDGAME",
      "INÍCIO DO ALUGUEL",
      "FIM DO ALUGUEL",
      "STATUS",
    ];
    return (
      <>
        {headerCols.map((col, index) => (
          <th key={index} scope="col" className={styleHeaderCol}>
            {col}
          </th>
        ))}
      </>
    );
  };

  const renderAdminColumns = (game: Rental): JSX.Element | null => {
    if (!isAdmin) return null;
    return (
      <td className={styleHeaderCol}>
        <UserOrBoardgameInfo
          data={{
            id: "/admin/users?id=" + game.userId,
            image: game.userImage,
            name: game.userName,
            subtitle: game.userEmail,
          }}
        />
      </td>
    );
  };

  const renderAdminColumnUpdateItem = (game: Rental): JSX.Element | null => {
    if (!isAdmin) return null;
    return (
      <td className={styleHeaderCol}>
        <PrimaryButton
          onClick={() => {
            onSelectRental(game);
            setIsVisible({ ...isVisible, updateRentalStatus: true });
          }}
          text="ATUALIZAR"
          type={PrimaryButtonTypes.OUTLINED}
        />
      </td>
    );
  };

  if (isEmptyTable)
    return (
      <div className="flex justify-center items-center h-[400px]">
        <p className="text-gray-500">Nenhum aluguel encontrado</p>
      </div>
    );

  return (
    <div className="relative w-[1000px] overflow-x-auto">
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

              <td className={styleHeaderCol}>
                {formatDate(game.rentalStartDate)}
              </td>

              <td className={styleHeaderCol}>
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
              {renderAdminColumnUpdateItem(game)}
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
