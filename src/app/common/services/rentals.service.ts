import { Rental, RentalStatus } from "../types/rental.types";
import { httpRequest } from "../utils/http-request";
import rentalMapper, { ResponseRental } from "./mapper/rental.mapper";

const url = process.env.NEXT_PUBLIC_API_URL;

class Rentals {
  async get(): Promise<Rental[]> {
    const response = await httpRequest(url, "rentals", {
      method: "GET",
      headers: {
        "cache-control": "no-cache",
      },
    });

    if (!response) return [];

    const findAllRentals: ResponseRental[] = await response.json();

    return findAllRentals.map((rental: ResponseRental) =>
      rentalMapper.toDomain(rental)
    );
  }

  async getRentalById(id: string): Promise<Rental[]> {
    const response = await httpRequest(url, `rentals/get-rentals-by-id/${id}`, {
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

  async getUserRentalsById(id: string): Promise<Rental[]> {
    const response = await httpRequest(
      url,
      `rentals/get-rentals-by-user/${id}`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );

    if (!response) return [];

    const findAllRentals: ResponseRental[] = await response.json();

    return findAllRentals.map((rental: ResponseRental) =>
      rentalMapper.toDomain(rental)
    );
  }

  async update({
    id,
    userId,
    userName,
    userImage,
    userEmail,
    boardgameId,
    boardgameImage,
    boardgameName,
    price,
    rentalDurationDays,
    rentalStatus,
  }: Rental): Promise<Rental> {
    const response = await httpRequest(url, `rentals/${id}`, {
      method: "PUT",
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
        rentalStatus,
      }),
    });

    if (!response) {
      throw new Error("Failed to update Rental"); // Handle null response
    }

    const updateRental = await response.json();
    return rentalMapper.toDomain(updateRental);
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
    const response = await httpRequest(url, `rentals/`, {
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
