import Typography from "@mui/material/Typography";

function ExtraBold20({ children, className }) {
  return (
    <Typography
      fontSize="20px"
      lineHeight="30px"
      className={className}
      fontFamily="Comfortaa"
      fontWeight={800}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold20;
