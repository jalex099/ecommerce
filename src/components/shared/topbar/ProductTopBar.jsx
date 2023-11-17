import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Fade } from "@mui/material";
import BookmarkOffIcon from "#/components/shared/icons/BookmarkOffIcon";
import BookmarkOnIcon from "#/components/shared/icons/BookmarkOnIcon";
import GoBackIcon from "#/components/shared/GoBackIcon";

function ProductTopBar({ isFav = false }) {
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
          <Box />
          {isFav ? <BookmarkOnIcon /> : <BookmarkOffIcon />}
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default ProductTopBar;
