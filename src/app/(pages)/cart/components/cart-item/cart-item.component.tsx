"use client"

import { ImageComponent } from "@/app/components/image/image.component";
import { IBoardGame } from "@/interfaces/boardgame.interface";
import { formatCurrency } from "@/utils/format-currency";
import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useCartItem } from "./use-cart-item.hook";

export const CartItem = () => {
    const {cart, removeBoardGameFromCart, removeBoardgameId} = useCartItem();
    return (
        <ul className="w-full max-w-md px-4 overflow-y-auto min-h-96 overflow-x-hidden">
            {cart.map((boardgame: IBoardGame, index: number) => (
                <li key={index} className={`flex items-center py-4 ${cart.length > 1 && "border-b"} border-gray-200 ${removeBoardgameId === boardgame.id && "animate-jump-out"}`}>
                    <div className="flex-shrink-0">
                        <ImageComponent image={boardgame.image?? ""} alt={boardgame.name?? ""} width="64px" height="64px" className="rounded-md" />
                    </div>
                    <div className="ml-4 flex-1">
                        <p className="text-gray-800 font-medium">{boardgame.name}</p>
                        <p className="text-gray-500 text-sm">{formatCurrency(boardgame.price)}</p>
                    </div>
                    <FaRegTrashAlt onClick={() => removeBoardGameFromCart(boardgame.id?? "")} size={20} className="text-red-500 cursor-pointer hover:scale-150 duration-300" />
                </li>
            ))}
        </ul>
    );
};