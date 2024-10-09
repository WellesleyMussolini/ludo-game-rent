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
    isFormVisible: boolean;
  };
  setModals: React.Dispatch<
    React.SetStateAction<{
      logout: boolean;
      deleteBoardGame: boolean;
      isFormVisible: boolean;
    }>
  >;
  boardgame: BoardGame;
  setBoardGame: React.Dispatch<React.SetStateAction<BoardGame>>;
}

const ContextProvider = React.createContext<IContext | undefined>(undefined);

interface IProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: IProviderProps) => {
  const [cart, setCart] = React.useState<Array<BoardGame>>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [boardgame, setBoardGame] = React.useState<BoardGame>({
    id: "",
    name: "",
    image: "",
    price: "",
    status: "",
    ageToPlay: "",
    playTime: "",
    minimumPlayersToPlay: "",
    maximumPlayersToPlay: "",
    description: "",
  });
  const [modals, setModals] = React.useState<{
    isFormVisible: boolean;
    logout: boolean;
    deleteBoardGame: boolean;
  }>({
    logout: false,
    deleteBoardGame: false,
    isFormVisible: false,
  });

  const [expandedSidebar, setExpandedSidebar] = React.useState<boolean>(false);

  // Update local storage whenever the cart changes
  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <ContextProvider.Provider
      value={{
        cart,
        expandedSidebar,
        setCart,
        setExpandedSidebar,
        modals,
        setModals,
        boardgame,
        setBoardGame,
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
