import { RequestMethods } from "../types/request-methods.enum";
import { UserRoles } from "../types/user-roles.enum";
import { IUser } from "../types/user.interface";
import { handleHttpRequest } from "../utils/handle-http-request";
import userMapper, { ResponseUser } from "./mapper/user.mapper";

const url = process.env.NEXT_PUBLIC_API_URL;

class Users {
  async get(): Promise<IUser[]> {
    const response = await handleHttpRequest(url, "users", RequestMethods.GET);

    if (!response) return [];

    const findAllUsers: ResponseUser[] = await response.json();

    return findAllUsers.map((user: ResponseUser) => userMapper.toDomain(user));
  }

  async getById(id: string): Promise<IUser | null> {
    const response = await handleHttpRequest(
      url,
      `users/get-by-id/${id}`,
      RequestMethods.GET
    );

    if (!response) return null;

    const findUser: ResponseUser = await response.json();

    if (!findUser) return null;

    return userMapper.toDomain(findUser);
  }

  async update(id: string | undefined, role?: string): Promise<IUser> {
    const response = await handleHttpRequest(
      url,
      `users/${id}`,
      RequestMethods.PUT,
      {
        role: role || UserRoles.USER,
      }
    );

    if (!response) {
      throw new Error("Failed to update User");
    }

    const update = await response.json();

    return userMapper.toDomain(update);
  }
}

export const usersService = new Users();

export const findAllUsers = await usersService.get();
