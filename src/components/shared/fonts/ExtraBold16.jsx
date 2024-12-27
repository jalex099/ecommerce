import Typography from "@mui/material/Typography";

function ExtraBold16({ children, className }) {
  return (
    <Typography
      fontSize="16px"
      lineHeight="26px"
      className={className}
      fontFamily="Poppins"
      fontWeight={800}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold16;
