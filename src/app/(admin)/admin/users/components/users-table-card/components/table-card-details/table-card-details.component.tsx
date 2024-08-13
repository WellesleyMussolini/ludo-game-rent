"use client";

import React from "react";
import { userRoles } from "@/constants/user-roles";
import { useTableCardDetails } from "./hooks/table-card-details.hook";
import { ITableCardDetails } from "./types/table-card-details.types";

export const TableCardDetails = ({ id, name, email, role }: ITableCardDetails) => {
    const {selectedRole, handleRoleChange} = useTableCardDetails(id, role)
    return (
        <div className="flex-grow md:flex md:justify-between md:items-center overflow-hidden overflow-ellipsis whitespace-nowrap">
            <p className="text-xs xs:text-sm font-medium text-gray-900">{name}</p>
            <p className="text-xs xs:text-sm text-gray-600 md:text-center">{email}</p>
            <select 
                className={`cursor-pointer group-hover:bg-gray-100 border-none outline-none text-gray-500`}
                value={selectedRole}
                onChange={handleRoleChange}
            >
                {
                    userRoles.map((selectRole, index) => (
                        <option key={index} value={selectRole} className={`cursor-pointer`}>
                            {selectRole}
                        </option>
                    ))
                }
            </select>
        </div>
    );
};