import Box from "@mui/material/Box";
import ProfilePicture from "#/components/domain/profile/ProfilePicture";
import AccountInfo from "#/components/domain/profile/AccountInfo";

function AccountDetailsContainer({ currentUser }) {
  return (
    <Box sx={style.container}>
      <ProfilePicture src={currentUser?.picture} alt="Profile Picture" />

      <AccountInfo currentUser={currentUser} />
    </Box>
  );
}

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
};

export default AccountDetailsContainer;
