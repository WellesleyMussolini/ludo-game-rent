"use client";

import { useRefetchQuery } from "@/app/common/hooks/refetch-query.hook";
import { rentalsService } from "@/app/common/services/rentals.service";
import { Rental, RentalStatus } from "@/app/common/types/rental.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const useAllUsersRentals = () => {
  const { handleResetQuery } = useRefetchQuery();
  const { data: findAllRentals = [] } = useQuery({
    queryKey: ["rentals"],
    queryFn: async () => await rentalsService.get(),
    refetchInterval: 1000,
  });

  const { mutate: handleUpdateStatus } = useMutation({
    mutationKey: ["rentals"],
    mutationFn: async ({
      id,
      rental,
    }: {
      id: string | undefined;
      rental: Rental;
    }) => {
      try {
        if (confirm("Tem certeza que o jogo foi entregue?")) {
          await rentalsService.update({
            ...rental,
            id: id,
            rentalStatus: RentalStatus.RETURNED,
          });
        }
      } catch {
        toast.error("NÃO FOI POSSÍVEL ATUALIZAR O STATUS");
      }
    },
    onSuccess: () => {
      return handleResetQuery("rentals");
    },
  });

  return { findAllRentals, handleUpdateStatus };
};
