import Box from "@mui/material/Box";
import Regular14 from "#/components/shared/fonts/Regular14";
import SemiBold14 from "#/components/shared/fonts/SemiBold14";
import Regular12 from "#/components/shared/fonts/Regular12";
import ActionAddress from "#/components/domain/profile/ActionsAddress";

function Address({
  id,
  name,
  latitude,
  longitude,
  street,
  houseNumber,
  reference,
  isPrimary,
  handleMarkAsMain,
  handleEditAddress,
  handleDeleteAddress,
}) {
  return (
    <Box sx={style.container}>
      <Box sx={style.address}>
        <SemiBold14 styles={{ marginBottom: "8px" }}>{name}</SemiBold14>
        <Regular14>{`${street}. #${houseNumber}`}</Regular14>
        <Regular12 styles={style.textMuted}>{reference}</Regular12>
      </Box>
      <ActionAddress
        id={id}
        isPrimary={isPrimary}
        handleMarkAsMain={handleMarkAsMain}
        handleEditAddress={handleEditAddress}
        handleDeleteAddress={handleDeleteAddress}
      />
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    maxWidth: "64px",
  },
  address: {
    flex: 1,
  },
  textMuted: {
    color: (theme) => theme.palette.neutral60.main,
  },
};

export default Address;
