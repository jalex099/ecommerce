import { motion } from "framer-motion";
import Box from "@mui/material/Box";

function ProfilePicture({ src, alt, ...params }) {
  return (
    <Box sx={style.container}>
      <motion.img
        // whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 1.1 }}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        className="w-32 h-32 rounded-full my-4"
        {...params}
      />
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    minHeight: "180px",
  }
}

export default ProfilePicture;
