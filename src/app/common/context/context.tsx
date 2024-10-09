"use client";

import React from "react";
import { BoardGame } from "@/app/common/types/boardgame.types";
import { CardStatus } from "../components/card/types/card.types";

interface IContext {
  cart: Array<BoardGame>;
  setCart: React.Dispatch<React.SetStateAction<Array<BoardGame>>>;
  expandedSidebar: boolean;
  setExpandedSidebar: (expandedSidebar: boolean) => void;
  isVisible: {
    logout: boolean;
    deleteBoardGame: boolean;
    createBoardGame: boolean;
    updateBoardGame: boolean;
  };
  setIsVisible: React.Dispatch<
    React.SetStateAction<{
      logout: boolean;
      deleteBoardGame: boolean;
      createBoardGame: boolean;
      updateBoardGame: boolean;
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
    status: CardStatus.AVAILABLE,
    ageToPlay: "",
    playTime: "",
    minimumPlayersToPlay: "",
    maximumPlayersToPlay: "",
    description: "",
  });

  const [isVisible, setIsVisible] = React.useState<{
    logout: boolean;
    deleteBoardGame: boolean;
    createBoardGame: boolean;
    updateBoardGame: boolean;
  }>({
    logout: false,
    deleteBoardGame: false,
    createBoardGame: false,
    updateBoardGame: false,
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
        boardgame,
        setBoardGame,
        isVisible,
        setIsVisible,
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
