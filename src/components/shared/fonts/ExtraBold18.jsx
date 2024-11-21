import Typography from "@mui/material/Typography";

function ExtraBold18({ children, className }) {
  return (
    <Typography
      fontSize="18px"
      lineHeight="28px"
      className={className}
      fontFamily="Comfortaa"
      fontWeight={800}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold18;
