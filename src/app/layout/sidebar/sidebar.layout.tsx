import Hamburger from "hamburger-react";
import { siderbarMock } from "./mock/sidebar.mock";
import Link from "next/link";

export const Sidebar = ({ openSidebar, handleOpenSidebar }: { openSidebar: boolean, handleOpenSidebar: (openSidebar: boolean) => void }) => {
    return (
        <div
            className={`absolute top-0 rounded-md h-full duration-300 bg-white shadow-md z-10 overflow-x-hidden ${openSidebar ? "w-48" : "w-0"}`}>
            <div className="h-20 flex items-center justify-center w-full">
                <div onClick={() => handleOpenSidebar(!openSidebar)} className={`flex items-center text-gray-500`}><Hamburger size={26} toggled={openSidebar} /></div>
            </div>
            <ul className="flex items-center justify-center px-3" style={{height: "calc(100vh - 80px)"}}>
                {
                    siderbarMock.map((item: any, index: number) => (
                        <Link className="w-full flex items-center justify-center text-gray-500 rounded hover:bg-primary hover:text-white py-2" key={index} href={item.route}>
                            {item.icon}
                            <p>{item.text}</p>
                        </Link>
                    ))
                }
            </ul>
        </div>
    )
};