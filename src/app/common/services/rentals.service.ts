import { Rental, RentalStatus } from "../types/rental.types";
import { httpRequest } from "../utils/http-request";
import rentalMapper, { ResponseRental } from "./mapper/rental.mapper";

class Rentals {
  async get(): Promise<Rental[]> {
    const response = await httpRequest("rentals", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    if (!response) return [];

    const findAllRentals: ResponseRental[] = await response.json();

    return findAllRentals.map((rental: ResponseRental) =>
      rentalMapper.toDomain(rental)
    );
  }

  async update({
    id,
    boardgameId,
    boardgameName,
    boardgameImage,
    price,
    rentalDurationDays,
    rentalStatus,
  }: Rental): Promise<Rental> {
    const response = await httpRequest(`users/${id}`, {
      method: "PUT",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        boardgameId,
        boardgameName,
        boardgameImage,
        price,
        rentalDurationDays,
        rentalStatus,
      }),
    });

    if (!response) {
      throw new Error("Failed to update Rental");
    }

    const update = await response.json();

    return rentalMapper.toDomain(update);
  }

  async create({
    userId,
    userName,
    userImage,
    userEmail,
    boardgameId,
    boardgameImage,
    boardgameName,
    price,
    rentalDurationDays,
  }: Rental): Promise<Rental> {
    const response = await httpRequest(`rentals/`, {
      method: "POST",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        userName,
        userImage,
        userEmail,
        boardgameId,
        boardgameImage,
        boardgameName,
        price,
        rentalDurationDays,
      }),
    });

    if (!response) {
      throw new Error("Failed to create Rental"); // Handle null response
    }

    const createdRental = await response.json();
    return rentalMapper.toDomain(createdRental);
  }
}

export const rentalsService = new Rentals();

export const findAllRentals = await rentalsService.get();
