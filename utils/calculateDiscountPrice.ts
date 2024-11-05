export const calculateDiscountedPrice = (
  originalPrice = 0,
  discountPercentage = 0
): number => {
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;
  return parseFloat(finalPrice.toFixed(2));
};
