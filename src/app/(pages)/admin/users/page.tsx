"use server"

import { UserList } from "./components/user-list/user-list.component";

export default async function Users() {
    return (
        <div className="flex justify-center items-center min-h-screen pt-24 bg-gray-50">
                <UserList />
        </div>
    );
}