export const priceCalculate = (
  price,
  quantity,
  steps,
  basePrice,
  baseQuantity
) => {
  if (quantity === 0) {
    price = basePrice;
    quantity = baseQuantity;
  }
  const newPrice = quantity !== 0 ? (price / quantity) * steps : 0;
  return newPrice;
};

export const changeQuantity = (quantity) => {
  const isInteger = isInt(quantity / 1000);
  if (quantity > 999)
    return parseFloat(quantity / 1000).toFixed(isInteger ? 0 : 1);
  return quantity;
};

function isInt(n) {
  return n % 1 === 0;
}
