"use client"

import { MoreVertical } from "lucide-react";
import { useSidebar } from "../../hooks/use-sidebar.hook";
import { MdLogin } from "react-icons/md";
import { SidebarItemActive } from "../sidebar-items/components/sidebar-item-active/sidebar-item-active.component";
import { SidebarText } from "../sidebar-items/components/sidebar-text/sidebar-text.component";
import { SidebarAlert } from "../sidebar-items/components/sidebar-alert/sidebar-alert.component";
import { SidebarToolTip } from "../sidebar-items/components/sidebar-tooltip/sidebar-tooltip.component";
import { UserProfilePicture } from "@/app/components/user-profile-picture/user-profile-picture.component";
import { signOut } from "next-auth/react";

export const SidebarAccountMenu = () => {
    const { expandedSidebar, session, authenticated, router, isLoading } = useSidebar();
    return (
        <>
            <div className={`${!authenticated && !isLoading && "hidden"} border-t flex justify-center items-center p-3`}>
                <UserProfilePicture />
                <div className={`${!authenticated && "hidden"} flex justify-between items-center overflow-hidden transition-all ${expandedSidebar ? "w-52 ml-3" : "w-0 ml-0"}`}>
                    <div className="leading-4">
                        <h4 className="text-gray-600 text-[13px] font-semibold">{session?.user?.name}</h4>
                        <span className="text-xs text-gray-600">{session?.user?.email}</span>
                    </div>
                    <MoreVertical size={20} onClick={() => signOut()} />
                </div>
            </div>
            <div>
                <hr className={`${authenticated && "hidden" || isLoading && "hidden"} my-3`} />
                {
                    !authenticated && !isLoading &&
                    <div className="pb-3 flex items-center justify-center">
                        <SidebarItemActive active={false} onClick={() => router.push("/login")}>
                            <MdLogin size={25} />
                            <SidebarText text={"Conectar?"} />
                            <SidebarAlert alert={false} />
                            <SidebarToolTip text={"Conectar?"} />
                        </SidebarItemActive>
                    </div>
                }
            </div>
        </>
    );
};

// !authenticated ?
//     <div className="border-t flex justify-center items-center p-3">
//         <ImageComponent
//             image={session?.user?.image ?? ""}
//             alt={session?.user?.name ?? ""}
//             className="w-[50px] rounded-full"
//         />
//         <div className={`flex justify-between items-center overflow-hidden transition-all ${expandedSidebar ? "w-52 ml-3" : "w-0 ml-0"}`}>
//             <div className="leading-4">
//                 <h4 className="font-semibold">{session?.user?.name}</h4>
//                 <span className="text-xs text-gray-600">{session?.user?.email}</span>
//             </div>
//             <MoreVertical size={20} />
//         </div>
//     </div>
//     :
//     <div className={`border-t flex justify-center items-center py-3
//     `}>
//         <MdLogin size={30} className="text-gray-500 cursor-pointer hover:text-gray-700" onClick={() => redirect("/login")} />
//         <p className={`overflow-hidden transition-all ${expandedSidebar ? "w-52 ml-3" : "w-0"}`}>Entrar</p>
//     </div>