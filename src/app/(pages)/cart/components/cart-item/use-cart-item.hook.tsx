import { useContext } from "@/context/context";
import React from "react";

export const useCartItem = () => {
    const { cart, setCart } = useContext();
    const [removeBoardgameId, setRemoveBoardgameId] = React.useState<string | null>(null);

    const removeBoardGameFromCart = (id: string) => {
        setRemoveBoardgameId(id);
        setTimeout(() => {
            setCart(cart.filter(item => item.id !== id));
            setRemoveBoardgameId(null);
        }, 300);
    };

    return {cart, removeBoardgameId, removeBoardGameFromCart};
};