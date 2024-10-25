import { UserProfileCard } from "@/app/common/components/card/user-profile/card.component";
import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { LoadingSpinner } from "@/app/common/components/loading/loading-spinner/loading-spinner.component";
import { RentalHistory } from "@/app/common/components/rental-history/rental-history.component";
import { useRefetchQuery } from "@/app/common/hooks/refetch-query.hook";
import { rentalsService } from "@/app/common/services/rentals.service";
import { usersService } from "@/app/common/services/users.service";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { Rental, RentalStatus } from "@/app/common/types/rental.types";
import { IUser } from "@/app/common/types/user.interface";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const UserRentals = async () => {
  const { handleResetQuery } = useRefetchQuery();
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
    enabled: !!userIdParam,
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

  // DO COMPONENTE ORIGINAL

  if (isLoading) return <LoadingSpinner size={150} />;

  const updateStatus = async ({
    id,
    rental,
  }: {
    id: string | undefined;
    rental: Rental;
  }) => {
    if (confirm("Tem certeza que o jogo foi entregue ?")) {
      await rentalsService.update({
        ...rental,
        id: id,
        rentalStatus: RentalStatus.RETURNED,
      });
      handleResetQuery("user-rentals");
    }
    return;
  };
  return (
    <div className="flex justify-center items-center flex-col gap-8 w-full sm:px-10">
      <Link className="cursor-pointer" href={Pathnames.ADMIN_USERS}>
        RETORNAR
      </Link>

      <UserProfileCard
        name={foundUser.name}
        email={foundUser.email}
        image={foundUser.image}
      />
      {rentals.length === 0 ? (
        <ErrorMessage
          title="Rental history is Empty"
          message="You don't have any boardgame rented"
        />
      ) : (
        <RentalHistory rentals={rentals} handleUpdateStatus={updateStatus} />
      )}
    </div>
  );
};
