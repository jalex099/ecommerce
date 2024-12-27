import Typography from "@mui/material/Typography";

function ExtraBold14({ children, className }) {
  return (
    <Typography
      fontSize="14px"
      lineHeight="24px"
      className={className}
      fontFamily="Poppins"
      fontWeight={800}
    >
      {children}
    </Typography>
  );
}

export default ExtraBold14;
