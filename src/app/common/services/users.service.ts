import { IUser } from "../types/user.interface";
import { ludoApi } from "./api/ludo.api";
import userMapper from "./mapper/user.mapper";

class Users {
  async get(): Promise<IUser[]> {
    const findAllUsers = await ludoApi.users.findAll();

    return findAllUsers.map((user: IUser) => userMapper.toDomain(user));
  }
}

const usersService = new Users();

export const findAllUsers = await usersService.get();
