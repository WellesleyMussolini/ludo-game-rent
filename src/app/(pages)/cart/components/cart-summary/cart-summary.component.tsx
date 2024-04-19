"use client"
import { OverlayBackground } from "@/app/components/overlay-background/overlay-background.component";
import { PrimaryButton } from "@/app/components/primary-button/primary-button.component";
import { EnumPrimaryButton } from "@/app/components/primary-button/primary-button.interface";
import { useContext } from "@/context/context"
import { CartItem } from "../cart-item/cart-item.component";
import { EnumCartSummaryAnimation, ICartSummary } from "./cart-summary.interface";
import React from "react";

export const CartSummary = ({ visibility, handleVisibility }: ICartSummary) => {
    const { cart } = useContext();
    const [animation, setAnimation] = React.useState<string>(EnumCartSummaryAnimation.ANIMATION_SLIDE_IN)

    const handleCloseCart = React.useCallback(() => {
        setAnimation(EnumCartSummaryAnimation.ANIMATION_SLIDE_OUT);
        setTimeout(() => {
            handleVisibility(false);
            setAnimation(EnumCartSummaryAnimation.ANIMATION_SLIDE_IN);
        }, 250);
    }, [handleVisibility, setAnimation]);
    

    React.useEffect(() => {
        if (!cart.length) {
            setTimeout(() => {
                handleCloseCart();
            }, 500);
        }
    }, [cart, handleCloseCart]);
    return <>
        {
            visibility &&
            <div>
                <OverlayBackground onClick={handleCloseCart} />
                <div className={`${animation} flex flex-col fixed top-0 right-0 bg-white h-screen w-72 z-50`}>
                    <div className="flex justify-center items-center flex-col relative h-1/2 max-h-4/5">
                        <CartItem />
                    </div>

                    <div className="flex justify-center items-center flex-col gap-5">
                        <div className="border-gray-300 border w-full"></div>
                        <div className="flex justify-between w-full px-4">
                            <p className="text-gray-500">Total</p>
                            <p className="font-medium">R$400</p>
                        </div>
                        <div className="w-full flex flex-col gap-3 px-4">
                            <PrimaryButton onClick={() => { }} text="finalizar" type={EnumPrimaryButton.SECONDARY} />
                            <PrimaryButton onClick={() => { }} text="continuar navegando" type={EnumPrimaryButton.OUTLINED} />
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
};