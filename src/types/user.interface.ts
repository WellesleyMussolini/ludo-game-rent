export interface IUser {
  id: string,
  name: string,
  email: string,
  emailVerified: Date | null;
  password: null,
  image: string,
  role: string,
};

export interface ISession {
  user: {
    name: string,
    email: string,
    image: string,
    role: string,
  },
  expires: string,
};