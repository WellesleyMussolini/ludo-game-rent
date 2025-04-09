import React from "react";
import { useRefetchQuery } from "./refetch-query.hook";
import { Rental, RentalStatus } from "../types/rental.types";
import { rentalsService } from "../services/rentals.service";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { usersService } from "../services/users.service";
import { usePathname } from "next/navigation";
import { handleAnimationCloseModal } from "../utils/handle-animation-close";
import { Animations } from "../types/animations.enum";

export const useRentals = (userId?: string) => {
  const { handleResetQuery } = useRefetchQuery();
  const pathname = usePathname();

  const [animation, setAnimation] = React.useState<string>(
    Animations.ANIMATION_JUMP_IN
  );
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  const closeModal = (): void => {
    return handleAnimationCloseModal({
      handleModalVisibility: setIsModalOpen,
      handleAnimation: setAnimation,
    });
  };

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
      handleResetQuery("rentals");
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
      const user = await usersService.getById(userId);
      const rentals = await rentalsService.getUserRentalsById(userId);
      return { user, rentals };
    },
    refetchInterval: 1000,
    enabled: !!userId,
    retry: 1,
    refetchOnWindowFocus: true,
  });

  return {
    findAllRentals,
    isModalOpen,
    userRental,
    pathname,
    animation,
    rental,
    isLoadingUserRentals,
    isLoadingAllRentals,
    setRental,
    setIsModalOpen,
    handleUpdateStatus,
    closeModal,
  };
};
