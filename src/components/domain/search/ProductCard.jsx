import Box from "@mui/material/Box";
import SemiBold16 from "#/components/shared/fonts/SemiBold16.jsx";
import Regular12 from "#/components/shared/fonts/Regular12.jsx";
import RedirectionService from "#/services/RedirectionService.js";
import { startLoading, stopLoading } from "#/stores/UIState.js";
import ImageService from "#/services/ImageService.js";

const ProductCard = ({ id, name, description, handleClose }) => {
  const { redirectToProduct } =
    RedirectionService();
  const { findImage } = ImageService();

  const handleClick = () => {
    startLoading();
    handleClose();

    setTimeout(() => {
      redirectToProduct(id);
      stopLoading();
    }
    , 300);
  }

  return(
    <Box
      className={"flex flex-col items-center h-[140px] justify-around  rounded-lg bg-white shadow-md"}
      sx={{
        backgroundImage: `url(${findImage(id, "PRD", "webp")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.35)",
          zIndex: 1,
        },
        "& > *": {
          position: "relative",
          zIndex: 2,
        },
      }}
      onClick={handleClick}
    >
      <SemiBold16 className={"cursor-pointer"}>
        {name}
      </SemiBold16>
    </Box>
  )
}

export default ProductCard;