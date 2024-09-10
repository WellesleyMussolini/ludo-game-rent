"use client"

import { useContext } from "@/context/context";
import Sidebar from "../sidebar/sidebar.layout"
import { Squash as Hamburger } from 'hamburger-react'

export const LayoutWrapper = () => {
    const { expandedSidebar, setExpandedSidebar } = useContext();
    return <>
        <div className="p-4 text-gray-600">
            <Hamburger toggled={expandedSidebar} onToggle={() => setExpandedSidebar(!expandedSidebar)} />
        </div>
        <Sidebar />
    </>
};