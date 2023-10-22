import Box from "@mui/material/Box";
import Regular12 from "#/components/shared/fonts/Regular12";
import SemiBold32 from "#/components/shared/fonts/SemiBold32";

function TemplateDetailsProfile({ title, subtitle }) {
  return (
    <Box sx={style.container}>
      {title && <SemiBold32>{title}</SemiBold32>}
      {subtitle && <Regular12 styles={style.email}>{subtitle}</Regular12>}
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "4px",
  },
  subtitle: {
    color: (theme) => theme.palette.neutral50.main,
  },
};

export default TemplateDetailsProfile;
