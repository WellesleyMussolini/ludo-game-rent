export interface IUser {
  id: string,
  name: string,
  email: string,
  emailVerified: Date | null,
  password: null,
  image: string,
  role: string,
}

export interface IAuth {
  user: IUser,
  session: {
    expires: string,
  },
};