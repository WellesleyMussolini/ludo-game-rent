"use client"

import React from 'react';
import { IBoardGame } from '@/types/boardgame.interface';

interface IUserOptions {
    isLogoutModalOpen: boolean;
    isUserOptionsOpen: boolean;
};

interface IContext {
    cart: Array<IBoardGame>,
    setCart: React.Dispatch<React.SetStateAction<Array<IBoardGame>>>,
    expandedSidebar: boolean,
    setExpandedSidebar: (expandedSidebar: boolean) => void,
    userOptions: {isLogoutModalOpen: boolean, isUserOptionsOpen: boolean},
    setUserOptions: React.Dispatch<React.SetStateAction<IUserOptions>>;
};

const ContextProvider = React.createContext<IContext | undefined>(undefined);

interface IProviderProps { children: React.ReactNode };

export const ThemeProvider = ({ children }: IProviderProps) => {
    const [cart, setCart] = React.useState<Array<IBoardGame>>([]);
    const [userOptions, setUserOptions] = React.useState({
        isLogoutModalOpen: false,
        isUserOptionsOpen: false,
    });
    const [expandedSidebar, setExpandedSidebar] = React.useState<boolean>(false)

    return <ContextProvider.Provider value={{
        cart, 
        expandedSidebar, 
        setCart, 
        setExpandedSidebar,
        userOptions,
        setUserOptions,
    }}>{children}</ContextProvider.Provider>;
};

export const useContext = (): IContext => {
    const context = React.useContext(ContextProvider);
    if (!context) {
        throw new Error('useContext must be used within a ContextProvider');
    };
    return context;
};