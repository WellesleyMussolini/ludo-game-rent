
export function calculateCartAmount(cart: any) {
    let total = 0;
    for (let item of cart) {
        let itemPrice = parseInt(item.price, 10);  // Convert price to integer
        total += itemPrice;
    }
    return total;
};