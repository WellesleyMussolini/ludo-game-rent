import { useContext } from "@/app/common/context/context";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import {
  Rental,
  RentalStatus as RentalStatusType,
} from "@/app/common/types/rental.types";
import { usePathname } from "next/navigation";
import { UserOrBoardgameInfo } from "../rental-history.component";
import { PrimaryButton, PrimaryButtonTypes } from "../../buttons";

export const useRentalHistory = ({
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

  const rentalStatusColor = {
    [RentalStatusType.ACTIVE]: "text-green-500",
    [RentalStatusType.OVERDUE]: "text-error",
    [RentalStatusType.RETURNED]: "text-gray-500",
  };

  return {
    styleHeaderCol,
    isEmptyTable,
    rentalStatusColor,
    renderAdminHeader,
    renderUserHeader,
    renderAdminColumns,
    renderAdminColumnUpdateItem,
  };
};
