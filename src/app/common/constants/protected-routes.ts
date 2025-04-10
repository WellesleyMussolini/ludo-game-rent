import { Pathnames } from "@/app/common/types/pathnames.enum";

export const adminProtectedRoutes = [
  Pathnames.ADMIN,
  Pathnames.ADMIN_USERS,
  Pathnames.ADMIN_RENTALS,
];

// Nome de sugestão = authenticatedRoutes
export const isNotAuthenticatedProtectedRoutes = [
  Pathnames.USER,
  Pathnames.CART,
  Pathnames.GET_STARTED,
];

export const unauthenticatedRoutes = [Pathnames.HOME, Pathnames.ABOUT];
