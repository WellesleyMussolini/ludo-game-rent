"use client";

import React from "react";
import { useContext } from "@/app/common/context/context";
import { ErrorMessage } from "@/app/common/components/error-message/error-message.component";
import { calculateCartAmount } from "../../utils/calculate-cart-amount";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/common/components/buttons";
import { FaTrashAlt } from "react-icons/fa";
import { removeCartItem } from "../../utils/remove-cart-item";
import Image from "next/image";
import { BoardGame } from "@/app/common/types/boardgame.types";

export const CartSummary = () => {
  const { cart, setCart } = useContext();
  return (
    <>
      {cart.length !== 0 ? (
        <div className="p-10 flex justify-center items-start md:mt-0 break-words w-full">
          <div
            className="
          bg-white
          rounded-lg
          shadow-xl
          w-full
          max-w-2xl
          py-10
          sm:w-4/5
          "
          >
            <h1 className="px-5 lg sm:text-xl md:text-2xl font-bold mb-8 w-full min-[400px]:px-10 whitespace-nowrap overflow-hidden text-ellipsis">
              Carrinho
            </h1>
            {/* cart list */}
            <div className="overflow-y-auto h-36 max-[400px]:h-28 sm:h-auto max overflow-x-hidden">
              {cart.map((item: BoardGame, index: number) => {
                return (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-4 max-[400px]:px-3 py-3 break-words"
                  >
                    <div className="flex items-center justify-between w-full min-[400px]:pl-10">
                      <Image
                        className="w-12 h-12 xs:w-16 xs:h-16 sm:w-24 sm:h-24 rounded-md object-cover mr-2"
                        src={item.image}
                        alt={item.name}
                        width={0}
                        height={0}
                      />
                      <div
                        className="
                flex 
                flex-col 
                w-full
                whitespace-nowrap 
                overflow-hidden 
                text-ellipsis"
                      >
                        <h2
                          className="
                  w-11/12
                  whitespace-nowrap 
                  overflow-hidden 
                  text-ellipsis
                  text-[10px] 
                  xs:text-xs 
                  sm:text-sm 
                  md:text-base
                  lg:text-lg 
                  font-semibold"
                        >
                          {item.name}
                        </h2>
                        <p className="text-[10px] xs:text-xs sm:text-sm lg:text-base text-gray-600 w-full">
                          {item.status}
                        </p>
                        <p className="text-green-600 text-xs xs:text-sm sm:text-base lg:text-lg">
                          R${item.price}
                        </p>
                      </div>
                      <FaTrashAlt
                        onClick={() => removeCartItem(cart, setCart, item.id)}
                        className="text-error cursor-pointer text-xl sm:text-3xl min-w-[20px] min-h-[20px] duration-300 hover:scale-125 max-xs:ml-2 min-[400px]:mr-10"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* price amount */}
            <div className="min-[400px]:px-10 px-5 mt-8">
              <div className="flex flex-row max-[220px]:flex max-[220px]:flex-col justify-between py-2 border-t">
                <span className="text-sm min-[280px]:text-base sm:text-xl font-bold">
                  Total
                </span>
                <span className="text-primary text-sm min-[280px]:text-base sm:text-xl font-bold">
                  R$ {calculateCartAmount(cart)}
                </span>
              </div>
              <PrimaryButton
                styles="min-[220px]:mt-4 sm:mt-4 text-[10px] xs:text-sm"
                text="Finalizar"
                onClick={() => {}}
                type={PrimaryButtonTypes.PRIMARY}
              />
            </div>
          </div>
        </div>
      ) : (
        <ErrorMessage
          title="OPS... O CARRINHO ESTÁ VAZIO"
          message="Adicione produtos ao seu carrinho"
        />
      )}
    </>
  );
};
