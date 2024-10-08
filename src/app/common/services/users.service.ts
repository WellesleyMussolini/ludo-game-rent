import { IUser } from "../types/user.interface";
import { httpRequest } from "../utils/http-request";
import userMapper, { ResponseUser } from "./mapper/user.mapper";

class Users {
  async get(): Promise<IUser[]> {
    const response = await httpRequest("users", {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    const findAllUsers: ResponseUser[] = await response.json();

    return findAllUsers.map((user: ResponseUser) => userMapper.toDomain(user));
  }

  async getById(id: string): Promise<IUser | null> {
    const response = await httpRequest(`users/get-by-id/${id}`, {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
      },
    });

    const findUser: ResponseUser = await response.json();

    if (!findUser) return null;

    return userMapper.toDomain(findUser);
  }

  async update(id: string, role: string): Promise<IUser> {
    const response = await httpRequest(`users/${id}`, {
      method: "PUT",
      headers: {
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role: role }),
    });

    const update = await response.json();

    return userMapper.toDomain(update);
  }
}

export const usersService = new Users();

export const findAllUsers = await usersService.get();
