"use client";

import React from "react";

//adicioanr um map dentro do dropdown 

export const Dropdown = ({ isOpen, content }: { isOpen: boolean, content: React.ReactNode | any }) => <div className={`w-full overflow-hidden shadow-md ease-in-out ${isOpen ? 'duration-[0.7s] max-h-[32rem]' : 'duration-[0.35s] max-h-0'}`}>
    <ul className="flex items-center flex-col gap-1 shadow-md border border-opacity-5 border-black bg-white p-2 rounded">{content}</ul>
</div>;