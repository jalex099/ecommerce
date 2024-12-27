import Typography from "@mui/material/Typography";

function ExtraBold24({ children, className }) {
  return (
    <Typography
      className={className}
      fontSize="24px"
      lineHeight="34px"
      fontFamily="Poppins"
      fontWeight={800}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold24;
