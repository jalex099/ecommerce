import placeholderImg from "#/assets/images/placeholder.png";

const Picture = ({
  webp,
  jpg,
  alt = "",
  style = {},
  imgStyle = {},
  ...props
}) => {
  const defaultImg = webp || jpg || placeholderImg;
  return (
    <picture style={style} {...props}>
      <source srcSet={webp} type="image/webp" />
      <source srcSet={jpg} type="image/jpg" />
      <img
        src={defaultImg}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          ...imgStyle,
        }}
      />
    </picture>
  );
};

export default Picture;
