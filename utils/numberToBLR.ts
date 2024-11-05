export const numberToBLR = (value = 0) =>
  `R$ ${value.toFixed(2).replaceAll(".", ",")}`;
