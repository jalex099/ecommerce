import Box from "@mui/material/Box";
import ProfilePicture from "#/components/domain/profile/ProfilePicture";
import AccountInfo from "#/components/domain/profile/AccountInfo";

function AccountDetailsContainer() {
  return (
    <Box sx={style.container}>
      <ProfilePicture src="https://i.pravatar.cc/300" alt="Profile Picture" />
      <AccountInfo />
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // minHeight: "500px",
  },
};

export default AccountDetailsContainer;
