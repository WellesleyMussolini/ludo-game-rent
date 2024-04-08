"use client"

import { CartSummary } from "@/app/(pages)/cart/components/cart-summary/cart-summary.component";
import { Header } from "../header/header.layout";
import React from "react";

export const HeaderWithShoppingCart = () => {
    const [cartVisibility, setCartVisibility] = React.useState<boolean>(false);
    return (
        <>
            <Header handleCartVisibility={setCartVisibility} />
            <CartSummary visibility={cartVisibility} handleVisibility={setCartVisibility} />
        </>
    );
};