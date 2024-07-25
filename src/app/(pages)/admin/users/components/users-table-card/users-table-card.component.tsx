import { EnumCheckUserRoles } from "@/types/check-user-role.enum";
import { TableCardDetails } from "./components/table-card-details/table-card-details.component";
import { TableCardImage } from "./components/table-card-image/table-card-image.component";
import { IUser } from "@/types/user.interface";

export const UsersTableCard = ({ user }: { user: IUser }) => (
    <div className="flex items-center px-4 py-2 border-b border-gray-200 hover:bg-gray-100 group">
        <TableCardImage image={user.image} alt={user.name} />
        <TableCardDetails id={user.id} name={user.name} email={user.email} role={user.role as EnumCheckUserRoles} />
    </div>
);