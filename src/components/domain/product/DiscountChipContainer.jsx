import Regular12 from "#/components/shared/fonts/Regular12";
import { formatCurrency } from "#/utils/currency";

export default function DiscountChipContainer({ price = 0, amount = 0 }) {
  return (
    <Regular12 styles={{ color: (theme) => theme.palette.neutral50.main }}>
      Precio original:{" "}
      <span className="line-through">{formatCurrency(price + amount)}</span>
    </Regular12>
  );
}
