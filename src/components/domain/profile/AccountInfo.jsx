import Box from "@mui/material/Box";
import Regular12 from "#/components/shared/fonts/Regular12";
import SemiBold32 from "#/components/shared/fonts/SemiBold32";

function AccountInfo() {
  return (
    <Box sx={style.container}>
      <SemiBold32>Javier Morales</SemiBold32>
      <Regular12 styles={style.email}>javiermoralesmelara@gmail.com</Regular12>
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
  email: {
    color: (theme) => theme.palette.neutral50.main,
  },
};

export default AccountInfo;
