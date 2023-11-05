import { LANGUAGE, CURRENCY } from "#/config/constants";

export function formatCurrency(value) {
  return new Intl.NumberFormat(LANGUAGE, {
    style: "currency",
    currency: CURRENCY,
  }).format(value);
}
