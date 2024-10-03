import { IUser } from "../../types/user.interface";

interface ResponseUser extends IUser {}

class UserMapper {
  toDomain(persistence: ResponseUser): IUser {
    return {
      id: persistence.id,
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
