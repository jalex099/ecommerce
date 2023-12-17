// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { OutlinedInput } from "@mui/material";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import GoBackIcon from "#/components/shared/GoBackIcon";
function MenuTopBar() {
  const navigate = useNavigate();

  const handleClickGoToCart = () => {
    navigate("/cart");
  };

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
          <IconButton
            aria-label="cart"
            variant="contained"
            className="w-8 h-8"
            onClick={handleClickGoToCart}
          >
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default MenuTopBar;
