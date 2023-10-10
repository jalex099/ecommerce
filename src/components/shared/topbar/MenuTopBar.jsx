import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { OutlinedInput } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

import Toolbar from "@mui/material/Toolbar";
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
          {/* <GoBackIcon /> */}
          <ShoppingBagOutlinedIcon fontSize="32px" />
          <OutlinedInput
            size="small"
            placeholder="Buscar"
            sx={{ backgroundColor: "#F3F3F3" }}
            endAdornment={
              <SearchOutlinedIcon
                fontSize="32px"
                color="neutral40"
                sx={{ marginRight: "8px" }}
              />
            }
          />
          <ShoppingCartOutlinedIcon fontSize="32px" />
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default MenuTopBar;
