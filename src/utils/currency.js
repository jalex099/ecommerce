import { LANGUAGE, CURRENCY } from "#/config/constants";

export function formatCurrency(value) {
  if(value == 0) return "GRATIS";
  const val = new Intl.NumberFormat(LANGUAGE, {
    style: "currency",
    currency: CURRENCY,
  }).format(value);
  //* if its two decimal places with 00, remove them
  if (val.includes(".00")) {
    return val.replace(".00", "");
  }
  return val;
}

export function formatNumber(value) {
  return new Intl.NumberFormat(LANGUAGE).format(value);
}
