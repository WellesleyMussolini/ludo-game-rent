import { UserRoles } from "./user-roles.enum";

export interface IUser {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  password?: null;
  image: string;
  role: UserRoles;
  cpf: string | null;
}

export interface Session extends IUser {
  expires: string;
}

export interface IAuth {
  user: IUser;
  expires: string;
}
