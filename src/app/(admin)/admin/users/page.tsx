"use server";

import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { UsersTable } from "./components/users-table/users-table.component";
import { IUser } from "@/app/common/types/user.interface";
import { findAllUsers } from "@/app/common/services/users.service";

export default async function Users() {
  return (
    <div className="flex justify-center items-center py-10">
      {findAllUsers.length === 0 ? (
        <ErrorMessage
          title="404"
          message="Não foi possível listar os usuários"
        />
      ) : (
        <UsersTable allUsers={findAllUsers as Array<IUser>} />
      )}
    </div>
  );
}
