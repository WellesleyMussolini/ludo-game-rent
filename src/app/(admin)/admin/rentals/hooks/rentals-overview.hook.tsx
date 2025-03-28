"use client";

import React from "react";
import { useRefetchQuery } from "@/app/common/hooks/refetch-query.hook";
import { rentalsService } from "@/app/common/services/rentals.service";
import { Rental, RentalStatus } from "@/app/common/types/rental.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useRentalsOverview = () => {
  const { handleResetQuery } = useRefetchQuery();

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

  const { data: findAllRentals = [] } = useQuery({
    queryKey: ["rentals"],
    queryFn: async () => await rentalsService.get(),
    refetchInterval: 1000,
  });

  const { mutate: handleUpdateStatus, isPending: isLoading } = useMutation({
    mutationKey: ["rentals"],
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
          id: id,
          rentalStatus: rental.rentalStatus,
        });
      } catch {
        toast.error("NÃO FOI POSSÍVEL ATUALIZAR O STATUS");
      }
    },
    onSuccess: () => {
      setRental({ ...rental, id: "", rentalStatus: rental.rentalStatus });
      return handleResetQuery("rentals");
    },
  });

  return {
    rental,
    setRental,
    isLoading,
    findAllRentals,
    handleUpdateStatus,
  };
};
