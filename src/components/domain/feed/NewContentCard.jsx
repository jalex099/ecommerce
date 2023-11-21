import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import Regular16 from "#/components/shared/fonts/Regular16";

function NewContentCard({ item, ...props }) {
  return (
    <Box {...props} sx={style.container}>
      <motion.img
        src={item?.image}
        alt={item?.title}
        style={{
          width: "100%",
          height: "100px",
          objectFit: "cover",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      />
      <Regular16 sx={style.textContainer}>{item?.title} </Regular16>
    </Box>
  );
}

const style = {
  container: {
    minWidth: "200px",
    borderRadius: "8px",
    overflow: "hidden",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
  },
  textContainer: {
    width: "100%",
    padding: "8px",
    backgroundColor: (theme) => theme.palette.neutral5.main,
  },
};

export default NewContentCard;
