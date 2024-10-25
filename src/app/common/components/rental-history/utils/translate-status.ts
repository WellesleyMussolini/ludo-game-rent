import { RentalStatus } from "@/app/common/types/rental.types";

export const translateStatus = (status: RentalStatus) => {
  if (status === RentalStatus.ACTIVE) return "alugado";
  if (status === RentalStatus.OVERDUE) return "atrasado";
  if (status === RentalStatus.RETURNED) return "devolvido";
};
