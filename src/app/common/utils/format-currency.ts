export const formatCurrency = (price: string) => {
  const priceNumber = parseInt(price); // converts the string to an integer
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0.5,
  });
  return formatter.format(priceNumber);
};
