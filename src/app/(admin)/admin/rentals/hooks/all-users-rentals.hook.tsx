"use client";

import React from "react";
import { useRefetchQuery } from "@/app/common/hooks/refetch-query.hook";
import { rentalsService } from "@/app/common/services/rentals.service";
import { Rental, RentalStatus } from "@/app/common/types/rental.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAllUsersRentals = () => {
  const { handleResetQuery } = useRefetchQuery();

  const [selectedRental, setSelectedRental] = React.useState<Rental | null>(
    null
  );

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
          rentalStatus: RentalStatus.RETURNED,
        });
      } catch {
        toast.error("NÃO FOI POSSÍVEL ATUALIZAR O STATUS");
      }
    },
    onSuccess: () => {
      setSelectedRental(null);
      return handleResetQuery("rentals");
    },
  });

  const updatedStatus = () => {
    if (!selectedRental) return;
    handleUpdateStatus({ id: selectedRental.id, rental: selectedRental });
  };
  return {
    isLoading,
    findAllRentals,
    selectedRental,
    setSelectedRental,
    handleUpdateStatus,
    updatedStatus,
  };
};
