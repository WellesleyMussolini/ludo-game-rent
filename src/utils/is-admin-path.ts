import { EnumPathnames } from "@/types/pathnames.enum";

export function isAdminPath(pathname: string): boolean {
    return pathname.startsWith(EnumPathnames.ADMIN);
};