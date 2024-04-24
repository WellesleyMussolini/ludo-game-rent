"use client"

import Sidebar from "../sidebar/sidebar.layout"
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LogoutModal } from "@/app/components/modal/logout/logout-modal.component";
import { signOut } from "next-auth/react";
import React from "react";
import { useContext } from "@/context/context";
import { Header } from "../header/header.layout";

export const LayoutWrapper = () => {
    const {userOptions, setUserOptions} = useContext(); 
    return <>
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

        <LogoutModal
            handleLogout={signOut}
            handleCloseModal={() => setUserOptions(prevState => ({ ...prevState, isLogoutModalOpen: false }))}
            visibility={userOptions.isLogoutModalOpen}
        />
        <Header />
        <Sidebar />
    </>
};