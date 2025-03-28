import React from "react";
import { useRefetchQuery } from "./refetch-query.hook";
import { Rental, RentalStatus } from "../types/rental.types";
import { rentalsService } from "../services/rentals.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { usersService } from "../services/users.service";
import { usePathname } from "next/navigation";
import { handleAnimationClose } from "../utils/handle-animation-close";
import { useContext } from "../context/context";
import { Animations } from "../types/animations.enum";

export const useRentals = (userId?: string) => {
  const { handleResetQuery } = useRefetchQuery();
  const pathname = usePathname();

  const [animation, setAnimation] = React.useState<string>(
    Animations.ANIMATION_JUMP_IN
  );
  const { isVisible, setIsVisible } = useContext();

  const closeModal = () =>
    handleAnimationClose({ isVisible, setAnimation, setIsVisible });

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
      closeModal();

      setTimeout(() => {
        handleResetQuery("rentals");
      }, 550);
    },
  });

  const { data: findAllRentals = [], isPending: isLoadingAllRentals } =
    useQuery({
      queryKey: ["rentals"],
      queryFn: async () => {
        return await rentalsService.get();
      },
      refetchInterval: 1000,
      retry: 1,
      refetchOnWindowFocus: true,
    });

  const { data: userRental, isPending: isLoadingUserRentals } = useQuery({
    queryKey: ["rentals", userId],
    queryFn: async () => {
      if (!userId) return null;
      try {
        const user = await usersService.getById(userId);
        const rentals = await rentalsService.getUserRentalsById(userId);
        if (!user) throw new Error("User not found");
        return { user, rentals };
      } catch (error) {
        throw new Error("Error fetching user rentals");
      }
    },
    refetchInterval: 1000,
    enabled: !!userId,
    retry: 1,
    refetchOnWindowFocus: true,
  });

  return {
    findAllRentals,
    userRental,
    pathname,
    animation,
    rental,
    isLoadingUserRentals,
    isLoadingAllRentals,
    setRental,
    handleUpdateStatus,
    closeModal,
  };
};
