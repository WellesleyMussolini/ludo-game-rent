import { BoardGame } from "@/app/common/types/boardgame.types";

export function calculateCartAmount(cart: Array<BoardGame>) {
  let total = 0;
  for (let item of cart) {
    let itemPrice = parseInt(item.price, 10); // Convert price to integer
    total += itemPrice;
  }
  return total;
}
