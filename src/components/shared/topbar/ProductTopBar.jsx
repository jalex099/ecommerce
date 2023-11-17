import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Fade } from "@mui/material";
import BookmarkOffIcon from "#/components/shared/icons/BookmarkOffIcon";
import BookmarkOnIcon from "#/components/shared/icons/BookmarkOnIcon";
import GoBackIcon from "#/components/shared/GoBackIcon";
import { useHookstate } from "@hookstate/core";

function ProductTopBar() {
  const isFav = useHookstate(false);

  const handleToggleFav = () => {
    isFav.set(!isFav.get());
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
          <Box />
          {isFav?.get() ? (
            <BookmarkOnIcon onClick={handleToggleFav} />
          ) : (
            <BookmarkOffIcon onClick={handleToggleFav} />
          )}
        </Toolbar>
      </Fade>
    </Box>
  );
}

export default ProductTopBar;
