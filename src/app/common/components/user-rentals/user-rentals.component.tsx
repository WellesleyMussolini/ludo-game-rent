"use client";

import React from "react";
import Link from "next/link";
import { Pathnames } from "../../types/pathnames.enum";
import { UserProfileCard } from "../card/user-profile/card.component";
import { useRefetchQuery } from "../../hooks/refetch-query.hook";
import { usePathname } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usersService } from "../../services/users.service";
import { Rental, RentalStatus } from "../../types/rental.types";
import { rentalsService } from "../../services/rentals.service";
import { ErrorMessage } from "../error-message/error-message.component";
import { LoadingSpinner } from "../loading/loading-spinner/loading-spinner.component";
import { RentalHistory } from "../rental-history/rental-history.component";
import { toast } from "react-toastify";
import { ActionModal, ActionModalType } from "../modal/action-modal.component";

export const UserRentals = ({ userId }: { userId: string }) => {
  const { handleResetQuery } = useRefetchQuery();
  const pathname = usePathname();

  const [rental, setRental] = React.useState<Rental>({
    id: "",
    userId: "",
    userName: "",
    userImage: "",
    userEmail: "",
    boardgameId: "",
    boardgameName: "",
    boardgameImage: "",
    price: "",
    rentalDurationDays: "",
    rentalStatus: RentalStatus.ACTIVE,
  });

  const { mutate: handleUpdateStatus } = useMutation({
    mutationKey: ["user-rentals"],
    mutationFn: async ({
      id,
      rental,
    }: {
      id: string | undefined;
      rental: Rental;
    }) => {
      try {
        return await rentalsService.update({
          ...rental,
          id,
          rentalStatus: rental.rentalStatus,
        });
      } catch {
        toast.error("NÃO FOI POSSÍVEL ATUALIZAR O STATUS");
      }
    },
    onSuccess: () => {
      setRental({ ...rental, id: "", rentalStatus: rental.rentalStatus });
      handleResetQuery("user-rentals");
    },
  });

  const {
    data,
    isPending: isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-rentals", userId],
    queryFn: async () => {
      const user = await usersService.getById(userId);
      const rentals = await rentalsService.getUserRentalsById(userId);
      return { user, rentals };
    },
    refetchInterval: 60000,
    enabled: !!userId,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <LoadingSpinner size={150} />;
      </div>
    );
  if (isError) {
    return (
      <>
        <Link className="cursor-pointer" href={Pathnames.ADMIN_USERS}>
          MOVE BACK
        </Link>
        <ErrorMessage
          title="Error"
          message="Opss.. Algo de errado aconteceu ao tentar encontrar as informações do usuário."
        />
      </>
    );
  }

  if (!data?.user) {
    return <ErrorMessage title="404" message="User was not found" />;
  }

  return (
    <div className="flex justify-center items-center flex-col gap-8 w-full sm:px-10">
      {pathname === Pathnames.ADMIN_USERS && (
        <Link className="cursor-pointer" href={Pathnames.ADMIN_USERS}>
          RETORNAR
        </Link>
      )}

      <UserProfileCard
        data={{
          image: data.user.image,
          name: data.user.name,
          email: data.user.email,
        }}
      />

      {!data.rentals || data.rentals.length === 0 ? (
        <ErrorMessage
          title="Rental history is Empty"
          message="You don't have any boardgame rented"
        />
      ) : (
        <>
          <RentalHistory rentals={data.rentals} onSelectRental={setRental} />
          <ActionModal
            rental={{ ...rental, handleRental: setRental }}
            handleExecuteAction={() =>
              handleUpdateStatus({ id: rental.id, rental })
            }
            type={ActionModalType.UPDATE_RENTAL}
            isLoading={isLoading}
          />
        </>
      )}
    </div>
  );
};
