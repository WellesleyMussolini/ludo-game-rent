"use client"

import React from 'react';
import { IBoardGame } from '@/interfaces/boardgame.interface';

interface IContext {
    cart: Array<IBoardGame>,
    setCart: React.Dispatch<React.SetStateAction<Array<IBoardGame>>>,
};

const ContextProvider = React.createContext<IContext | undefined>(undefined);

interface IProviderProps { children: React.ReactNode };

export const ThemeProvider = ({ children }: IProviderProps) => {
    const [cart, setCart] = React.useState<Array<IBoardGame>>([]);

    return <ContextProvider.Provider value={{ cart, setCart }}>{children}</ContextProvider.Provider>;
};

export const useContext = (): IContext => {
    const context = React.useContext(ContextProvider);
    if (!context) {
        throw new Error('useContext must be used within a ContextProvider');
    };
    return context;
};