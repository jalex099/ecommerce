import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SemiBold18 from "#/components/shared/fonts/SemiBold18";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Fade } from "@mui/material";

function FeedTopBar({ title }) {
  return (
    <Box>
      <Fade in={true} timeout={300}>
        <Toolbar>
          <ShoppingBagOutlinedIcon fontSize="32px" />
          <SemiBold18 className="text-center">{title}</SemiBold18>
          <SearchOutlinedIcon fontSize="32px" />
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default FeedTopBar;
