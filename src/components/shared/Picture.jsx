import placeholderImg from "#/assets/images/placeholder.png";
import { motion } from "framer-motion";

const Picture = ({
  webp,
  jpg,
  alt = "",
  style = {},
  imgStyle = {},
  blockAnimation = false,
  ...props
}) => {
  const defaultImg = webp || jpg || placeholderImg;
  return (
    <picture style={style} {...props}>
      <source srcSet={webp} type="image/webp" />
      <source srcSet={jpg} type="image/jpg" />
      <motion.img
        src={defaultImg}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          ...imgStyle,
        }}
        layout
        whileTap={blockAnimation ? {} : { scale: 0.95 }}
        onContextMenu={(e) => e.preventDefault()}
      />
    </picture>
  );
};

export default Picture;
