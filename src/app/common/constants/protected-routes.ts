import { Pathnames } from "@/app/common/types/pathnames.enum";

export const adminOnlyRoutes = [
  Pathnames.ADMIN,
  Pathnames.ADMIN_USERS,
  Pathnames.ADMIN_RENTALS,
];

export const authRequiredRoutes = [
  Pathnames.USER,
  Pathnames.CART,
  Pathnames.GET_STARTED,
];

export const publicRoutes = [Pathnames.HOME, Pathnames.ABOUT];
