"use server"

import { ErrorMessage } from "@/app/components/error-message/error-message.component";
import { UsersTable } from "./components/users-table/users-table.component";
import { findAllUsers } from "@/services/find-all-users.service";
import { IUser } from "@/app/common/types/user.interface";

export default async function Users() {
    return (
        <div className="flex justify-center items-center">
            {
                findAllUsers === null || findAllUsers.length === 0
                    ?
                    <ErrorMessage title="404" message="Não foi possível listar os usuários" />
                    :
                    <UsersTable allUsers={findAllUsers as Array<IUser>} />
            }
        </div>
    );
};