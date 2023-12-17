import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Button from "@mui/material/Button";

const AddToCartButton = ({ ...props }) => {
  return (
    <Button
      sx={style?.container}
      variant="contained"
      disableElevation
      fullWidth
      {...props}
      className="flex justify-center items-center  cursor-pointer "
    >
      <SemiBold14>Agregar al carrito</SemiBold14>
    </Button>
  );
};

const style = {
  container: {
    minHeight: "32px",
    width: "80vw",
    maxWidth: "400px",
    margin: "0 auto",
    // position: "sticky",
    // bottom: "24px",
    // left: 0,
    // right: 0,
  },
};

export default AddToCartButton;
