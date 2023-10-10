import { motion } from "framer-motion";

function ProfilePicture({ src, alt }) {
  return (
    <motion.img
      // whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 1.1 }}
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      className="w-32 h-32 rounded-full my-4"
    />
  );
}

export default ProfilePicture;
