"use client";

import { BoardGame } from "@/app/common/types/boardgame.types";
import React from "react";

interface IContext {
  cart: Array<BoardGame>;
  setCart: React.Dispatch<React.SetStateAction<Array<BoardGame>>>;
  expandedSidebar: boolean;
  setExpandedSidebar: (expandedSidebar: boolean) => void;
  modals: {
    logout: boolean;
    deleteBoardGame: boolean;
  };
  setModals: React.Dispatch<
    React.SetStateAction<{
      logout: boolean;
      deleteBoardGame: boolean;
    }>
  >;
  getBoardGameId: string;
  setGetBoardGameId: (getBoardGameId: string) => void;
}

const ContextProvider = React.createContext<IContext | undefined>(undefined);

interface IProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: IProviderProps) => {
  const [cart, setCart] = React.useState<Array<BoardGame>>([]);
  const [getBoardGameId, setGetBoardGameId] = React.useState<string>("");
  const [modals, setModals] = React.useState<{
    logout: boolean;
    deleteBoardGame: boolean;
  }>({
    logout: false,
    deleteBoardGame: false,
  });

  const [expandedSidebar, setExpandedSidebar] = React.useState<boolean>(false);

  return (
    <ContextProvider.Provider
      value={{
        cart,
        expandedSidebar,
        setCart,
        setExpandedSidebar,
        modals,
        setModals,
        getBoardGameId,
        setGetBoardGameId,
      }}
    >
      {children}
    </ContextProvider.Provider>
  );
};

export const useContext = (): IContext => {
  const context = React.useContext(ContextProvider);
  if (!context) {
    throw new Error("useContext must be used within a ContextProvider");
  }
  return context;
};
