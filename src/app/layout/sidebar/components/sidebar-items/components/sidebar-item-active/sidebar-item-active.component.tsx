import React from "react";

interface ISidebarItemActive { active: boolean, onClick: () => void, children: React.ReactNode };

export const SidebarItemActive = ({ active, onClick, children }: ISidebarItemActive) => {
    return (
        <li className={`
                relative 
                flex 
                items-center 
                py-2 
                px-3 
                my-1
                
                font-medium 
                rounded-md 
                cursor-pointer
                transition-colors 
                group
                ${active ?
                "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                :
                "hover:bg-indigo-50 text-gray-600"}`}
                onClick={onClick}>{children}</li>
    );
};