import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { rentalsService } from "@/app/common/services/rentals.service";
import { usersService } from "@/app/common/services/users.service";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { Rental } from "@/app/common/types/rental.types";
import { IUser } from "@/app/common/types/user.interface";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const UserRentals = async () => {
  const searchParams = useSearchParams()!;
  const userIdParam = searchParams.get("id")!;
  const {
    data,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-rentals", userIdParam],
    queryFn: async () => {
      const rental = {
        user: async (): Promise<IUser | null> =>
          await usersService.getById(userIdParam),
        rentals: async (): Promise<Rental[]> =>
          await rentalsService.getUserRentalsById(userIdParam),
      };
      return { rental };
    },
    refetchInterval: 60000,
  });

  if (isError) {
    return (
      <>
        <Link className="cursor-pointer" href={Pathnames.ADMIN_USERS}>
          MOVE BACK
        </Link>
        <ErrorMessage
          title="Error"
          message={
            "Opss.. Algo de errado aconteceu ao tentar encontrar as informações do usuário."
          }
        />
      </>
    );
  }

  const rentals = await data?.rental.rentals();
  const foundUser = await data?.rental.user();
  if (!rentals || !foundUser) {
    return <ErrorMessage title="404" message="User was not found" />;
  }
  return (
    <div className="flex flex-col">
      <Link className="cursor-pointer" href={Pathnames.ADMIN_USERS}>
        MOVE BACK
      </Link>
      <Image
        src={foundUser.image}
        alt={foundUser.name}
        height={60}
        width={60}
      />
      <p>{foundUser.name}</p>
      <p>{foundUser.email}</p>
      {rentals.length === 0 && <p>NENHUM JOGO ALUGADO</p>}
      {rentals.map((rental: Rental, index: number) => (
        <div className="flex items-center gap-9 flex-row" key={index}>
          <Image
            src={rental.boardgameImage}
            alt={rental.boardgameName}
            height={40}
            width={40}
          />
          <p>{rental.boardgameName}</p>
          <p>{rental.rentalDurationDays}</p>
          <p>{rental.rentalStartDate}</p>
          <p>{rental.rentalEndDate}</p>
          <p>{rental.rentalStatus}</p>
        </div>
      ))}
    </div>
  );
};
