"use client";

import {
  Rental,
  RentalStatus as RentalStatusType,
} from "../../types/rental.types";
import Image from "next/image";
import { formatDate } from "./utils/format-date";
import { RentalStatus } from "./components/rental-status.component";
import { usePathname } from "next/navigation";
import { Pathnames } from "../../types/pathnames.enum";
import { useUserSession } from "../../hooks/session.hook";
import { UserRoles } from "../../types/user-roles.enum";

export const RentalHistory = ({
  rentals,
  handleUpdateStatus,
}: {
  rentals: Rental[];
  handleUpdateStatus: (params: {
    id: string | undefined;
    rental: Rental;
  }) => void;
}) => {
  const pathname = usePathname();
  const { session } = useUserSession();
  return (
    <table className="table-fixed w-full">
      <thead className="flex items-center w-full bg-gray-100 border-b">
        <th className="w-1/4 py-4 text-gray-600 max-[240px]:text-[4px] max-[375px]:text-[5px] max-[475px]:text-[6px] max-[575px]:text-[8px] text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
          {pathname === Pathnames.USER || pathname === Pathnames.ADMIN_USERS
            ? "BoardGame"
            : "USER"}
        </th>
        <th className="w-1/4 py-4 text-gray-600 max-[240px]:text-[4px] max-[375px]:text-[5px] max-[475px]:text-[6px] max-[575px]:text-[8px] text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
          {pathname === Pathnames.USER || pathname === Pathnames.ADMIN_USERS
            ? "Rental Date"
            : "BoardGame"}
        </th>
        <th className="w-1/4 py-4 text-gray-600 max-[240px]:text-[4px] max-[375px]:text-[5px] max-[475px]:text-[6px] max-[575px]:text-[8px] text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
          Rental End Date
        </th>
        <th className="w-1/4 py-4 text-gray-600 max-[240px]:text-[4px] max-[375px]:text-[5px] max-[475px]:text-[6px] max-[575px]:text-[8px] text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
          Status
        </th>
      </thead>
      <tbody>
        {rentals.map((game, index) => (
          <tr key={index} className="flex items-center w-full border-b">
            <td className="w-1/4 px-2 md:px-10 py-4 flex items-center max-[300px]:gap-1 gap-2">
              <Image
                className="rounded-md max-[240px]:w-3 max-xs:w-4 xs:w-6 sm:w-7 md:w-8 lg:w-9 xl:w-10 2xl:w-12"
                src={
                  pathname === Pathnames.USER ||
                  pathname === Pathnames.ADMIN_USERS
                    ? game.boardgameImage
                    : game.userImage
                }
                alt={
                  pathname === Pathnames.USER ||
                  pathname === Pathnames.ADMIN_USERS
                    ? game.boardgameName
                    : game.userName
                }
                height={0}
                width={0}
              />
              <div className="w-full flex flex-col overflow-hidden overflow-ellipsis whitespace-nowrap">
                <span className="overflow-hidden overflow-ellipsis whitespace-nowrap flex-grow w-full max-[240px]:text-[4px] max-[375px]:text-[5px] max-[475px]:text-[6px] max-[575px]:text-[8px] text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
                  {pathname === Pathnames.USER ||
                  pathname === Pathnames.ADMIN_USERS
                    ? game.boardgameName
                    : game.userName}
                </span>
                <span className="text-gray-400 overflow-hidden overflow-ellipsis whitespace-nowrap flex-grow w-full max-[240px]:text-[4px] max-[375px]:text-[5px] max-[475px]:text-[6px] max-[575px]:text-[8px] text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
                  {pathname === Pathnames.USER ||
                  pathname === Pathnames.ADMIN_USERS
                    ? game.price
                    : game.userEmail}
                </span>
              </div>
            </td>

            <td
              className={
                pathname === Pathnames.USER ||
                pathname === Pathnames.ADMIN_USERS
                  ? "w-1/4 px-4 py-4 text-center max-[240px]:text-[4px] max-[375px]:text-[5px] max-[475px]:text-[6px] max-[575px]:text-[8px] text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg"
                  : "w-1/4 px-2 md:px-10 py-4 flex items-center max-[300px]:gap-1 gap-2"
              }
            >
              {pathname === Pathnames.USER ||
              pathname === Pathnames.ADMIN_USERS ? (
                formatDate(game.rentalStartDate)
              ) : (
                <>
                  <Image
                    className="rounded-md max-[240px]:w-3 max-xs:w-4 xs:w-6 sm:w-7 md:w-8 lg:w-9 xl:w-10 2xl:w-12"
                    src={game.boardgameImage}
                    alt={game.boardgameName}
                    height={35}
                    width={35}
                  />
                  <div className="w-full flex flex-col overflow-hidden overflow-ellipsis whitespace-nowrap">
                    <span className="overflow-hidden overflow-ellipsis whitespace-nowrap flex-grow w-full max-[240px]:text-[4px] max-[375px]:text-[5px] max-[475px]:text-[6px] max-[575px]:text-[8px] text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
                      {game.boardgameName}
                    </span>
                    <span className="text-gray-400 overflow-hidden overflow-ellipsis whitespace-nowrap flex-grow w-full max-[240px]:text-[4px] max-[375px]:text-[5px] max-[475px]:text-[6px] max-[575px]:text-[8px] text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
                      R${game.price} reais
                    </span>
                  </div>
                </>
              )}
            </td>

            <td className="w-1/4 px-4 py-4 text-center max-[240px]:text-[4px] max-[375px]:text-[5px] max-[475px]:text-[6px] max-[575px]:text-[8px] text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg">
              {formatDate(game.rentalEndDate)}
            </td>
            <td className="w-1/4 px-4 py-4 text-center">
              <RentalStatus
                role={session?.user.role ?? UserRoles.USER}
                status={game.rentalStatus as RentalStatusType}
                handleUpdateStatus={() =>
                  handleUpdateStatus({ id: game.id, rental: game })
                }
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
