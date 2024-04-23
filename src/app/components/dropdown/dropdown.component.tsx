"use client";

import React from "react";
import { IDropdown } from "./dropdown.interface";

export const Dropdown = ({ isOpen, width, content }: IDropdown) => (
    <>
        {isOpen && (
            <div style={{width: width || "100%"}} className={`absolute top-0 right-0 bg-white rounded-lg shadow-md border`}>
                <ul className="py-2 px-2">
                    {content}
                </ul>
            </div>
        )}
    </>
);