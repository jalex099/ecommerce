import Typography from "@mui/material/Typography";

function ExtraBold12({ children, className }) {
  return (
    <Typography
      fontSize="12px"
      lineHeight="22px"
      className={className}
      fontFamily="Poppins"
      fontWeight={800}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold12;
