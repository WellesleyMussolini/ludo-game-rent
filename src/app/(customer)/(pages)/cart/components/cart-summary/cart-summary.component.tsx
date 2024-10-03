"use client";

import React from "react";
import { useContext } from "@/context/context";
import { CartList } from "../cart-list/cart-list.component";
import {
  PrimaryButton,
  PrimaryButtonTypes,
} from "@/app/components/primary-button";
import { ErrorMessage } from "@/app/components/error-message/error-message.component";
import { calculateCartAmount } from "../../utils/calculate-cart-amount";

export const CartSummary = () => {
  const { cart } = useContext();
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
          sm:w-[80%]
          min-[400px]:px-10 
          "
          >
            <h1 className="px-5 min-[400px]:px-0 text-2xl font-bold mb-8 w-full">
              Carrinho
            </h1>
            <CartList />
            <div className="min-[400px]:px-0 px-5 mt-8">
              <div className="flex justify-between py-2 border-t">
                <span className="text-xl max-[400px]:text-lg font-bold">
                  Total
                </span>
                <span className="text-primary text-xl max-[400px]:text-lg font-bold">
                  R$ {calculateCartAmount(cart)}
                </span>
              </div>
              <PrimaryButton
                styles="mt-8"
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
