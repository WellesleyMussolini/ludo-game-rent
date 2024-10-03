"use client";

import { useContext } from "@/app/common/context/context";
import Sidebar from "../sidebar/sidebar.layout";
import { Squash as Hamburger } from "hamburger-react";
import { usePathname } from "next/navigation";
import { Pathnames } from "@/app/common/types/pathnames.enum";
import { DeleteBoardGame } from "../../admin/components/modal/delete-boardgame.component";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LayoutWrapper = () => {
  const { expandedSidebar, setExpandedSidebar } = useContext();
  const pathname = usePathname();
  return (
    <>
      <div
        className={`p-4 ${
          pathname === Pathnames.ADMIN_AUTH && "hidden"
        } text-gray-600`}
      >
        <Hamburger
          toggled={expandedSidebar}
          onToggle={() => setExpandedSidebar(!expandedSidebar)}
        />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="colored"
        transition={Bounce}
        className="z-50"
      />
      <DeleteBoardGame />
      <Sidebar />
    </>
  );
};
