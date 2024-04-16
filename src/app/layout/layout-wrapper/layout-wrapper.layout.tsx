"use client"

import Sidebar from "../sidebar/sidebar.layout"
import { Header } from "../header/header.layout";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const LayoutWrapper = () => {
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
        {/* <Header /> */}
        <Sidebar />
    </>
};