import { IUser } from "../../types/user.interface";

export interface ResponseUser extends IUser {
  _id: string;
}

class UserMapper {
  toDomain(persistence: ResponseUser): IUser {
    return {
      id: persistence._id,
      name: persistence.name,
      email: persistence.email,
      emailVerified: persistence.emailVerified,
      password: persistence.password,
      image: persistence.image,
      role: persistence.role,
    };
  }
}

export default new UserMapper();
