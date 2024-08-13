"use server"

import { checkAdminSession } from "@/utils/check-admin-session";
import { ErrorMessage } from "@/app/components/error-message/error-message.component";
import { UsersTable } from "./components/users-table/users-table.component";
import { findAllUsers } from "@/services/find-all-users.service";

export default async function Users() {
    await checkAdminSession();
    return (
        <div className="flex justify-center items-center min-h-screen pt-24 bg-gray-50">
            <>
                {
                    findAllUsers === null
                    ?
                    <ErrorMessage title="404" message="Não foi possível listar os usuários" />
                    :
                    <UsersTable />
                }
            </>
        </div>
    );
};