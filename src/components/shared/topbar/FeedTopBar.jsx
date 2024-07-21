// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SemiBold18 from "#/components/shared/fonts/SemiBold18";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Fade } from "@mui/material";
// import IconButton from "@mui/material/IconButton";

function FeedTopBar({ title }) {
  return (
    <Box
      sx={{
        background: (theme) => 'linear-gradient(180deg, ' + theme.palette.primary.main + ' 0%, ' + theme.palette.primary80.main + ' 60%)',
        color: (theme) => theme.palette.neutral0.main,
      }}
    >
      <Fade
        in={true}
        timeout={{
          enter: 500,
          exit: 0,
        }}
      >
        <Toolbar>
          {/* <IconButton
            aria-label="orders"
            variant="contained"
            className="w-8 h-8"
          >
            <ShoppingBagOutlinedIcon />
          </IconButton> */}
          <Box />
          <SemiBold18 className="text-center">{title}</SemiBold18>
          {/* <IconButton
            aria-label="search"
            variant="contained"
            className="w-8 h-8"
          >
            <SearchOutlinedIcon />
          </IconButton> */}
          <Box />
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default FeedTopBar;
