import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Toolbar from "@mui/material/Toolbar";
import GoToCartTopBarButtonContainer from "#/components/shared/topbar/components/GoToCartTopBarButtonContainer";
import GoBackIcon from "#/components/shared/GoBackIcon";
import SearchContainer from "#/components/shared/topbar/components/SearchContainer";
function MenuTopBar() {
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
          <GoBackIcon />
          {/* <IconButton aria-label="cart" variant="contained" className="w-8 h-8">
            <ShoppingBagOutlinedIcon fontSize="32px" />
          </IconButton> */}
          <SearchContainer />
          <GoToCartTopBarButtonContainer />
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default MenuTopBar;
