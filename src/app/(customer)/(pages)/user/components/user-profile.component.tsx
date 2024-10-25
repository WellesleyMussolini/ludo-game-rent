"use client";

import { LoadingSpinner } from "@/app/common/components/loading/loading-spinner/loading-spinner.component";
import { RentalHistory } from "@/app/common/components/rental-history/rental-history.component";
import { useRefetchQuery } from "@/app/common/hooks/refetch-query.hook";
import { useUserSession } from "@/app/common/hooks/session.hook";
import { rentalsService } from "@/app/common/services/rentals.service";
import { Rental, RentalStatus } from "@/app/common/types/rental.types";
import { useQuery } from "@tanstack/react-query";
import { UserProfileCard } from "@/app/common/components/card/user-profile/card.component";

export const UserProfile = () => {
  const { session } = useUserSession();
  const { handleResetQuery } = useRefetchQuery();

  const { data: rentals = [], isPending: isLoading } = useQuery({
    queryKey: ["session-rentals", session?.user?.id],
    queryFn: async (): Promise<Rental[]> => {
      if (!session?.user?.id) return [];
      return await rentalsService.getUserRentalsById(session.user.id);
    },
    enabled: !!session?.user?.id,
  });

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
      handleResetQuery("session-rentals");
    }
    return;
  };
  return (
    <div className="flex justify-center items-center flex-col gap-8 w-full sm:px-10">
      <UserProfileCard
        image={session?.user.image}
        name={session?.user.name}
        email={session?.user.email}
      />
      <RentalHistory rentals={rentals} handleUpdateStatus={updateStatus} />
    </div>
  );
};
