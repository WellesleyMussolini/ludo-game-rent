import { Rental } from "../../types/rental.types";

export interface ResponseRental extends Rental {
  _id: string;
}

class RentalMapper {
  toDomain(persistence: ResponseRental): Rental {
    return {
      id: persistence._id,
      userId: persistence.userId,
      userName: persistence.userName,
      userImage: persistence.userImage,
      userEmail: persistence.userEmail,
      boardgameId: persistence.boardgameId,
      boardgameName: persistence.boardgameName,
      boardgameImage: persistence.boardgameImage,
      price: persistence.price,
      rentalDurationDays: persistence.rentalDurationDays,
      rentalStartDate: persistence.rentalStartDate,
      rentalEndDate: persistence.rentalEndDate,
      rentalStatus: persistence.rentalStatus,
    };
  }
}

export default new RentalMapper();
