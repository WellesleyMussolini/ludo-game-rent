export enum RentalStatus {
  ACTIVE = "active",
  OVERDUE = "overdue",
  RETURNED = "returned",
}

export type Rental = {
  id?: string;
  userId: string;
  userName: string;
  userImage: string;
  userEmail: string;
  boardgameId: string;
  boardgameName: string;
  boardgameImage: string;
  price: string;
  rentalDurationDays: string;
  rentalStartDate?: string;
  rentalEndDate?: string;
  rentalStatus?: RentalStatus;
};
