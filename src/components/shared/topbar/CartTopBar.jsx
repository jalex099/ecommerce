import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Fade } from "@mui/material";
import GoBackIcon from "#/components/shared/GoBackIcon";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "#/components/shared/icons/ShareIcon";
import SemiBold18 from "#/components/shared/fonts/SemiBold18";

function CartTopBar({ title }) {
  return (
    <Box>
      <Fade
        in={true}
        timeout={{
          enter: 500,
          exit: 0,
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="go-back"
            variant="contained"
            className="w-8 h-8"
          >
            <GoBackIcon />
          </IconButton>
          {title ? (
            <SemiBold18 className="text-center">{title}</SemiBold18>
          ) : (
            <Box />
          )}
          <IconButton
            aria-label="share"
            variant="contained"
            className="w-8 h-8"
          >
            <ShareIcon />
          </IconButton>
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default CartTopBar;
