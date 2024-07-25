import { UsersTableHeader } from "../users-table-header/users-table-header.component"
import { findAllUsers } from "@/utils/find-all-users"
import { UsersTableCard } from "../users-table-card/users-table-card.component"
import { IUser } from "@/types/user.interface"

export const UsersTable = () => {
    return <div className="w-9/12 xl:max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 text-lg font-semibold text-gray-700 border-b border-gray-200">Usuários Registrados</div>
        <UsersTableHeader />
            {
                findAllUsers.map((user, index) => (
                    <UsersTableCard key={index} user={user as IUser} />
                ))
            }
    </div>
};