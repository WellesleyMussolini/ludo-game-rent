"use client";

import { rentalsService } from "@/app/common/services/rentals.service";
import { useQuery } from "@tanstack/react-query";
import { Rental } from "@/app/common/types/rental.types";

export const useRentals = () => {
  const { data: findAllRentals } = useQuery({
    queryKey: ["rentals"],
    queryFn: async () => await rentalsService.get(),
    refetchInterval: 1000,
  });

  if (!findAllRentals) return { rentals: [] };

  const rentals = [...findAllRentals].sort((a: Rental, b: Rental) => {
    const overdue = b.rentalStatus ?? "";
    const active = a.rentalStatus ?? "";
    return overdue < active ? -1 : overdue > active ? 1 : 0;
  });

  return { rentals };
};
