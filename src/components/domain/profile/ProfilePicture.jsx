import { motion } from "framer-motion";
import Box from "@mui/material/Box";

function ProfilePicture({ src, alt, altImgText, ...params }) {
  return (
    <Box sx={style.container}>
      {src && (
        <motion.img
          // whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-32 h-32 rounded-full my-4"
          {...params}
        />
      )}

      {!src && altImgText && (
        <motion.div
          // whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.1 }}
          className="w-32 h-32 rounded-full my-4 flex items-center justify-center text-3xl"
          style={style.altImgText}
          {...params}
        >
          {altImgText}
        </motion.div>
      )}
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
  },
  altImgText: {
    backgroundColor: "#e9eef5",
  },
};

export default ProfilePicture;
