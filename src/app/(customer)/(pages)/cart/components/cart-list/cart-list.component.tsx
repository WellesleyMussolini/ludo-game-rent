"use client";

import React from "react";
import { useContext } from "@/app/common/context/context";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { sizeIcons } from "@/app/common/constants/size-icons";
import { removeCartItem } from "../../utils/remove-cart-item";
import { BoardGame } from "@/app/common/types/boardgame.types";

export const CartList = () => {
  const { cart, setCart } = useContext();
  return (
    <div className="overflow-y-auto h-36 max-[400px]:h-28 sm:h-auto max overflow-x-hidden">
      {cart.map((item: BoardGame, index: number) => {
        return (
          <div
            key={index}
            className="flex items-center justify-between mb-4 max-[400px]:px-3 py-3 break-words"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-start flex-row">
                <Image
                  className="max-[400px]:w-16 max-[400px]:h-16 w-24 h-24 rounded-md object-cover mr-4"
                  src={item.image}
                  alt={item.name}
                  width={0}
                  height={0}
                />
                <div className="flex flex-col">
                  <h2 className="text-sm sm:text-lg font-semibold w-full">
                    {item.name}
                  </h2>
                  <p className="text-xs sm:text-base text-gray-600 w-full">
                    {item.status}
                  </p>
                  <p className="text-green-600 sm:text-lg">R${item.price}</p>
                </div>
              </div>
            </div>
            <FaTrashAlt
              onClick={() => removeCartItem(cart, setCart, item.id)}
              size={sizeIcons.small}
              className="text-error cursor-pointer duration-300 hover:scale-125 mr-1"
            />
          </div>
        );
      })}
    </div>
  );
};
