import type { Metadata } from "next";
import { Poppins  } from "next/font/google";
import "./globals.css";
import { Provider } from "@/utils/lib/provider/provider";
import { Header } from "./layout/header/header.layout";
import { EnumHeader } from "./layout/header/header.interface";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { Loading } from "./components/loading/loading.component";

const poppins = Poppins({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-background`}>
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
        <Provider>
          <React.Suspense fallback={<Loading />}>
            <Header type={EnumHeader.DEFAULT} />
            {children}
          </React.Suspense>
        </Provider>
      </body>
    </html >
  );
};