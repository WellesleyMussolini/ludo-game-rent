import { CartSummary } from "./components/cart-summary/cart-summary.component"

export default function Cart(){
    return <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <CartSummary />
    </div>
};