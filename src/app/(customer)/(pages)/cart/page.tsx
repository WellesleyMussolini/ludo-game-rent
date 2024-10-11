import { CartSummary } from "./components/cart-summary/cart-summary.component";

export default async function Cart() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen pt-20">
      <CartSummary />
    </div>
  );
}
