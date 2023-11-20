import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Regular16 from "#/components/shared/fonts/Regular16";
import Regular20 from "#/components/shared/fonts/Regular20";
import EmptyCartIcon from "#/components/shared/icons/EmptyCartIcon";

export default function EmptyCartContainer({ ...props }) {
  return (
    <Box className="flex flex-col items-center justify-center text-center gap-2 px-6 py-2 flex-grow">
      <EmptyCartIcon className="w-24 aspect-square" />
      <Regular20>Tu carrito est&aacute; vac&iacute;o</Regular20>
      <Regular16>
        Agrega productos a tu carrito para continuar con la compra
      </Regular16>
      <Button variant="contained" color="primary" {...props}>
        Ver men&uacute;
      </Button>
    </Box>
  );
}
