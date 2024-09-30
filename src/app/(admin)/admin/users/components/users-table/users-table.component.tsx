"use client";

import React from "react";
import { IUser } from "@/app/common/types/user.interface";
import { userRoles } from "@/constants/user-roles";
import Image from "next/image";
import { useUserTable } from "../../hooks/user-table.hook";

export const UsersTable = ({ allUsers }: { allUsers: Array<IUser> }) => {
  const { selectedRoles, handleRoleChange } = useUserTable(allUsers);
  return (
    <div className="w-9/12 xl:max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 text-lg font-semibold text-gray-700 border-b border-gray-200">
        Usuários Registrados
      </div>
      <div className="p-4 text-base font-medium text-gray-500 border-b border-gray-200 hidden md:flex md:justify-between bg-gray-100">
        <p>name</p>
        <p>email</p>
        <p>role</p>
      </div>
      {allUsers.map((user: IUser, index: number) => (
        <div
          key={user.id}
          className="flex items-center px-4 py-2 border-b border-gray-200 hover:bg-gray-100 group"
        >
          <div className="flex-shrink-0 mr-3">
            <Image
              src={user.image}
              alt={user.name}
              height={45}
              width={45}
              className="rounded-full"
            />
          </div>
          <div className="flex-grow md:flex md:justify-between md:items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
            <p className="text-xs xs:text-sm font-medium text-gray-900">
              {user.name}
            </p>
            <p className="text-xs xs:text-sm text-gray-600 md:text-center">
              {user.email}
            </p>
            <select
              className="cursor-pointer bg-white border border-gray-300 rounded-md text-gray-700 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary transition duration-200 ease-in-out"
              value={selectedRoles[index]}
              onChange={(event) => handleRoleChange(user.id, index, event)}
            >
              {userRoles.map((role, i) => (
                <option key={i} value={role} className="cursor-pointer">
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};
