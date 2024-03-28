import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Button from "@mui/material/Button";
import Regular14 from "#/components/shared/fonts/Regular14.jsx";
import { motion } from "framer-motion";

const AddToCartButton = ({ total = "", ...props }) => {
  return (
    <Button
      sx={style?.container}
      variant="contained"
      disableElevation
      fullWidth
      {...props}
      className="flex justify-between items-center  cursor-pointer gap-2"
    >
      <SemiBold14>Agregar al carrito </SemiBold14>
      <motion.div>
        <Regular14 className={"opacity-80"}>
          {total}
        </Regular14>
      </motion.div>
    </Button>
  );
};

const style = {
  container: {
    height: '50px',
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
