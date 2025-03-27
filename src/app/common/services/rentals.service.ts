import { Rental, RentalStatus } from "../types/rental.types";
import { RequestMethods } from "../types/request-methods.enum";
import { handleHttpRequest } from "../utils/handle-http-request";
import rentalMapper, { ResponseRental } from "./mapper/rental.mapper";

const url = process.env.NEXT_PUBLIC_API_URL;
class Rentals {
  async get(): Promise<Rental[]> {
    const response = await handleHttpRequest(
      url,
      "rentals",
      RequestMethods.GET
    );

    if (!response) return []; // Return an empty array if the response is null (404)

    const findAllRentals: ResponseRental[] = await response.json();

    return findAllRentals.map((rental: ResponseRental) =>
      rentalMapper.toDomain(rental)
    );
  }

  async getRentalById(id: string): Promise<Rental[]> {
    const response = await handleHttpRequest(
      url,
      `rentals/get-rentals-by-id/${id}`,
      RequestMethods.GET
    );

    if (!response) return []; // Return an empty array if the response is null (404)

    const findAllRentals: ResponseRental[] = await response.json();

    return findAllRentals.map((rental: ResponseRental) =>
      rentalMapper.toDomain(rental)
    );
  }

  async getUserRentalsById(id: string): Promise<Rental[]> {
    const response = await handleHttpRequest(
      url,
      `rentals/get-rentals-by-user/${id}`,
      RequestMethods.GET
    );

    if (!response) return []; // Return an empty array if the response is null (404)

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
    rentalStartDate,
  }: Rental): Promise<Rental> {
    const requestBody: Rental = {
      userId,
      userName,
      userImage,
      userEmail,
      boardgameId,
      boardgameImage,
      boardgameName,
      price,
      rentalDurationDays,
      rentalStatus: rentalStatus ?? RentalStatus.ACTIVE,
      rentalStartDate,
    };

    const response = await handleHttpRequest(
      url,
      `rentals/${id}`,
      RequestMethods.PUT,
      requestBody
    );

    if (!response) throw new Error("Failed to update Rental");

    const updatedRental = await response.json();
    return rentalMapper.toDomain(updatedRental);
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
    const response = await handleHttpRequest(
      url,
      `rentals/`,
      RequestMethods.POST,
      {
        userId,
        userName,
        userImage,
        userEmail,
        boardgameId,
        boardgameImage,
        boardgameName,
        price,
        rentalDurationDays,
      }
    );

    if (!response) {
      throw new Error("Failed to create Rental"); // Handle null response
    }

    const createdRental = await response.json();
    return rentalMapper.toDomain(createdRental);
  }
}

export const rentalsService = new Rentals();
