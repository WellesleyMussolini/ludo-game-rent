import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { Provider } from "@/utils/lib/provider/provider";
import { ThemeProvider } from "@/context/context";
import React from "react";
import { LayoutWrapper } from "./layout/wrapper/wrapper.layout";
import { LoadingScreen } from "../components/loading/loading-screen/loading-screen.component";

const font = Roboto({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LudoCafé",
  description: "Oferecemos uma seleção diversificada de jogos de tabuleiro para aluguel. Nosso catálogo abrange desde clássicos a jogos modernos. Em vez de comprar jogos caros, alugue e experimente novos títulos quando quiser. Reserve seu jogo hoje e divirta-se!",
  icons: {
    icon: "../images/joystick.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-background`}>
        <Provider>
          <ThemeProvider>
            <React.Suspense fallback={<LoadingScreen />}>
              <LayoutWrapper />
              {children}
            </React.Suspense>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
};