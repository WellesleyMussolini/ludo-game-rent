import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "../globals.css";
import { Provider } from "@/app/common/utils/lib/provider/provider";
import { ThemeProvider } from "@/app/common/context/context";
import React from "react";
import { LayoutWrapper } from "./layout/wrapper/wrapper.layout";
import { LoadingScreen } from "../common/components/loading/loading-screen/loading-screen.component";
import { ProgressBar } from "../common/components/progress-bar/progress-bar.component";

const font = Roboto({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LudoCafé",
  description:
    "Oferecemos uma seleção diversificada de jogos de tabuleiro para aluguel. Nosso catálogo abrange desde clássicos a jogos modernos. Em vez de comprar jogos caros, alugue e experimente novos títulos quando quiser. Reserve seu jogo hoje e divirta-se!",
  icons: {
    icon: "../images/joystick.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-background`}>
        <Provider>
          <ProgressBar />
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
}
