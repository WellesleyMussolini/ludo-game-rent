"use server"

import { ErrorMessage } from "@/app/components/error-message/error-message.component";
import { prisma } from "@/utils/lib/database/prisma";
import Image from "next/image"

export const UserList = async () => {
    const findAllUsers = await prisma.user.findMany({ orderBy: { id: "desc" } });
    return <>
        {
            findAllUsers === null
                ?
                <ErrorMessage title="404" message="Não foi possível listar os usuários" />
                :
                <div className="w-9/12 xl:max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-4 text-lg font-semibold text-gray-700 border-b border-gray-200">Usuários Registrados</div>
                    <div className="p-4 text-base font-medium text-gray-500 border-b border-gray-200 hidden sm:flex sm:justify-between bg-gray-100">
                        <p>name</p>
                        <p>email</p>
                        <p>role</p>
                    </div>
                    <>
                        {
                            findAllUsers.map((user, index) => (
                                <li key={index} className="flex items-center px-4 py-2 border-b border-gray-200 hover:bg-gray-100">
                                    <div className="flex-shrink-0 mr-3">
                                        <Image
                                            src={user.image ?? ""}
                                            alt={user.name ?? ""}
                                            height={45}
                                            width={45}
                                            className="rounded-full"
                                        />
                                    </div>
                                    <div className="flex-grow sm:flex sm:justify-between sm:items-center">
                                        <p className="text-sm font-medium text-gray-900 sm:w-40 sm:overflow-hidden sm:overflow-ellipsis sm:whitespace-nowrap">{user.name}</p>
                                        <p className="text-sm text-gray-600 sm:w-9/12 md:w-6/12 lg:w-4/12 sm:text-start">{user.email}</p>
                                        <p className="text-sm text-gray-500 sm:w-16 sm:text-end">{user.role}</p>
                                    </div>
                                </li>
                            ))}
                    </>
                </div>
        }
    </>
};