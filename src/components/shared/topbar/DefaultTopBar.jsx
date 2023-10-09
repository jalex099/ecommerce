import SemiBold18 from "#/components/shared/fonts/SemiBold18";
import GoBackIcon from "#/components/shared/GoBackIcon";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

function DefaultTopBar({ title }) {
  return (
    <Box>
      <Fade in={true} timeout={300}>
        <Toolbar>
          <GoBackIcon />
          <SemiBold18 className="text-center">{title}</SemiBold18>
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default DefaultTopBar;
