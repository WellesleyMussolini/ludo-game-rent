"use client"

import React from 'react';
import { IBoardGame } from '@/interfaces/boardgame.interface';

interface IContext {
    cart: Array<IBoardGame>,
    setCart: React.Dispatch<React.SetStateAction<Array<IBoardGame>>>,
    expandedSidebar: boolean,
    setExpandedSidebar: (expandedSidebar: boolean) => void,
};

const ContextProvider = React.createContext<IContext | undefined>(undefined);

interface IProviderProps { children: React.ReactNode };

export const ThemeProvider = ({ children }: IProviderProps) => {
    const [cart, setCart] = React.useState<Array<IBoardGame>>([]);
    const [expandedSidebar, setExpandedSidebar] = React.useState<boolean>(false)

    return <ContextProvider.Provider value={{
        cart, expandedSidebar, setCart, setExpandedSidebar
    }}>{children}</ContextProvider.Provider>;
};

export const useContext = (): IContext => {
    const context = React.useContext(ContextProvider);
    if (!context) {
        throw new Error('useContext must be used within a ContextProvider');
    };
    return context;
};