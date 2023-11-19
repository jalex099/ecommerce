import Box from "@mui/material/Box";
import SemiBold16 from "#/components/shared/fonts/SemiBold16";
import Regular14 from "#/components/shared/fonts/Regular14";
import { motion } from "framer-motion";
import EmptySearchImage from "#/assets/images/empty-search.png";

function NoAddressesContainer({ AddNewAddressButton }) {
  return (
    <Box sx={style.container}>
      <motion.img
        src={EmptySearchImage}
        alt="empty-addresses"
        style={{ width: "100%", maxWidth: "200px" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <SemiBold16>No encontramos direcciones</SemiBold16>
      <Regular14>
        Tal parece que no tienes direcciones registradas, agrega una para poder
        realizar tus pedidos de forma más rápida.
      </Regular14>
      <Box>{AddNewAddressButton}</Box>
    </Box>
  );
}

const style = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
    textAlign: "center",
  },
};

export default NoAddressesContainer;
