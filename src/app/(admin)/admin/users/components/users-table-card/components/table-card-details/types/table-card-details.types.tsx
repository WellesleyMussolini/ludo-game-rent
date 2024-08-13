import { EnumCheckUserRoles } from "@/types/check-user-role.enum";

export interface ITableCardDetails { 
    id: string, 
    name: string, 
    email: string, 
    role: EnumCheckUserRoles 
};