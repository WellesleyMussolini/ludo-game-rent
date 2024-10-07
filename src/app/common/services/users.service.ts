import { ludoApi } from "./api/ludo.api";
import userMapper, { ResponseUser } from "./mapper/user.mapper";

class Users {
  async get(): Promise<ResponseUser[]> {
    const findAllUsers = await ludoApi.users.findAll();
    console.log({
      findAllUsers,
    });
    return findAllUsers.map((user: ResponseUser) => userMapper.toDomain(user));
  }
}
const usersService = new Users();
export const findAllUsers = await usersService.get();
